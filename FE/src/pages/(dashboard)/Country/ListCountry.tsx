import React, { useState } from "react";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, message, Spin, Table, Modal, Empty } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import UseCountry from "@/hook/Country/UseCountry";
import UsecountryMutation from "@/hook/Country/UsecountryMutation";

interface Country {
  _id: string;
  name: string;
  slug: string; // Thêm slug vào interface
}

const ListCountry: React.FC = () => {
  const { data = [], isLoading } = UseCountry();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { mutate: deleteCountry } = UsecountryMutation({ action: "DELETE" });
  const { mutate: deleteCountries } = UsecountryMutation({ action: "DELETEMANY" });

  // Tìm kiếm
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Xóa nhiều quốc gia
  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn ít nhất một quốc gia để xóa.");
      return;
    }

    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} quốc gia đã chọn?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        const slugsToDelete = selectedRowKeys.map(key => String(key)); // Sử dụng slug thay vì _id
        deleteCountries(slugsToDelete, {
          onSuccess: () => {
            message.success("Xóa các quốc gia đã chọn thành công.");
            setSelectedRowKeys([]);
          },
          onError: () => {
            message.error("Có lỗi xảy ra khi xóa các quốc gia đã chọn.");
          }
        });
      },
    });
  };

  // Xóa quốc gia đơn lẻ
  const handleDelete = (country: Country) => {
   
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa quốc gia này?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        deleteCountry(country, {  // Sử dụng slug thay vì _id
          onSuccess: () => {
            console.log(country)
            message.success(`Xóa quốc gia thành công!`);
          },
          onError: () => {
            message.error(`Có lỗi xảy ra khi xóa quốc gia.`);
          }
        });
      },
    });
  };

  // Dữ liệu được lọc theo từ khóa tìm kiếm
  const filteredData = data.filter((country: Country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Tên quốc gia",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      key: "action",
      render: (_: string, record: Country) => (
        <div className="flex gap-2 items-center">
          {/* Sử dụng slug thay vì _id trong liên kết chỉnh sửa */}
          <Link to={`/admin/edit/${record.slug}/country`} className="p-0">
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
        <Breadcrumb items={[{ title: "Admin" }, { title: "List Country" }]} />
        <Link to={`/admin/create-country`}>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm Quốc Gia
          </Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Tìm kiếm quốc gia"
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
            Xóa các quốc gia đã chọn
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
            rowKey="slug" // Sử dụng slug làm key
            pagination={{ pageSize: 10 }}
          />
        ) : (
          <Empty description="Không có quốc gia nào được tìm thấy" />
        )}
      </div>
    </Content>
  );
};

export default ListCountry;
