import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Rate,
  Upload,
  theme,
  message,
} from "antd";
import { RollbackOutlined, UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import TextArea from "antd/es/input/TextArea";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { MovieFormValues } from "./InterfaceMovies";
import axios from "axios";
import moment from "moment";
import UseCountry from "@/hook/Country/UseCountry";
import { country, Genres } from "@/types/allType";
import UseGenres from "@/hook/Genres/UseGenres";
import UseMoviesMutation from "@/hook/Movies/UseMoviesMutation";
import UseMovies from "@/hook/Movies/UseMovies";

const { Option } = Select;
// type Episode = {
//   server_name?: string;
//   slug?: string;
//   embed?: string;
//   _id?: string;
//   episodes_id: string;
// };

const EditMovies = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [form] = Form.useForm();
  const { data: countries } = UseCountry();
  const { data: genres } = UseGenres();
  const { mutate } = UseMoviesMutation({ action: "UPDATE" });
  const { slug } = useParams(); // Lấy slug từ URL
  const { data } = UseMovies(slug);
  const navigate = useNavigate();
  const [isTvShow, setIsTvShow] = useState(false);
  const [backdropFileList, setBackdropFileList] = useState<UploadFile[]>([]);
  const [posterFileList, setPosterFileList] = useState<UploadFile[]>([]);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [imgPoster, setimgPoster] = useState<string | null>(null);

  // Hàm xử lý submit form
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name ?? "",
        trailerCode: data.trailerCode ?? "",
        id: data.id ?? "",
        country: data.country ?? [],
        genres: data.genres ?? [],
        category: data.category ?? "",
        seasons: data.seasons ?? null,
        episodes: data.episodes ?? [],
        releaseDate: data.releaseDate ? moment(data.releaseDate) : null,
        imdbPoints: data.imdbPoints ?? 0,
        overview: data.overview ?? "",
      });

      setIsTvShow(data.category === "TV Series");

      // Thiết lập ảnh nền và poster mặc định nếu có
      if (data.backdrop_path) {
        setBackdropFileList([
          { url: data.backdrop_path, name: "Ảnh nền" } as UploadFile,
        ]);
        setImgURL(data.backdrop_path);
      }
      if (data.poster_path) {
        setPosterFileList([
          { url: data.poster_path, name: "Ảnh poster" } as UploadFile,
        ]);
        setimgPoster(data.poster_path);
      }
    }
  }, [data, form]);
  const onFinish = async (values: MovieFormValues) => {
    try {
      const releaseDate = moment(values.releaseDate);
      const formattedReleaseDate = releaseDate.format("YYYY-MM-DD");
      const episodesData = isTvShow
        ? [
            {
              server_name: values.server_name,
              slug: values.slug,
              embed: values.embed,
              _id: values.episodes_id,
            },
          ]
        : [];
      const data = {
        ...values,
        backdrop_path: imgURL,
        slug: slug ?? "", // Sử dụng slug để xác định thể loại
        poster_path: imgPoster,
        releaseDate: formattedReleaseDate,
        episodes: episodesData,
      };
      if (slug) {
        // Chỉ gọi mutate khi slug có giá trị hợp lệ
        await mutate(data, {
          onSuccess: () => {
            navigate("/admin/list-movies");
          },
          onError: () => {
            message.error("Có lỗi xảy ra khi cập nhật thể loại!");
          },
        });
      } else {
        console.error("Slug is undefined. Cannot update genre.");
      }
      //    navigate("/admin/list-movies");
    } catch (error) {
      console.log(error);
    }
  };
  // Hàm xử lý thay đổi thể loại phim
  const handleCategoryChange = (value: string) => {
    setIsTvShow(value === "TV Series");
  };

  // Hàm upload ảnh lên Cloudinary
  const uploadFile = async (file: File) => {
    const CLOUD_NAME = "dzafnopsc";
    const PRESET_NAME = "nthShop";
    const FOLDER_NAME = "NTHSHOP";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", file);

    const response = await axios.post(api, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.secure_url;
  };

  // Hàm xử lý thay đổi file ảnh nền
  const handleBackdropChange = async (info: UploadChangeParam) => {
    const files = info.fileList.slice(-1); // Chỉ giữ lại 1 ảnh
    if (files.length > 0) {
      const file = files[0].originFileObj as File; // Lấy file đầu tiên
      const url = await uploadFile(file); // Upload file lên Cloudinary
      if (url) {
        setBackdropFileList([{ ...files[0], url }]); // Cập nhật fileList với URL mới
        setImgURL(url);
      }
    } else {
      setBackdropFileList([]); // Xóa nếu không có ảnh
    }
  };

  // Hàm xử lý xóa file ảnh nền
  const handleBackdropRemove = () => {
    setBackdropFileList([]); // Xóa ảnh nền khỏi danh sách
  };

  // Hàm xử lý thay đổi file poster
  const handlePosterChange = async (info: UploadChangeParam) => {
    const files = info.fileList.slice(-1); // Chỉ giữ lại 1 ảnh
    if (files.length > 0) {
      const file = files[0].originFileObj as File;
      const url = await uploadFile(file); // Upload file lên Cloudinary
      if (url) {
        setPosterFileList([{ ...files[0], url }]); // Cập nhật fileList với URL mới
        setimgPoster(url);
      }
    } else {
      setPosterFileList([]); // Xóa nếu không có ảnh
    }
  };

  // Hàm xử lý xóa file poster
  const handlePosterRemove = () => {
    setPosterFileList([]); // Xóa ảnh poster khỏi danh sách
  };
  return (
    <Content className="mx-10 my-5">
      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[{ title: "Admin" }, { title: "Create-Movies" }]}
          style={{ margin: "16px 0" }}
        />
        <Link to="/admin">
          <Button type="primary" icon={<RollbackOutlined />}>
            Trở lại
          </Button>
        </Link>
      </div>

      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="grid grid-cols-1 gap-x-6"
        >
          {/* Tên phim và Trailer */}
          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label="Tên phim"
              name="name"
              rules={[
                { required: true, message: "Hãy nhập tên phim!" },
                { whitespace: true, message: "không được chứa toàn dấu cách" },
                { min: 3, message: "Tối thiểu 3 kí tự !" },
              ]}
            >
              <Input placeholder="Nhập tên phim" />
            </Form.Item>

            <Form.Item
              label="Trailer Phim"
              name="trailerCode"
              rules={[
                { required: true, message: "Hãy nhập mã trailer!" },
                { whitespace: true, message: "không được chứa toàn dấu cách" },
              ]}
            >
              <Input placeholder="Nhập mã trailer (YouTube...)" />
            </Form.Item>
          </div>

          {/* ID phim và Quốc gia */}
          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label="Link phim"
              name="id"
              rules={[
                { required: true, message: "Hãy nhập ID phim!" },
                { whitespace: true, message: "không được chứa toàn dấu cách" },
              ]}
            >
              <Input placeholder="Nhập ID phim" />
            </Form.Item>

            <Form.Item
              label="Quốc gia"
              name="country"
              rules={[{ required: true, message: "Hãy chọn quốc gia!" }]}
            >
              <Select mode="multiple" placeholder="Chọn quốc gia">
                {countries &&
                  countries.map((country: country) => (
                    <Option key={country.slug} value={country.name}>
                      {country.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </div>

          {/* Ảnh nền và poster */}
          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label="Ảnh nền"
              name="backdrop_path"
              rules={[
                {
                  required: !imgURL, // Chỉ bắt buộc khi không có URL từ dữ liệu cũ
                  message: "Hãy tải lên ảnh nền!",
                },
              ]}
            >
              <Upload
                fileList={backdropFileList}
                onChange={handleBackdropChange}
                onRemove={handleBackdropRemove} // Xử lý khi xóa ảnh
                beforeUpload={() => false}
                listType="picture"
              >
                {backdropFileList.length < 1 && (
                  <Button icon={<UploadOutlined />}>Upload ảnh nền</Button>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              label="Ảnh poster"
              name="poster_path"
              rules={[
                {
                  required: !imgPoster, // Chỉ bắt buộc khi không có URL từ dữ liệu cũ
                  message: "Hãy tải lên ảnh poster!",
                },
              ]}
            >
              <Upload
                fileList={posterFileList}
                onChange={handlePosterChange}
                onRemove={handlePosterRemove} // Xử lý khi xóa ảnh
                beforeUpload={() => false}
                listType="picture"
              >
                {posterFileList.length < 1 && (
                  <Button icon={<UploadOutlined />}>Upload ảnh poster</Button>
                )}
              </Upload>
            </Form.Item>
          </div>

          {/* Thể loại và Loại phim */}
          <div
            className={`grid ${isTvShow ? "grid-cols-2" : "grid-cols-2"} gap-6`}
          >
            <Form.Item
              label="Thể loại"
              name="genres"
              rules={[{ required: true, message: "Hãy chọn thể loại!" }]}
            >
              <Select mode="multiple" placeholder="Chọn thể loại">
                {genres &&
                  genres.map((genres: Genres) => (
                    <Option key={genres.slug} value={genres.name}>
                      {genres.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Loại phim"
              name="category"
              rules={[{ required: true, message: "Hãy chọn loại phim!" }]}
            >
              <Select
                placeholder="Chọn loại phim"
                onChange={handleCategoryChange}
              >
                <Option value="Movie">Phim lẻ</Option>
                <Option value="TV Series">Phim dài tập</Option>
              </Select>
            </Form.Item>

            {/* {isTvShow && (
              <>
                {data && data.episodes.length > 0 ? (
                  // Nếu data.episodes không rỗng, lặp qua và hiển thị các tập phim
                  data.episodes.map((episode: Episode, index: number) => (
                    <div
                      key={episode._id}
                      className={`${
                        isTvShow ? "grid-cols-4" : "grid-cols-2"
                      } gap-6`}
                    >
                      <Form.Item
                        label={`Server name`}
                        name={`episodes[${index}].server_name`} // Thêm index vào name
                        rules={[
                          { required: true, message: "Hãy nhập tên server" },
                        ]}
                        initialValue={episode.server_name}
                      >
                        <Input
                          placeholder="Nhập tên server"
                          className="w-full"
                        />
                      </Form.Item>

                      <Form.Item
                        label={`Slug`}
                        name={`episodes[${index}].slug`} // Thêm index vào name
                        rules={[
                          { required: true, message: "Hãy nhập slug tập phim" },
                        ]}
                        initialValue={episode.slug}
                      >
                        <Input
                          placeholder="Nhập slug tập phim"
                          className="w-full"
                        />
                      </Form.Item>

                      <Form.Item
                        label={`Link`}
                        name={`episodes[${index}].embed`} // Thêm index vào name
                        rules={[
                          { required: true, message: "Hãy nhập link tập phim" },
                        ]}
                        initialValue={episode.embed}
                      >
                        <Input
                          placeholder="Nhập link tập phim"
                          className="w-full"
                        />
                      </Form.Item>

                      <Form.Item
                        label={`ID tập phim ${index + 1}`}
                        name={`episodes[${index}].episodes_id`} // Thêm index vào name
                        initialValue={episode._id}
                        hidden={true} // Ẩn ID trong form
                      ></Form.Item>
                    </div>
                  ))
                ) : (
                  // Nếu data.episodes rỗng, hiển thị form để người dùng nhập tập phim mới
                  <div
                    className={`${
                      isTvShow ? "grid-cols-4" : "grid-cols-2"
                    } gap-6`}
                  >
                    <Form.Item
                      label={`Server name`}
                      name={`episodes[0].server_name`} // Mặc định là episode 0 nếu không có data
                      rules={[
                        { required: true, message: "Hãy nhập tên server" },
                      ]}
                    >
                      <Input placeholder="Nhập tên server" className="w-full" />
                    </Form.Item>

                    <Form.Item
                      label={`Slug`}
                      name={`episodes[0].slug`} // Mặc định là episode 0
                      rules={[
                        { required: true, message: "Hãy nhập slug tập phim" },
                      ]}
                    >
                      <Input
                        placeholder="Nhập slug tập phim"
                        className="w-full"
                      />
                    </Form.Item>

                    <Form.Item
                      label={`Link`}
                      name={`episodes[0].embed`} // Mặc định là episode 0
                      rules={[
                        { required: true, message: "Hãy nhập link tập phim" },
                      ]}
                    >
                      <Input
                        placeholder="Nhập link tập phim"
                        className="w-full"
                      />
                    </Form.Item>

                    <Form.Item
                      label={`ID tập phim`}
                      name={`episodes[0].episodes_id`} // Mặc định là episode 0
                      hidden={true}
                    ></Form.Item>
                  </div>
                )}
              </>
            )} */}
          </div>

          {/* Ngày phát hành và điểm IMDb */}
          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label="Ngày phát hành"
              name="releaseDate"
              rules={[{ required: true, message: "Hãy chọn ngày phát hành!" }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="Chọn ngày phát hành"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="Đánh giá"
              name="imdbPoints"
              rules={[{ required: true, message: "Hãy chọn điểm IMDb!" }]}
            >
              <Rate allowHalf />
            </Form.Item>
          </div>

          {/* Mô tả */}
          <Form.Item
            label="Mô tả"
            name="overview"
            rules={[
              { required: true, message: "Hãy nhập mô tả phim!" },
              { whitespace: true, message: "không được chứa toàn dấu cách" },
            ]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả phim" />
          </Form.Item>

          {/* Nút thêm phim */}
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Sửa phim
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default EditMovies;
