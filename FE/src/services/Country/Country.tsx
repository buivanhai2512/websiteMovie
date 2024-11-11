import axiosInstance from "@/config/Axios";
import { message } from "antd";
import { AxiosError } from "axios"; 

interface Country {
  slug: string;  // Thay đổi từ _id thành slug
  name: string;
}

// Lấy danh sách tất cả quốc gia
export const getCountry = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/country");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Lấy thông tin quốc gia theo slug
export const getCountryBySlug = async (slug?: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/country/${slug}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Thêm quốc gia mới
export const addCountry = async (country: Country) => {
  try {
    const response = await axiosInstance.post(`/api/v1/country`, country);
    message.success("Thêm quốc gia thành công!");
    return { success: true, message: "Thêm quốc gia thành công!", data: response.data };
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      message.error(error.response.data.message);  // Hiển thị thông báo lỗi từ server
    } else {
      message.error("Có lỗi xảy ra. Vui lòng thử lại!");  
    }
    return null;
  }
};

// Xóa quốc gia theo slug
export const deleteCountry = async (slug?: string) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/country/${slug}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Cập nhật quốc gia dựa trên slug
export const updateCountry = async (country: Country) => {
  try {
    const response = await axiosInstance.put(`/api/v1/country/${country.slug}`, country);  // Thay _id bằng slug
    message.success("Cập nhật quốc gia thành công!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Xóa nhiều quốc gia dựa trên slug
export const deleteManyCountries = async (slugs: string[]) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/countries`, {
      data: { slugs },  // Truyền danh sách slug vào body của request
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
