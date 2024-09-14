import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Breadcrumb } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { MenuProps } from "antd";
import { Dropdown, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Option 1",
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "Option 2",
  },
  {
    key: "sub1",
    icon: <UserOutlined />,
    label: "User",
    children: [
      {
        key: "3",
        label: "Tom",
      },
      {
        key: "4",
        label: "Bill",
      },
      {
        key: "5",
        label: "Alex",
      },
    ],
  },
  {
    key: "sub2",
    icon: <TeamOutlined />,
    label: "Team",
    children: [
      {
        key: "6",
        label: "Team 1",
      },
      {
        key: "8",
        label: "Team 2",
      },
    ],
  },
  {
    key: "9",
    icon: <FileOutlined />,
    label: "Files",
  },
];

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
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
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
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="py-2">
          <img
            className={`${collapsed ? "p-0" : "pr-5"}`}
            src="/src/assets/logoMovies-removebg-preview.png"
            alt="logo"
          />
        </div>
        <Menu
          className="mt-5"
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className="py-5 h-[90px] flex justify-between"
          style={{ background: colorBgContainer }}
        >
          <Form
            form={form}
            onFinish={handleFinish}
            style={{ display: 'flex', alignItems: 'center', border: '1px solid #d9d9d9', borderRadius: '4px',width: "500px" }}
          >
            <Form.Item
              name="searchTerm"
              style={{ margin: 0, flex: 1 }}
            >
              <Input
              id="inputAdmin"
                placeholder="Tìm kiếm..."
                style={{ border: 'none', outline: 'none' }}
              />
            </Form.Item>
            <Form.Item style={{ margin: 0 }}>
              <Button
                type="text"
                htmlType="submit"
                icon={<SearchOutlined />}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
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
        <Content className="mx-10 my-5">
          <Breadcrumb
            items={[
              { title: 'Admin' },
              { title: 'Bill' }
            ]}
            style={{ margin: "16px 0" }}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
