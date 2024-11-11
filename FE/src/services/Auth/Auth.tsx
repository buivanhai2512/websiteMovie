import axiosInstance from '@/config/Axios'; // Đảm bảo axiosInstance được cấu hình đúng
import { message } from 'antd';
import { AxiosError } from 'axios'; // Import AxiosError

const apiEndpoint = '/api/v1/auth'; // Thay đổi URL phù hợp với endpoint của bạn

// Định nghĩa kiểu cho userData
interface UserData {
  name?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
  age?: number;
  avatar?: string;
}
// Định nghĩa kiểu cho đổi mật khẩu
interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Đăng ký người dùng
export async function signup(userData: UserData) {
  try {
    const response = await axiosInstance.post(`${apiEndpoint}/signup`, userData);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof AxiosError) {
      // Log toàn bộ thông tin lỗi để kiểm tra cấu trúc
      if (error.response && error.response.data) {
        // Xử lý lỗi với thông báo từ backend
        const errorMessages = error.response.data.messages || ["Đã có lỗi xảy ra"];
        errorMessages.forEach((msg : string) => message.error(msg));
      } else {
        message.error("Đã có lỗi xảy ra, vui lòng thử lại!");
      }
    } else {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  }
}

// Đăng nhập người dùng
export async function signin(credentials: { email: string; password: string }) {
  try {
    const response = await axiosInstance.post(`${apiEndpoint}/signin`, credentials);
    const { user, token } = response.data;

    // Kiểm tra nếu token và user có tồn tại
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      }));
      message.success('Đăng nhập thành công!');
      return response.data;
    } else {
      message.error('Thông tin đăng nhập không hợp lệ.');
    }
  } catch (error: unknown) {
    // Kiểm tra xem lỗi có phải là lỗi từ Axios
    if (error instanceof AxiosError && error.response && error.response.data) {
      // Lấy thông báo lỗi từ backend
      const errorMessages = error.response.data.messages || ['Không thể đăng nhập'];
      errorMessages.forEach((msg: string) => message.error(msg));
    } else {
      // Xử lý các lỗi không phải Axios hoặc không có thông báo chi tiết
      message.error('Không thể đăng nhập. Vui lòng thử lại!');
    }
    // Log lỗi chi tiết để dễ dàng debug
    console.log('Login error: ', error);
  }
}

// Đổi mật khẩu
export async function changePassword(userId: string, passwordData: ChangePasswordData) {
  try {
    const response = await axiosInstance.put(`${apiEndpoint}/${userId}/change-password`, passwordData);
    message.success('Đổi mật khẩu thành công!');
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof AxiosError) {
      const errorMessages = error.response?.data.messages || ["Đã có lỗi xảy ra"];
      errorMessages.forEach((msg: string) => message.error(msg));
    } else {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  }
}
// Lấy danh sách tất cả người dùng
export async function getAllUsers() {
  try {
    const response = await axiosInstance.get(`${apiEndpoint}`);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    message.error('Không thể lấy danh sách người dùng');
  }
}

// Lấy người dùng theo ID
export async function getUserById(userId: string) {
  try {
    const response = await axiosInstance.get(`${apiEndpoint}/${userId}`);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    message.error('Không thể lấy thông tin người dùng');
  }
}
// Cập nhật thông tin người dùng
export async function updateUser(userId: string, userData: UserData) {
  try {
    const response = await axiosInstance.put(`${apiEndpoint}/${userId}`, userData);
    message.success('Cập nhật thông tin người dùng thành công!');
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof AxiosError) {
      // Xử lý lỗi từ backend
      const errorMessages = error.response?.data.messages || ["Đã có lỗi xảy ra"];
      errorMessages.forEach((msg: string) => message.error(msg));
    } else {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  }
}
// Xóa người dùng
export async function deleteUser(userId: string) {
  try {
    const response = await axiosInstance.delete(`${apiEndpoint}/${userId}`);
    message.success('Người dùng đã được xóa thành công!');
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof AxiosError) {
      // Xử lý lỗi từ backend
      const errorMessages = error.response?.data.messages || ["Đã có lỗi xảy ra"];
      errorMessages.forEach((msg: string) => message.error(msg));
    } else {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
