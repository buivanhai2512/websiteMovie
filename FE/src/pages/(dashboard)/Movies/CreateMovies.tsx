import { useState } from "react";
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
} from "antd";
import { RollbackOutlined, UploadOutlined } from "@ant-design/icons";
import { Link
  , useNavigate

 } from "react-router-dom";
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

const { Option } = Select;

const CreateMovies = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [form] = Form.useForm();
  const { data: countries } = UseCountry();
  const { data: genres } = UseGenres();
  const { mutate } = UseMoviesMutation({ action: "CREATE" });
  const navigate = useNavigate();
  const [isTvShow, ] = useState(false);
  const [backdropFileList, setBackdropFileList] = useState<UploadFile[]>([]);
  const [posterFileList, setPosterFileList] = useState<UploadFile[]>([]);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [imgPoster, setimgPoster] = useState<string | null>(null);

  // Hàm xử lý submit form
  const onFinish = async (values: MovieFormValues) => {
    try {
      const releaseDate = moment(values.releaseDate);
      const formattedReleaseDate = releaseDate.format("YYYY-MM-DD");
      const episodesData = isTvShow ? [{ 
        server_name: values.server_name, 
        slug: values.slug,
        embed: values.embed ,
      }] : [];
      const data = {
        ...values,
        backdrop_path: imgURL,
        poster_path: imgPoster,
        releaseDate: formattedReleaseDate,
        episodes:episodesData,
      };
      await mutate(data);
      navigate("/admin/list-movies");
    } catch (error) {
      console.log(error);
    }
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
              rules={[{ required: true, message: "Hãy tải lên ảnh nền!" }]}
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
              rules={[{ required: true, message: "Hãy tải lên ảnh poster!" }]}
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
              >
                <Option value="Movie">Phim lẻ</Option>
                <Option value="TVSeries">Phim dài tập</Option>
              </Select>
            </Form.Item>

            {/* {isTvShow && (
              <>
                <Form.Item
                  label="Server name"
                  name="server_name"
                  rules={[{ required: true, message: "Hãy nhập tên tập phim" }]}
                >
                  <Input
                    placeholder="Nhập số tập phim"
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item
                  label="slug"
                  name="slug"
                  rules={[{ required: true, message: "Hãy nhập slug tập phim" }]}
                >
                  <Input
                    placeholder="Nhập slug tập phim"
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item
                  label="Link tập phim"
                  name="embed"
                  rules={[{ required: true, message: "Hãy nhập tên link tập phim" }]}
                >
                  <Input
                    placeholder="Nhập số tập phim"
                    className="w-full"
                  />
                </Form.Item>
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
              Thêm phim
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default CreateMovies;
