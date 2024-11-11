import UseMovies from "@/hook/Movies/UseMovies";
import { Spin } from "antd";
import { Link } from "react-router-dom";

interface Movie {
  _id: string;
  slug?: string;
  name: string;
  link: string;
  category: string;
  viewed: number;
  status?: string;
}

function Top10() {
  const { data, isLoading, isError } = UseMovies();

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

  // Lọc các phim lẻ (category === "Movie") và sắp xếp theo lượt xem cao nhất
  const sortedMovies = data
    ?.filter((film: Movie) => film.category === "Movie") // Lọc phim lẻ
    .sort((a: Movie, b: Movie) => b.viewed - a.viewed); // Sắp xếp theo lượt xem

  return (
    <aside className="scroll-box overflow-y-auto">
      <div className="rounded-md max-[899px]:inline-flex overflow-hidden text-white mt-[10px]">
        {sortedMovies
          ?.slice(0, 10) // Lấy 10 phim lẻ có lượt xem cao nhất
          .map((film: Movie, index: number) => (
            <Link
              to={film.slug ? `${film.slug}` : "#"} // Kiểm tra slug
              key={film._id}
              className="text-list-item hover:bg-[#32323c] flex overflow-hidden max-[899px]:mr-2 p-3 items-center bg-[#25252b] rounded-md mb-2"
            >
              <div
                className={`relative text-list-num top-1-${index + 1} max-[1329px]:p-[7px] max-[1329px]:leading-5 -left-4 z-10 inline-block h-5 w-8 text-center leading-5 text-[rgba(0,0,0,.4)] font-bold italic -mt-4 -mr-1.5 indent-[3px] top-main`}
              >
                {index + 1}
              </div>
              <div className="text-list-title inline-block max-w-[140px] overflow-hidden whitespace-nowrap text-ellipsis">
                <h3 className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">
                  {film.name}
                  <p className="text-[12px]">full</p>
                </h3>
              </div>
            </Link>
          ))}
      </div>
    </aside>
  );
}

export default Top10;
