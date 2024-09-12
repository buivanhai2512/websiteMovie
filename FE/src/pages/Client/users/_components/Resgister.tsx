import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { LoginFormValues } from "../LoginInterface";

const Register = () => {
  const onFinish = (values: LoginFormValues) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="bg-[#16161a] py-44">
      <Form
        name="register"
        className="px-5 xl:px-0"
        initialValues={{ remember: true }}
        style={{ maxWidth: 400, margin: "auto" }}
        onFinish={onFinish}
      >
        <h4 className="text-white mb-10 text-center text-xl">
          Đăng ký tài khoản
        </h4>

        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Vui lòng nhập tên của bạn !!" },
            { min: 6, message: "Tên phải có ít nhất 6 ký tự !!" },
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
            placeholder="Nhập tên đăng nhập của bạn"
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
            placeholder="Nhập mật khẩu đăng nhập của bạn"
          />
        </Form.Item>

        {/* Trường Xác nhận mật khẩu */}
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng xác nhận lại mật khẩu !!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp !!"));
              },
            }),
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
            placeholder="Xác nhận mật khẩu"
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            className="bg-[#25252b] py-6 border-none"
            id="custom-button"
            htmlType="submit"
          >
            Đăng ký ngay
          </Button>
        </Form.Item>

        <Form.Item style={{ marginTop: 30 }}>
          <div className="w-full">
            <div>
              <Link to={`/`} className="text-white mr-5 text-lg">
                Trang chủ
              </Link>
              <span className=" mx-2 text-lg text-[#32323c]">|</span>
              <Link to={`/login`} className="text-white mx-5 text-lg">
                Đăng nhập
              </Link>
              <span className=" mx-2 text-lg text-[#32323c]">|</span>
                <Link to={`/`} className="text-white ml-2 text-lg">
                Quên Pass
                </Link>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
