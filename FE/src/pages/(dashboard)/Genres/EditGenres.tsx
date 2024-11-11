import { Breadcrumb, Button, Form, Input, Spin, theme, message } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import UseGenresMutation from "@/hook/Genres/UseGenresMutation";
import UseGenres from "@/hook/Genres/UseGenres";
import { useEffect } from "react";

interface Genre {
  _id: string;
  name: string;
  slug: string;
}

const EditGenre = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { slug } = useParams(); // Lấy slug từ URL
  const { data, isLoading } = UseGenres(slug); // Lấy dữ liệu thể loại bằng slug
  const { mutate } = UseGenresMutation({ action: "UPDATE" });

  // Đổ dữ liệu vào form khi data thay đổi
  useEffect(() => {
    if (data) {
      console.log("Received data:", data); // Kiểm tra dữ liệu trả về
      form.setFieldsValue({
        name: data.name ?? "", // Xử lý khi name có thể undefined
      });
    }
  }, [data, form]);

  // Hàm submit form
  const onFinish = async (values: Genre) => {
    const updatedData = {
      ...values,
      slug: slug ?? "", // Sử dụng slug để xác định thể loại
    };

    if (slug) { // Chỉ gọi mutate khi slug có giá trị hợp lệ
      await mutate(updatedData, {
        onSuccess: () => {
          navigate("/admin/list-genres");
        },
        onError: () => {
          message.error("Có lỗi xảy ra khi cập nhật thể loại!");
        },
      });
    } else {
      console.error("Slug is undefined. Cannot update genre.");
    }
  };

  return (
    <Content className="mx-10 my-5">
      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[{ title: "Admin" }, { title: "Edit-Genre" }]}
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
        {isLoading ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : (
          <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* Tên thể loại */}
            <div className="m-auto w-[70%]">
              <Form.Item
                label="Tên Thể Loại"
                name="name"
                rules={[
                  { required: true, message: "Hãy nhập tên thể loại!" },
                  { whitespace: true, message: "không được chứa toàn dấu cách" },
                ]}
              >
                <Input placeholder="Nhập tên thể loại" />
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

export default EditGenre;
