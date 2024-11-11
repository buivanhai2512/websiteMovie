import React, { useState } from "react";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, message, Table, Modal, Empty } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link, useParams } from "react-router-dom";
import { useEpisodes } from "@/hook/EpisodeManagement/UseEpisode";
import axiosInstance from "@/config/Axios";
import { useQueryClient } from "react-query";

interface Episode {
  _id: string;
  slug:string;
  server_name: string;
  embed: string;
}

const ListEpisode: React.FC = () => {
  const { movieSlug } = useParams();
  const queryClient = useQueryClient(); 
  // Kiểm tra nếu movieSlug có giá trị trước khi gọi API
  const { data = [], isError } = useEpisodes(movieSlug || ""); // Truyền giá trị mặc định nếu movieSlug là undefined
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Tìm kiếm
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Dữ liệu được lọc theo từ khóa tìm kiếm
  const filteredData = data?.episode?.filter((episode: Episode) =>
    episode.server_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Cột của bảng
  const columns = [
    {
      title: "Tên tập phim",
      dataIndex: "server_name",
      key: "server_name",
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      key: "action",
      render: (_: string, record: Episode) => (
        <div className="flex gap-2 items-center">
          <Link to={`/admin/edit-tap-phim/${record.slug}`} className="p-0">
            Chỉnh sửa
          </Link>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record)}
            className="p-0"
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];
if(isError){
  return <>
  <h2 className="text-[red] flex justify-center h-20">không thể tải dữ liệu !!</h2>
  </>
}
  // Xử lý xóa một tập phim
  const handleDelete = (episode: Episode) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa tập phim này?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: async() => {
        // Thực hiện xóa tập phim
        await axiosInstance.delete(
          `api/episodesById/${episode._id}`,
        );
        message.success(`Xóa tập phim ${episode.server_name} thành công!`);
        queryClient.invalidateQueries(['episodes', movieSlug]);
      },
      onCancel: () => {
        message.info("Hủy bỏ xóa");
      },
    });
  };

  return (
    <Content className="mx-10 my-5">
      <div className="flex justify-between items-center mb-5">
        <Breadcrumb items={[{ title: "Admin" }, { title: "List Episodes" }]} />
        <Link to={`/admin/create-tap-phim/${movieSlug}`}>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm tập phim
          </Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Tìm kiếm tập phim"
            onChange={handleSearch}
            className="w-80"
            allowClear
          />
        </div>

        {filteredData && filteredData.length > 0 ? (
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
            rowKey="_id" // Sử dụng _id làm key
            pagination={{
              pageSize: 10,
              style: { display: "flex", justifyContent: "center" }, // Căn giữa phân trang
            }}
          />
        ) : (
          <Empty description="Không có tập phim nào được tìm thấy" />
        )}
      </div>
    </Content>
  );
};

export default ListEpisode;
