import { Breadcrumb, Button, Form, Input, theme } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import UsecountryMutation from "@/hook/Country/UsecountryMutation";
interface Country {
  _id: string;
  name: string;
  slug: string;
  // Thêm các thuộc tính khác nếu cần
}
const CreateCountry = () => {
  const navigate = useNavigate(); 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [form] = Form.useForm();
  // Hàm xử lý submit form
  const { mutate } = UsecountryMutation({ action: "CREATE" });
  const onFinish = async (data: Country) => {
    try {
       await mutate(data);
       navigate("/admin/list-country");
    } catch (error) {
      console.log("a",error);
    }
  };

  return (
    <Content className="mx-10 my-5">
      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[{ title: "Admin" }, { title: "Create-Country" }]}
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
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Tên quốc gia */}
          <div className="m-auto w-[70%]">
            <Form.Item
              label="Tên Quốc Gia"
              name="name"
              rules={[
                { required: true, message: "Hãy nhập tên Quốc Gia!" },
                { whitespace: true, message: "không được chứa toàn dấu cách" },
              ]}
            >
              <Input placeholder="Nhập tên phim" />
            </Form.Item>
          </div>

          {/* Nút thêm phim */}
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Thêm quốc gia
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default CreateCountry;
