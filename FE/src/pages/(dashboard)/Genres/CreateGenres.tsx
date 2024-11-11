import { Breadcrumb, Button, Form, Input, theme } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import UseGenreMutation from "@/hook/Genres/UseGenresMutation";
interface Country {
  _id: string;
  name: string;
  slug: string;
}
const CreateGenres = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // Hàm xử lý submit form
  const { mutate } = UseGenreMutation({ action: "CREATE" });

  const onFinish = async (data: Country) => {
    try {
      await mutate(data);
      console.log("Form Values:", data);
      navigate("/admin/list-genres");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Content className="mx-10 my-5">
      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[{ title: "Admin" }, { title: "Create-Genres" }]}
          style={{ margin: "16px 0" }}
        />
        <Link to="/admin/list-genres">
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
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Tên Thể loại */}
          <div className="m-auto w-[70%]">
            <Form.Item
              label="Tên loại phim"
              name="name"
              rules={[
                { required: true, message: "Hãy nhập tên phim!" },
                { whitespace: true, message: "không được chứa toàn dấu cách" },
              ]}
            >
              <Input placeholder="Nhập tên phim" />
            </Form.Item>
          </div>

          {/* Nút thêm phim */}
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Thêm loại phim
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default CreateGenres;
