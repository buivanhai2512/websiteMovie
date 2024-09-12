import { useState } from "react";
import {
    FaSearch,
    FaStar,
    FaUser,
    FaHistory,
    FaPlay,
    FaFire,
    FaBroom,
} from "react-icons/fa";
import { Dropdown, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";

const historyItems = [
    {
        key: "1",
        label: (
            <div className="flex flex-col items-center gap-4 w-72 p-2 rounded-md">
                <div className="flex items-center gap-4 w-full justify-between">
                    <span className="hover:underline text-[18px] font-bold text-gray-500">
                        Phim đã xem
                    </span>
                    <a className="hover:underline" href="">
                        <FaBroom className="text-xl cursor-pointer" />
                    </a>
                </div>
                <div className="text-center h-32 flex justify-center items-center text-[18px] text-gray-400">
                    Chưa xem phim nào
                </div>
            </div>
        ),
    },
];
const userItems = [
    {
        key: "1",
        label: (
            <div className="flex flex-col items-center gap-4 text-center w-60 px-3 rounded-md">
                <div className="flex items-center gap-4 w-full justify-between py-3">
                    <span className="hover:underline text-[18px] font-bold text-gray-500">
                        Thành viên
                    </span>
                </div>
            </div>
        ),
    },
    {
        key: "2",
        label: (
            <span className="text-sm hover:underline cursor-pointer px-3 mb-2 font-bold text-[17px] flex gap-4">
                <FaPlay className="text-xl text-[#00FFFF]" /> Xem phim 4k
            </span>
        ),
    },
    {
        key: "3",
        label: (
            <span className="text-sm hover:underline cursor-pointer px-3 font-bold text-[17px] flex gap-4">
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

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const handleFocus = () => {
        setShowDropdown(true);
    };

    const handleBlur = () => {
        setShowDropdown(false);
    };
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };
    const handleCancel = () => {
        setShowSearch(false);
    };
    return (
        <header className="bg-black flex h-20 items-center px-5 justify-between">
            {/*============== Logo & Search ========= */}
            <div className="logo flex items-center">
            <Link to={`/`}>
               <img
                    className="w-40 max-[660px]:hidden object-cover"
                    src="/src/assets/logoMovies-removebg-preview.png"
                    alt="Logo"
                />
                </Link>
                <div className="relative lg:w-[480px] md:w-[320px] max-[856px]:hidden ml-4">
                    <input
                        type="text"
                        className="w-full bg-[#3b3b41] text-white p-2.5 pr-16 rounded-lg outline-none focus:rounded-none focus:rounded-t-lg"
                        placeholder="Tìm kiếm"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <div
                        className="absolute right-3 top-2 flex items-center justify-center space-x-4"
                        style={{ color: "#ff2a14" }}
                    >
                        <FaStar className="text-xl" />
                        <div className="relative text-xl text-white flex-shrink-0">
                            <span className="pl-2">|</span>
                        </div>
                        <FaSearch className="text-xl" />
                    </div>

                    {showDropdown && (
                        <div className="absolute top-full left-0 w-full bg-[#3b3b41] px-4 rounded-b-lg shadow-lg z-10">
                            <div className="border-t border-gray-600 mb-4 w-full flex justify-center"></div>
                            <h3 className="text-white font-bold">Phim tìm kiếm nhiều</h3>
                            <div className="grid grid-cols-2 gap-4 py-4 text-red-600">
                                <div className="flex items-center border border-[#fef0e5] bg-[#fef0e5] p-2 rounded-lg">
                                    <FaFire className="mr-2 text-red-600" />
                                    <h3 className="font-semibold">Phim đang hot</h3>
                                </div>
                                <div className="flex items-center border border-[#fef0e5] bg-[#fef0e5] p-2 rounded-lg">
                                    <FaFire className="mr-2 text-red-600" />
                                    <h3 className="font-semibold">Bài viết đang hot</h3>
                                </div>
                                <div className="flex items-center border border-[#fef0e5] bg-[#fef0e5] p-2 rounded-lg ">
                                    <FaFire className="mr-2 text-red-600" />
                                    <h3 className="font-semibold">Chủ đề đang hot</h3>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* End logo */}

            {/*=============== Menu ==========*/}
            <div className="flex-grow flex items-center ml-4 xl:justify-end overflow-x-auto">
                <ul className="flex space-x-6 font-bold text-xl whitespace-nowrap">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `relative ${isActive ? "text-orange-500" : "text-white"}`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/phim-le"
                            className={({ isActive }) =>
                                `relative ${isActive ? "text-orange-500" : "text-white"}`
                            }
                        >
                            Phim lẻ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/hoat-hinh"
                            className={({ isActive }) =>
                                `relative ${isActive ? "text-orange-500" : "text-white"}`
                            }
                        >
                           Phim Hoạt hình
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/phim-bo"
                            className={({ isActive }) =>
                                `relative ${isActive ? "text-orange-500" : "text-white"}`
                            }
                        >
                            Phim bộ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/tin-tuc"
                            className={({ isActive }) =>
                                `relative ${isActive ? "text-orange-500" : "text-white"}`
                            }
                        >
                            Tin tức
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/*=============== User and History ==========*/}
            <div className="flex items-center ml-4 space-x-4">
                <div className="hidden override-hidden " >
                    <SearchOutlined className="text-2xl relative flex justify-center text-white" onClick={toggleSearch} />
                    <div className={`${showSearch ? "block" : "hidden"} absolute left-0 min-w-[394px] bg-[#25252b] top-0`}>
                        <input
                            type="text"
                            className="w-[300px] ml-5 bg-[#3b3b41] mt-6 mb-6 text-white p-2.5 pr-16 outline-none rounded-lg"
                            placeholder="Tìm kiếm"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <div
                            className="absolute right-3 top-8 flex items-center justify-center space-x-4"
                            style={{ color: "#ff2a14" }}
                        >
                            <FaStar className="text-xl" />
                            <div className="relative text-xl text-white flex-shrink-0">
                                <span className="pl-2">|</span>
                            </div>
                            <FaSearch className="text-xl" />
                            <button className="text-white font-bold" style={{marginLeft: 20}} onClick={handleCancel}>Hủy bỏ</button>
                        </div>
                        <div className="absolute top-full left-0S w-full bg-[#25252b] px-4 rounded-b-lg shadow-lg z-10">
                            <div className="mb-4 w-full flex justify-center"></div>
                            <h3 className="text-white font-bold">Phim tìm kiếm nhiều</h3>
                            <div className="grid grid-cols-2 gap-4 py-4 text-red-600">
                                <div className="flex items-center border border-[#fef0e5] bg-[#fef0e5] p-2 rounded-lg">
                                    <FaFire className="mr-2 text-red-600" />
                                    <h3 className="font-semibold">Phim đang hot</h3>
                                </div>
                                <div className="flex items-center border border-[#fef0e5] bg-[#fef0e5] p-2 rounded-lg">
                                    <FaFire className="mr-2 text-red-600" />
                                    <h3 className="font-semibold">Bài viết đang hot</h3>
                                </div>
                                <div className="flex items-center border border-[#fef0e5] bg-[#fef0e5] p-2 rounded-lg ">
                                    <FaFire className="mr-2 text-red-600" />
                                    <h3 className="font-semibold">Chủ đề đang hot</h3>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-r-2 border-white hidden h-6"></div>{" "}
                {/* Thanh dọc */}
                <Dropdown menu={{ items: historyItems }} className="flex items-center">
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <FaHistory className="text-xl text-white cursor-pointer" />
                        </Space>
                    </a>
                </Dropdown>
                <div className="border-r-2 border-white max-[857px]:hidden h-6"></div>{" "}
                {/* Thanh dọc */}
                <Dropdown menu={{ items: userItems }} className="flex items-center">
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <FaUser className="text-xl text-white cursor-pointer" />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;
