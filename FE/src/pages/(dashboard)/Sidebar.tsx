import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, SettingOutlined, ShopOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "/admin/list-movies",
    icon:  <DesktopOutlined />,
    label: "List Movies",
  },
  {
    key: "/admin/list-country",
    icon: <PieChartOutlined />,
    label: "List Quốc Gia",
  },
  {
    key: "/admin/list-genres",
    icon: <AppstoreAddOutlined />,
    label: "List Thể loại phim",
  },
  {
    key: "/admin/list-users",
    icon: <UserOutlined />,
    label: "User",
  },
  {
    key: "sub2",
    icon: <TeamOutlined />,
    label: "Team",
    children: [
      {
        key: "/admin/team/team1",
        label: "Team 1",
      },
      {
        key: "/admin/team/team2",
        label: "Team 2",
      },
    ],
  },
  {
    key: "/admin/files",
    icon: <FileOutlined />,
    label: "Files",
  },
  {
    key: "/admin/settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
  {
    key: "/admin/products",
    icon: <ShopOutlined />,
    label: "Products",
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
// menu
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="py-2">
          <Link to={`/admin`}>
            <img
              className={`${collapsed ? "p-0" : "pr-5"}`}
              src="/src/assets/logoMovies-removebg-preview.png"
              alt="logo"
            />
          </Link>
        </div>
        <Menu
          className="mt-5"
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
