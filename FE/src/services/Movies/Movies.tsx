import axios from 'axios';
import { message } from 'antd';
import { Movie } from '@/types/allType';
import axiosInstance from '@/config/Axios';

const apiEndpoint = '/api/v1/movies'; // Thay đổi URL phù hợp với endpoint của bạn

// Lấy danh sách tất cả phim
export async function getAllMovies() {
  try {
    const response = await axiosInstance.get(apiEndpoint);
    return response.data;
  } catch (error) {
    console.log(error)
    message.error('Không thể lấy danh sách phim');
  }
}

// Lấy phim theo slug
export async function getMovieBySlug(slug : string) {
  try {
    const response = await axiosInstance.get(`${apiEndpoint}/${slug}`);
    return response.data;
  } catch (error) {
    console.log(error)
    message.error('Không thể lấy thông tin phim');
  }
}

// Thêm phim mới
export async function addMovie(movieData : Movie) {
  try {
    console.log("meo", movieData)
    const response = await axiosInstance.post(apiEndpoint, movieData);
    message.success('Phim đã được thêm thành công!');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data && error.response.data.message) {
        // Hiển thị thông báo lỗi từ server
        message.error(error.response.data.message);
      } else {
        // Hiển thị thông báo lỗi mặc định
        message.error('Không thể thêm phim');
      }
    } else {
      // Xử lý lỗi khác nếu không phải là AxiosError
      message.error('Đã xảy ra lỗi không xác định');
    }
    console.log(error);
  }
}

// Cập nhật thông tin phim
export async function updateMovie(movieData : Movie) {
  try {
    console.log("movieData", movieData)
    const response = await axiosInstance.put(`${apiEndpoint}/${movieData.slug}`, movieData);
    message.success('Phim đã được cập nhật thành công!');
    return response.data;
  } catch (error) {
    console.log(error)
    message.error('Không thể cập nhật phim');
  }
}

// Xóa phim
export async function deleteMovie(movieData : Movie) {
  try {
    const response = await axiosInstance.delete(`${apiEndpoint}/${movieData.slug}`);
    message.success('Phim đã được xóa thành công!');
    return response.data;
  } catch (error) {
    console.log(error)
    message.error('Không thể xóa phim');
  }
}

// Lấy phim theo danh mục
export async function getMoviesByCategory(category : string) {
  try {
    const response = await axiosInstance.get(`${apiEndpoint}/category/${category}`);
    return response.data;
  } catch (error) {
    console.log(error)
    message.error('Không thể lấy phim theo danh mục');
  }
}

// Lấy phim theo điểm đánh giá
export async function getMoviesByRating(rating : number) {
  try {
    const response = await axiosInstance.get(`${apiEndpoint}/rating/${rating}`);
    return response.data;
  } catch (error) {
    console.log(error)
    message.error('Không thể lấy phim theo điểm đánh giá');
  }
}
