import { Dropdown, Space, Spin } from "antd";
import { FaPlay, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import UseAuth from "@/hook/Auth/UseAuth";
import { UserOutlined } from "@ant-design/icons";

const User = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

  // Gọi hook UseAuth một lần duy nhất, bất kể giá trị của user
  const { data, isLoading, error } = UseAuth(user ? user._id : null);
  if (error) {
    return (
      <div className="text-red-500 h-16 flex justify-center items-center">
        Lỗi khi lấy dữ liệu
      </div>
    );
  }
  if (isLoading) {
    return <Spin />;
  }

  const userItems = user
    ? [
        {
          key: "1",
          label: (
            <div className="flex flex-col items-center gap-4 text-center w-60 px-3 rounded-md">
              <div className="flex items-center gap-4 w-full justify-between py-3">
                <Link
                  to={`profile/${user?._id}`}
                  className="hover:underline text-18 font-bold text-gray-500"
                >
                  Thành viên: {data?.user?.name}
                </Link>
              </div>
            </div>
          ),
        },     ...(data.user.role === "admin"
          ? [
              {
                  key: "5",
                  label: (
                      <Link
                          to="/admin"
                          className="text-sm mb-2 hover:underline cursor-pointer px-3 font-bold text-17 flex gap-4"
                      > <UserOutlined />
                          Quản trị
                      </Link>
                  ),
              },
          ]
          : []),
        {
          key: "2",
          label: (
            <span className="text-sm hover:underline cursor-pointer px-3 mb-2 font-bold text-17 flex gap-4">
              <FaPlay className="text-xl text-[#00FFFF]" /> Xem phim 4k
            </span>
          ),
        },
        {
          key: "3",
          label: (
            <span className="text-sm hover:underline cursor-pointer px-3 font-bold text-17 flex gap-4">
              <FaPlay className="text-xl text-[#00FFFF]" /> Xem không quảng cáo
            </span>
          ),
        },
        {
          key: "4",
          label: (
            <div className="flex justify-center items-center py-5">
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                }}
                className="bg-pink-500 px-12 rounded-xl text-white py-3 hover:bg-pink-600 focus:outline-none focus:ring-0"
              >
                Đăng xuất
              </button>
            </div>
          ),
        },
      ]
    : [
        {
          key: "1",
          label: (
            <div className="flex flex-col items-center gap-4 text-center w-60 px-3 rounded-md">
              <div className="flex items-center gap-4 w-full justify-between py-3">
                <span className="hover:underline text-18 font-bold text-gray-500">
                  Thành viên
                </span>
              </div>
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <span className="text-sm hover:underline cursor-pointer px-3 mb-2 font-bold text-17 flex gap-4">
              <FaPlay className="text-xl text-[#00FFFF]" /> Xem phim 4k
            </span>
          ),
        },
        {
          key: "3",
          label: (
            <span className="text-sm hover:underline cursor-pointer px-3 font-bold text-17 flex gap-4">
              <FaPlay className="text-xl text-[#00FFFF]" /> Xem không quảng cáo
            </span>
          ),
        },
        {
          key: "4",
          label: (
            <div className="flex justify-center items-center py-5">
              <Link to={`/login`}>
                <button className="bg-pink-500 px-12 rounded-xl text-white py-3 hover:bg-pink-600 focus:outline-none focus:ring-0">
                  Đăng nhập
                </button>
              </Link>
            </div>
          ),
        },
      ];

  return (
    <div>
      <Dropdown menu={{ items: userItems }} className="flex items-center">
        <a
          onClick={(e) => e.preventDefault()}
          aria-haspopup="true"
          className="cursor-pointer"
        >
          <Space>
            {user ? (
              <img
                src={
                  data?.user?.avatar ||
                  "https://your-default-avatar-image-url.com"
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaUser className="text-xl text-white cursor-pointer" />
            )}
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default User;
