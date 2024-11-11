import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Spin, Empty, Breadcrumb, Layout, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UseAuth from '@/hook/Auth/UseAuth';
import { deleteUser } from '@/services/Auth/Auth';

const { Content } = Layout;
interface UserData {
  slug?: string;
  name?: string;
  _id?:string;
  password?: string;
  email?: string;
  confirmPassword?: string;
  age?: number;
  avatar?: string;
}

const ListUsers: React.FC = () => {
  const { data = { users: [] }, isLoading, refetch } = UseAuth(); // refetch để tải lại dữ liệu sau khi xóa
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm] = useState<string>(''); // Tìm kiếm nếu cần thiết

  // Dữ liệu được lọc theo từ khóa tìm kiếm
  const filteredData = data?.users?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []; // Mặc định là mảng rỗng nếu không có users

  // Xử lý xóa người dùng
  const handleDelete = async (user: UserData) => {
    // Xác nhận xóa
    Modal.confirm({
      title: 'Xóa người dùng',
      content: `Bạn có chắc chắn muốn xóa người dùng ${user.name}?`,
      onOk: async () => {
        try {
          await deleteUser(user._id || ''); // Gọi API xóa người dùng
          refetch(); // Tải lại danh sách người dùng sau khi xóa thành công
        } catch (error) {
            console.log(error)
          message.error('Đã có lỗi xảy ra khi xóa người dùng!');
        }
      },
    });
  };

  // Cấu hình các cột của bảng
  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Chức năng',
      dataIndex: 'action',
      key: 'action',
      render: (_: string, record: UserData) => (
        <div className="flex gap-2 items-center">
          <Link to={`/admin/edit/${record.slug}/users`} className="p-0">
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
        <Breadcrumb items={[{ title: 'Admin' }, { title: 'Danh sách người dùng' }]} />
        <Link to={`/admin/create-users`}>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm người dùng
          </Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
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
            rowKey="slug"
            pagination={{ pageSize: 10 }}
          />
        ) : (
          <Empty description="Không có người dùng nào được tìm thấy" />
        )}
      </div>
    </Content>
  );
};

export default ListUsers;
