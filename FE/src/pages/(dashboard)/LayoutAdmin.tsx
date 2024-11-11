import { Form, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const { Header, Footer } = Layout;

const Profile: MenuProps["items"] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const LayoutAdmin = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [form] = Form.useForm();

  const handleFinish = (values: { searchTerm: string }) => {
    onSearch(values.searchTerm);
    form.resetFields(); // Xóa trường tìm kiếm sau khi gửi
  };

  // Định nghĩa hàm onSearch nếu cần thiết
  const onSearch = (searchTerm: string) => {
    console.log(searchTerm);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header
          className="py-5 h-[90px] flex justify-between"
          style={{ background: colorBgContainer }}
        >
          <Form
            form={form}
            onFinish={handleFinish}
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              width: "500px",
            }}
          >
            <Form.Item name="searchTerm" style={{ margin: 0, flex: 1 }}>
              <Input
                id="inputAdmin"
                placeholder="Tìm kiếm..."
                style={{ border: "none", outline: "none" }}
              />
            </Form.Item>
            <Form.Item style={{ margin: 0 }}>
              <Button
                type="text"
                htmlType="submit"
                icon={<SearchOutlined />}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              />
            </Form.Item>
          </Form>
          <div>
            <Dropdown menu={{ items: Profile }} trigger={["click"]}>
              <a className="w-full" onClick={(e) => e.preventDefault()}>
                <img
                  className="w-[50px] h-[50px]"
                  src="https://picsum.photos/200/300"
                  alt=""
                  style={{ borderRadius: "50%" }}
                />
              </a>
            </Dropdown>
          </div>
        </Header>
        <Outlet />
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
