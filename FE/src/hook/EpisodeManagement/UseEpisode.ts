// src/hooks/useEpisodes.ts
import { useQuery } from "react-query";
import axiosInstance from "@/config/Axios";

// Hook lấy danh sách các tập phim
export const useEpisodes = (movieSlug: string) => {
  return useQuery(
    ["episodes", movieSlug], // key cho query
    () => getEpisodes(movieSlug), // Gọi hàm getEpisodes để lấy dữ liệu
    {
      enabled: !!movieSlug, // Chỉ thực hiện query nếu movieSlug có giá trị
      onError: (error) => {
        console.error("Error in useEpisodes query:", error);
      }
    }
  );
};
// src/api/episodes.ts

// Hàm lấy danh sách các tập phim theo slug của phim
export const getEpisodes = async (movieSlug: string) => {
  if (!movieSlug) {
    throw new Error("movieSlug is required");
  }

  try {
    const response = await axiosInstance.get(`/api/episodes/${movieSlug}`);
    return response.data; // Trả về dữ liệu tập phim
  } catch (error) {
    console.error("Error fetching episodes:", error);
    throw error; // Nếu có lỗi xảy ra, ném lỗi để xử lý ở nơi gọi hàm
  }
};


