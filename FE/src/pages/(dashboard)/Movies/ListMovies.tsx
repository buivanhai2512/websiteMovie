import UseMovies from "@/hook/Movies/UseMovies";
import { Movie } from "@/types/allType";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Col, Row, Spin, theme, Modal, Pagination } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MovieFormValues } from "./InterfaceMovies";
import UseMoviesMutation from "@/hook/Movies/UseMoviesMutation";

const { confirm } = Modal;

const ListMovies = () => {
  const { data: movies = [], isLoading, isError } = UseMovies();
  const { mutate: deleteMovies } = UseMoviesMutation({ action: "DELETE" });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Số lượng phim trên mỗi trang

  
    if (isError) {
      return <div className="text-[red]">Không thể tải dữ liệu phim.</div>;
    }
  if (isLoading) {
    return <Spin size="large" />;
  }

  const showDeleteConfirm = (movie: MovieFormValues) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa phim này không?',
      content: 'Hành động này không thể hoàn tác',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        deleteMovies(movie)
        // Gọi API xóa phim tại đây
      }
    });
  };

  const editMovie = (movieId?: string) => {
    console.log('Editing', movieId);
  };

  // Tính toán các phim hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const currentMovies = movies.slice(startIndex, startIndex + pageSize);
  return (
    <>
      <Content className="mx-10 my-5">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Breadcrumb items={[{ title: "Admin" }, { title: "List Movies" }]} style={{ margin: "16px 0" }} />
          <Link to="/admin/create-movies">
            <Button icon={<PlusOutlined />} type="primary">Thêm phim</Button>
          </Link>
        </div>
        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Row gutter={26}>
            {/* gutter khoảng cách */}
            {currentMovies.map((movie: Movie) => (
              <Col span={6}  key={movie._id}>
                <Card
                  hoverable
                  cover={
                    <div className="w-full h-[500px] overflow-hidden">
                        <img  className="w-full h-full object-cover" alt={movie.name} src={movie.poster_path || "default_poster.png"} />
                  </div>}
                  actions={[
                   <Link to={`/admin/edit/${movie.slug}/movies`} className="p-0">
                    <Button className="edit bg-[#ffd700]" onClick={() => editMovie(movie.slug)} >Sửa phim <EditOutlined key="edit" /></Button>
                    </Link>,
                    // ử dụng toán tử nullish coalescing (??) để đảm bảo rằng seasons sẽ có giá trị mặc định nếu không có giá trị.
                    movie.category === "TVSeries" ? (
                      <Link to={`/admin/list-tap-phim/${movie.slug}`} className="p-0">
                        <Button className="bg-[blue] text-[white] add">
                          List tập phim
                        </Button>
                      </Link>
                    ) : null, 
                    <Button className="bg-[red] text-[white] delete" onClick={() => showDeleteConfirm(movie)} >Xóa <DeleteOutlined key="delete" /></Button>
                  ]}
                  style={{ marginBottom: 16 }}
                >
                  <Card.Meta
                    title={
                    <div className="text-gray-600">
                       Tên phim : <span className="text-[#8c96ac] text-[16px] font-normal">{movie.name}</span>
                    </div>
                    }
                    description={ 
                      <>
                        <div className="pb-1"> <span className="text-gray-600 font-semibold">Mô tả : </span>{movie.overview.length > 100 ? movie.overview.substring(0, 100) + '...' : movie.overview}</div>
                        <div className="pb-1"> <span className="text-gray-600 font-semibold">Thể loại : </span> {Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres}</div>
                        <div className="pb-1"> <span className="text-gray-600 font-semibold">Quốc gia : </span> {Array.isArray(movie.country) ? movie.country.join(', ') : movie.country}</div>
                        <div className="pb-1"> <span className="text-gray-600 font-semibold">Ngày phát hành : </span> {new Date(movie.releaseDate).toLocaleDateString('vi-VN', {day: '2-digit',month: '2-digit',year: 'numeric' })}</div>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))} 
          </Row>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={movies.length}
            className="flex justify-center"
            onChange={(page) => setCurrentPage(page)}
            style={{ textAlign: 'center', marginTop: 16 }}
          />
        </div>
      </Content>
    </>
  );
};

export default ListMovies;
