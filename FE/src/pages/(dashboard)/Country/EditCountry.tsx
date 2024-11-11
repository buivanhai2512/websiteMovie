import { Breadcrumb, Button, Form, Input, Spin, theme } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import UsecountryMutation from "@/hook/Country/UsecountryMutation";
import UseCountry from "@/hook/Country/UseCountry";
import { useEffect } from "react";

interface Country {
  _id: string;
  name: string;
  slug: string; // Thêm slug
}

const EditCountry = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { slug } = useParams();
  console.log(slug)
  const { data, isLoading } = UseCountry(slug); 
  const { mutate } = UsecountryMutation({ action: "UPDATE" });

  // Đổ dữ liệu vào form khi data thay đổi
  useEffect(() => {
    if (data) {
      console.log(data)
      form.setFieldsValue({
        name: data.name ?? "", // Xử lý khi name có thể undefined
      });
    }
  }, [data, form]);

  // Hàm submit form
  const onFinish = async (values: Country) => {
    const updatedData = {
      ...values,
      slug: slug ?? "", // Đảm bảo slug là một chuỗi, sử dụng giá trị mặc định nếu slug là undefined
    };

    if (slug) { // Chỉ gọi mutate khi slug có giá trị hợp lệ
      await mutate(updatedData);
      
      navigate("/admin/list-country");
    } else {
      console.error("Slug is undefined. Cannot update country.");
    }
  };

  return (
    <Content className="mx-10 my-5">
      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[{ title: "Admin" }, { title: "Edit-Country" }]}
          style={{ margin: "16px 0" }}
        />
        <Link to="/admin/list-country">
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
            {/* Tên quốc gia */}
            <div className="m-auto w-[70%]">
              <Form.Item
                label="Tên Quốc Gia"
                name="name"
                rules={[
                  { required: true, message: "Hãy nhập tên quốc gia!" },
                  { whitespace: true, message: "không được chứa toàn dấu cách" },
                ]}
              >
                <Input placeholder="Nhập tên quốc gia" />
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

export default EditCountry;
