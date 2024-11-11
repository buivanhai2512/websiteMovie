import { message } from "antd";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouterProps {
  children: React.ReactNode;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
  const [isRedirecting, setIsRedirecting] = useState(false); // Trạng thái điều hướng
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Thông báo lỗi

  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !storedUser) {
      setIsRedirecting(true);
    } else {
      try {
        const user = JSON.parse(storedUser);
        if (user.role !== "admin") {
          setErrorMessage("Bạn không có quyền truy cập vào trang này!");
          setIsRedirecting(true);
        }
      } catch (error) {
        console.error("Lỗi khi phân tích dữ liệu người dùng từ localStorage:", error);
        setErrorMessage("Dữ liệu người dùng không hợp lệ.");
        setIsRedirecting(true);
      }
    }
  }, [storedUser, token]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage); // Chỉ gọi message.error một lần khi có thông báo lỗi
    }
  }, [errorMessage]);

  if (isRedirecting) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRouter;
