import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { LoginFormValues } from "../LoginInterface";
const Login = () => {
  const onFinish = (values: LoginFormValues) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="bg-[#16161a] py-44">
      <Form
        name="login"
        className="px-5 xl:px-0"
        initialValues={{ remember: true }}
        style={{ maxWidth: 400, margin: "auto" }}
        onFinish={onFinish}
      >
        <h4 className="text-white mb-10 text-center text-xl">
          Đăng nhập tài khoản
        </h4>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Vui lòng nhập Email của bạn !!" },
          ]}
        >
          <Input
            id="custom-input"
            style={{
              backgroundColor: "#25252b",
              color: "gray",
              padding: "10px",
              border: "none",
            }}
            prefix={<UserOutlined />}
            placeholder="Vui lòng nhập tên đăng nhập của bạn"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập Password của bạn !!" },
            { min: 6, message: "Password phải có ít nhất 6 ký tự !!" },
          ]}
        >
          <Input
            id="custom-input"
            style={{
              backgroundColor: "#25252b",
              color: "gray",
              padding: "10px",
              border: "none",
            }}
            prefix={<LockOutlined />}
            type="password"
            placeholder="Vui lòng nhập mật khẩu của bạn"
          />
        </Form.Item>
        <Form.Item>
          <Button
            block
            className="bg-[#25252b] py-6 border-none"
            id="custom-button"
            htmlType="submit"
          >
            Đăng nhập ngay
          </Button>
        </Form.Item>
        <Form.Item style={{ marginTop: 30}}>
          <div className="w-full">
            <div>
              <Link to={`/`} className="text-white mr-5 text-lg">
                Trở về trang chủ
              </Link>
              <span className=" mx-2 text-lg text-[#32323c]">|</span>
              <Link to={`/register`} className="text-white mx-5 text-lg">
                Đăng ký tài khoản
              </Link>
            <span className=" mx-2 text-lg text-[#32323c]">|</span>
            </div>
           <div className="flex justify-center mt-2">
           <Link to={`/`} className="text-white text-lg">
              Quên mật khẩu
            </Link>
           </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
