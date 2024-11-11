import {
  FireFilled,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import UseMovies from "@/hook/Movies/UseMovies";
import { Spin } from "antd";
interface Movie {
  backdrop_path: string; // URL của hình ảnh nền
  category: string; // Loại phim, ví dụ: "Movie" hoặc "TV Show"
  country: string[]; // Danh sách quốc gia, là một mảng chứa các chuỗi
  createdAt: string; // Ngày tạo, ở định dạng ISO
  episodes: string[]; // Mảng các tập phim, có thể để kiểu `any[]` nếu không có thông tin cụ thể
  genres: string[]; // Danh sách thể loại, là một mảng chứa các chuỗi
  id: string; // ID duy nhất của phim
  imdbPoints: number; // Điểm IMDB của phim
  name: string; // Tên phim
  overview: string; // Tóm tắt nội dung phim
  poster_path: string; // URL của ảnh đại diện hoặc poster của phim
  releaseDate: string; // Ngày phát hành, ở định dạng ISO
  slug: string; // Slug, là URL thân thiện
  trailerCode: string; // Mã trailer (có thể là ID video trên YouTube hoặc các nền tảng khác)
  updatedAt: string; // Ngày cập nhật, ở định dạng ISO
  viewed: number; // Số lượt xem
  __v: number; // Trường phiên bản (thường được MongoDB tự động thêm vào)
}

function Phimbo() {
  const [, setImageSrc] = useState("src/assets/animation/loading.gif");
  const [, setIsLoading] = useState(true);
  const { data, isLoading, isError } = UseMovies();
  console.log("movies", data);

  const handleImageLoad = () => {
    setTimeout(() => {
      setImageSrc(
        "https://cinema.momocdn.net/img/59079680634476340-srX0KC0LCbJBFb4OKVPqY9FrNag.jpg"
      );
      setIsLoading(false);
    }, 1000);
  };
  if (isError) {
    return (
      <div className="text-[red] flex justify-center items-center h-22 text-xl">
        Không thể lấy dữ liệu phim !
      </div>
    );
  }
  if (isLoading) {
    return <Spin />;
  }
  return (
    <div className="w-full bg-[#16161a]">
      <div className="home_page m-auto max-w-[1740px] max-[1789px]:w-[1520px] max-[1549px]:w-[1302px] max-[1329px]:w-[1150px] max-[1239px]:p-[0_30px] max-[899px]:p-[0_20px] max-[1239px]:w-full w-full">
        <div className="pt-[80px]"></div>
        <h2 className="text-white text-[26px] font-semibold max-[899px]:text-[20px] max-[899px]:font-medium max-[559px]:text-[18px] max-[559px]:font-bold flex items-center pt-10 text-3xl mb-4">
          <FireFilled
            className="max-[899px]:text-[20px] max-[559px]:text-[18px] mr-2 text-[30px] max-[559px]:font-bold"
            style={{ color: "red" }}
          />
          Phim Bộ
        </h2>
        <div className="">
          <div className="">
            {data &&
              data.map((item: Movie, index: number) => (
                item.category === "Movie" ? (
                <div
                  key={index}
                  className="w-[200px] max-[1549px]:w-[200px] max-[1329px]:w-[174px] max-[1239px]:w-[calc(20%-17px)] max-[559px]:w-[calc(33.33%-10px)]  m-[10px_8.5px] max-[899px]:w-[calc(20%-10px)] max-[899px]:m-[5px_5px] inline-block text-[14px]"
                >
                  <div
                    style={{
                      backgroundImage: `url(${item.backdrop_path}), radial-gradient(transparent 0%, rgba(0, 0, 0, 0.1) 44%, rgba(0, 0, 0, 0.56) 100%)`,
                    }}
                    className="relative h-0 pt-[140%] bg-center bg-cover item overflow-hidden rounded-[5px]"
                  >
                    <Link to={`/${item.slug}`}>
                      <div className="pt-[53px] play h-full w-full text-center absolute bg-cover left-0 top-0 z-10">
                        <PlayCircleOutlined className="text-[38px] iconplay opacity-0 text-[white]" />
                      </div>
                      <img
                        src={item.poster_path}
                        alt={item.name}
                        className="w-full h-full rounded-md top-0 left-0 absolute object-cover"
                        onLoad={handleImageLoad}
                        onError={() => setIsLoading(false)}
                      />
                    </Link>
                    <div
                      className="absolute right-0 flex flex-wrap justify-center gap-x-2 gap-y-3 max-[1239px]:p-2 max-[1239px]:h-[36px] max-[559px]:hidden left-0 bottom-0 h-11 p-3"
                      style={{
                        background:
                          "linear-gradient(0deg, rgba(0, 0, 0, 0.68), transparent)",
                      }}
                    >
                      <span className="max-w-[58px] bg-[rgba(0,0,0,0.51)] text-[#c2c6d0] p-[0_5px] leading-5 text-[12px] m-[0_5px_0_0] rounded-md inline-block">
                        {new Date(item.releaseDate).getFullYear()}
                      </span>
                      {item.genres.map((genre, idx) => (
                        <span
                          key={idx}
                          className="max-w-[58px] bg-[rgba(0,0,0,0.51)] text-[#c2c6d0] p-[0_5px] leading-5 text-[12px] m-[0_5px_0_0] rounded-md inline-block text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                          {genre}
                        </span>
                      ))}
                      {item.country.map((country, idx) => (
                        <span
                          key={idx}
                          className="max-w-[58px] bg-[rgba(0,0,0,0.51)] text-[#c2c6d0] p-[0_5px] leading-5 text-[12px] m-[0_5px_0_0] rounded-md inline-block"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                    <div className="absolute h-[18px] right-0 top-0 text-xs">
                      <span className="bg-[#ff008c] text-white rounded-[0_5px_0_5px] p-[0_8px] block">
                        Hot
                      </span>
                    </div>
                    <div className="module-item-content transform max-[1000px]:hidden translate-z-0 p-[12px_15px] text-[12px] bg-white z-2 relative">
                      <div className="module-item-style video-name">
                        <Link
                          to={`/${item.slug}`}
                          className="text-[16px] font-bold block text-ellipsis overflow-hidden whitespace-nowrap"
                          title={item.name}
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="p-[8px_0] tag overflow-x-auto whitespace-nowrap">
                        {item.genres.map((genre, idx) => (
                          <Link
                            key={idx}
                            to={`/genres/${genre}`}
                            className="bg-[#25252b] text-[hsla(0,0%,100%,0.6)] p-[0_5px] leading-5 text-xs rounded-md inline-block mr-[5px]"
                          >
                            {genre}
                          </Link>
                        ))}
                      </div>
                      <div className="module-item-style text-[12px] line-clamp-3 break-words overflow-hidden max-h-[58px] leading-[20px] text-ellipsis whitespace-normal break-all">
                        {item.overview}
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/${item.slug}`}
                    className="text-white mt-3 font-bold block w-full text-ellipsis hover:text-[#ff2a14] overflow-hidden whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                  <div className="text-[#adad9e]">Full</div>
                </div>
                ) : null
              ))}
          </div>
        </div>
       
      </div>
      <div className="pb-[80px]"></div>
    </div>
  );
}

export default Phimbo;
