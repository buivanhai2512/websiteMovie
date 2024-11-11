import { Link, useParams } from "react-router-dom";
// import UseMovies from "@/hook/Movies/UseMovies";
import { Spin } from "antd";
import { useEpisodesById } from "@/hook/EpisodeManagement/useEpisodeById";
import UseMovies from "@/hook/Movies/UseMovies";
interface Episode {
  _id: string;
  slug: string;
  server_name: string;
  embed: string;
}
function WatchMovieById() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const { slug, episode } = useParams();
  // const [searchParams] = useSearchParams();
  const { data: movieDetail, isLoading, isError } = UseMovies(slug);
  console.log("slug", episode)
  const { data = [] } = useEpisodesById( episode || slug || "");
  const src = `${data?.embed}`;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    ); // Thêm loader cho trang phim
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading movie details
      </div>
    );
  }
  const getStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? "⭐" : "☆"); // Nếu điểm số lớn hơn hoặc bằng i thì hiển thị sao đầy, ngược lại là sao rỗng
    }
    return stars;
  };

  return (
    <div className="bg-[#111319] ">
      <div className="container mx-auto bg-[#111319] px-4 py-8">
        <div className="mt-[80px]"></div>
        <iframe
          className="w-full h-[700px] mb-8"
          src={src}
          width="100%"
          height="700px"
          allowFullScreen
        ></iframe>
        <div className="py-11">
          {data && data.length > 0 ? (
            <>
              <h4 className="text-2xl font-semibold text-white mb-4">
                Chọn tập
              </h4>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-12">
                {data.map((episode: Episode) => (
                  <div
                    key={episode._id}
                    className="flex items-center justify-center p-2"
                  >
                    <Link
                      to={`/${slug}/${episode.slug}`}
                      className="block w-full text-center rounded-lg py-3 bg-pink-500 font-semibold text-white hover:bg-pink-600 transition duration-200 shadow-md"
                    >
                      {episode.server_name}
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
          {/* Thêm các tập phim nếu có */}
        </div>
        {movieDetail && (
          <>
            <div className="flex mb-8">
              <div className="w-1/3 mr-4">
                {isLoading ? (
                  <Spin style={{ width: "200px" }} />
                ) : (
                  <img
                    className="w-full h-auto rounded-lg"
                    src={movieDetail.poster_path || movieDetail.backdrop_path}
                    alt="Poster"
                  />
                )}
              </div>
              <div className="w-2/3">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  {movieDetail.name}
                </h2>
                <div className="text-gray-700 mb-4">
                </div>
                <div className="text-yellow-500 text-lg mb-4">
                  {getStars(movieDetail.imdbPoints).map((star, index) => (
                    <span key={index} className="ml-1">
                      {star}
                    </span>
                  ))}
                </div>
                <div className="text-gray-700">
                  <h4 className="font-semibold mb-2">Tóm tắt</h4>
                  <p>{movieDetail.overview}</p>
                </div>
              </div>
            </div>
            <div>{/* <Comment MovieId={movieDetail._id} /> */}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default WatchMovieById;
