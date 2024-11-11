import { useState } from "react";
import {
    FaSearch,
    FaStar,
    FaHistory,
    FaBroom,
} from "react-icons/fa";
import { Dropdown, Space } from "antd";
import { Link, NavLink } from "react-router-dom";
import User from "./users/User";
import { getAllMovies } from "@/services/Movies/Movies";
import { Movie } from "@/types/allType";

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

const Header = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);


    // Hàm tìm kiếm phim
    const handleSearch = async (keyword: string) => {
        setSearchKeyword(keyword);

        if (keyword.trim() === "") {
            setSearchResults([]);
            return;
        }

        try {
            const movies = await getAllMovies();
            const filteredMovies = movies.filter((movie: Movie) =>
                movie.name.toLowerCase().includes(keyword.toLowerCase())
            );
            setSearchResults(filteredMovies);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setSearchResults([]);
        }
    };

    return (
        <header className="bg-black w-full z-30 fixed flex h-20 items-center px-5 justify-between">
            {/* Logo & Search */}
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
                        value={searchKeyword}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full bg-[#3b3b41] text-white p-2.5 pr-16 rounded-lg outline-none focus:rounded-none focus:rounded-t-lg"
                        placeholder="Tìm kiếm"
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

                    {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-[#3b3b41] px-4 rounded-b-lg shadow-lg z-10">
                            <h3 className="text-white font-bold">Kết quả tìm kiếm</h3>
                            <ul className="py-4">
                                {searchResults.map((movie: Movie) => (
                                    <li key={movie._id} className="text-red-600 py-2">
                                        <Link 
                                            to={`/${movie.slug}`}
                                            onClick={() => setSearchResults([])}
                                        >
                                            {movie.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {/* End logo */}

            {/* Menu */}
            <div className="flex-grow flex items-center menu-header ml-4 xl:justify-end overflow-x-auto">
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

            {/* User and History */}
            <div className="flex items-center ml-4 space-x-4">
                <Dropdown menu={{ items: historyItems }} className="flex items-center">
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <FaHistory className="text-xl text-white cursor-pointer" />
                        </Space>
                    </a>
                </Dropdown>
                <User />
            </div>
        </header>
    );
};

export default Header;
