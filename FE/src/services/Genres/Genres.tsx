import axiosInstance from "@/config/Axios";
import { message } from "antd";
import { AxiosError } from "axios"; 

interface Genre {
  _id: string;
  name: string;
  slug: string ; 
}

// Lấy danh sách tất cả thể loại
export const getGenres = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/genres");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Lấy thông tin thể loại theo slug
export const getGenresBySlug = async (slug?: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/genres/${slug}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Thêm thể loại mới
export const addGenres = async (genre: Genre) => {
  try {
    const response = await axiosInstance.post(`/api/v1/genres`, genre);
    message.success("Thêm loại phim thành công!");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      message.error(error.response.data.message);
    } else {
      message.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }
    console.error(error);
  }
};

// Xóa thể loại theo slug
export const deleteGenres = async (slug?: string) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/genres/${slug}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Cập nhật thể loại dựa trên slug
export const updateGenres = async (genre: Genre) => {
  try {
    const response = await axiosInstance.put(`/api/v1/genres/${genre.slug}`, genre); // Sử dụng slug thay vì _id
    message.success("Cập nhật loại phim thành công!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Xóa nhiều thể loại
export const deleteManyGenres = async (slugs: string[]) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/genres`, {
      data: { slugs }, // Truyền danh sách slug vào body của request
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
