import { Breadcrumb, Button, Form, Input, message, Spin, theme } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import useGetEpisodeById from "@/hook/EpisodeManagement/useGetEpisodeById";
import axiosInstance from "@/config/Axios";
import { useQueryClient } from "react-query";

interface Episode {
  _id: string;
  name: string;
  description: string;
  movieSlug: string;
  episodeNumber: number;
  server_name: string;
  embed: string;
}

const EditEpisode = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const queryClient = useQueryClient(); 
  const [form] = Form.useForm();
  const { slug } = useParams(); // Lấy episodeId từ URL
  const { data, isLoading } = useGetEpisodeById(slug ?? ""); // Lấy dữ liệu tập phim bằng episodeId
const Navigate = useNavigate();
  // Đổ dữ liệu vào form khi data thay đổi
  useEffect(() => {
    if (data && data.episode) {
      form.setFieldsValue({
        server_name: data.episode.server_name || "", // Truy cập server_name từ data.episode
        embed: data.episode.embed || "", // Truy cập embed từ data.episode
      });
    }
  }, [data, form]);
    // Hàm submit form
    const onFinish = async (values: Episode) => {
        if (!slug) {
          console.error("Episode ID is undefined. Cannot update episode.");
          return;
        }
    
        const updatedData = {
          ...values,
          slug, // Sử dụng episodeId để xác định tập phim
        };
    
        try {
          await axiosInstance.put(
            `api/episodesById/${slug}`,
            updatedData
          );
          message.success("Cập nhật tập phim thành công !")
          Navigate(`/admin/list-tap-phim/${data?.movie?.slug}`)
          queryClient.invalidateQueries(['episodes', data?.movie?.slug]);
          // Redirect hoặc hiển thị thông báo thành công nếu cần
        } catch (error) {
          console.error("Lỗi khi cập nhật tập phim:", error);
        }
      };

  return (
    <Content className="mx-10 my-5">
      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[{ title: "Admin" }, { title: "Edit-Episode" }]}
          style={{ margin: "16px 0" }}
        />
        <Link to={`/admin/list-tap-phim/${data?.episode?.movieSlug}`}>
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
        {isLoading ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : (
          <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* Tên tập phim */}
            <div className="m-auto w-[70%]">
              <Form.Item
                label="Tên Tập Phim"
                name="server_name"
                rules={[
                  { required: true, message: "Hãy nhập tên tập phim!" },
                  { whitespace: true, message: "Không được chứa toàn dấu cách" },
                ]}
              >
                <Input placeholder="Nhập tên tập phim" />
              </Form.Item>
            </div>
            {/* Mô tả tập phim */}
            <div className="m-auto w-[70%]">
              <Form.Item
                label="Embed"
                name="embed"
                rules={[
                  { required: true, message: "Hãy nhập mô tả cho tập phim!" },
                ]}
              >
                <Input placeholder="Nhập link tập phim" />
              </Form.Item>
            </div>
            {/* Nút cập nhật */}
            <Form.Item className="flex justify-center">
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </Content>
  );
};

export default EditEpisode;
