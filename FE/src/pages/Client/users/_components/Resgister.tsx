import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginFormValues } from "../LoginInterface";
import { signup } from "@/services/Auth/Auth";
import { AxiosError } from "axios";

const Register = () => {
  const Navigate = useNavigate();
  const onFinish = async (values: LoginFormValues) => {
    try {
      // Gọi hàm đăng ký và truyền dữ liệu từ form vào
      const response = await signup({
        name: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        email: values.email,
      });

      if (response) {
        message.success("Đăng ký thành công!");
        Navigate(`/login`);
        // Có thể điều hướng tới trang đăng nhập sau khi đăng ký thành công
      }
    } catch (error) {
      // Kiểm tra xem có phải lỗi từ server không và hiển thị thông báo phù hợp
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message);
      } else {
        message.error("Không thể đăng ký người dùng");
      }
    }
  };

  return (
    <div className="bg-[#16161a] py-52">
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
            { min: 3, message: "Tên phải có ít nhất 3 ký tự !!" },
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
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email của bạn!" }, { type: "email", message: "Email không hợp lệ!" }]}
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
            placeholder="Nhập email của bạn"
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
