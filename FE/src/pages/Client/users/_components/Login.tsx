import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signin } from "@/services/Auth/Auth";
import { AxiosError } from "axios";
const Login = () => {
  const navigate = useNavigate(); // Dùng hook useNavigate để điều hướng sau khi đăng nhập thành công
  const [loading, setLoading] = useState(false); // Quản lý trạng thái loading của button đăng nhập

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true); // Bắt đầu loading
    try {
      const userData = await signin({ email: values.email, password: values.password });
      console.log(userData);
      // Nếu đăng nhập thành công, chuyển hướng tới trang dashboard hoặc trang chủ
      navigate("/");
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data &&
        error.response.data.messages
      ) {
        // Hiển thị từng thông báo lỗi từ backend
        error.response.data.messages.forEach((msg: string) => {
          message.error(msg);
        });
      } else {
        message.error("Không thể đăng ký người dùng");
      }
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };
  return (
    <div className="bg-[#16161a] py-56">
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
          name="email"
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
            disabled={loading} 
            loading={loading}
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
