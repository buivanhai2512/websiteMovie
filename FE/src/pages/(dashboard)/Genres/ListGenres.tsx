import React, { useState } from "react";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, message, Spin, Table, Modal, Empty } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import UseGenres from "@/hook/Genres/UseGenres";
import UseGenresMutation from "@/hook/Genres/UseGenresMutation";

interface Genre {
  _id: string;
  name: string;
  slug: string;
}

const ListGenres: React.FC = () => {
  const { data = [], isLoading } = UseGenres();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { mutate: deleteGenre } = UseGenresMutation({ action: "DELETE" });
  const { mutate: deleteGenres } = UseGenresMutation({ action: "DELETEMANY" });

  // Tìm kiếm
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Xóa nhiều loại phim
  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn ít nhất một loại phim để xóa.");
      return;
    }
  
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} loại phim đã chọn?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        const slugsToDelete = selectedRowKeys.map(key => String(key)); // Sử dụng slug thay vì _id
        deleteGenres(slugsToDelete, {
          onSuccess: () => {
            message.success("Xóa các loại phim đã chọn thành công.");
            setSelectedRowKeys([]); // Clear selected rows after delete
          },
          onError: () => {
            message.error("Có lỗi xảy ra khi xóa các loại phim đã chọn.");
          }
        });
      },
    });
  };
  

  // Xóa loại phim đơn lẻ
  const handleDelete = (genre: Genre) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa loại phim này?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        deleteGenre(genre, { 
          onSuccess: () => {
            message.success(`Xóa loại phim thành công!`);
          },
          onError: () => {
            message.error(`Có lỗi xảy ra khi xóa loại phim.`);
          }
        });
      },
    });
  };

  // Dữ liệu được lọc theo từ khóa tìm kiếm
  const filteredData = data.filter((genre: Genre) =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Tên loại phim",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      key: "action",
      render: (_: string, record: Genre) => (
        <div className="flex gap-2 items-center">
          {/* Sử dụng slug cho liên kết chỉnh sửa */}
          <Link to={`/admin/edit/${record.slug}/genres`} className="p-0">
            Chỉnh sửa
          </Link>
          <Button type="link" danger onClick={() => handleDelete(record)} className="p-0">
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Content className="mx-10 my-5">
      <div className="flex justify-between items-center mb-5">
        <Breadcrumb
          items={[{ title: "Admin" }, { title: "List Genres" }]}
        />
        <Link to={`/admin/create-genres`}>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm loại phim
          </Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Tìm kiếm loại phim"
            onChange={handleSearch}
            className="w-80"
            allowClear
          />
          <Button
            type="primary"
            danger
            onClick={handleDeleteSelected}
            disabled={selectedRowKeys.length === 0}
          >
            Xóa các loại phim đã chọn
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : filteredData.length > 0 ? (
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: (newSelectedRowKeys: React.Key[]) => {
                setSelectedRowKeys(newSelectedRowKeys);
              },
              selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            }}
            dataSource={filteredData}
            columns={columns}
            rowKey="slug"  // Sử dụng slug làm key
            pagination={{ pageSize: 10 }}
          />
        ) : (
          <Empty description="Không có loại phim nào được tìm thấy" />
        )}
      </div>
    </Content>
  );
};

export default ListGenres;
