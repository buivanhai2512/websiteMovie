// src/hooks/useEpisodes.ts
import { useQuery } from "react-query";
import axiosInstance from "@/config/Axios";

// Hook lấy danh sách các tập phim
export const useEpisodesById = (episode: string) => {
  return useQuery(
    ["episodes", episode], // key cho query
    () => getEpisodesById(episode), // Gọi hàm getEpisodes để lấy dữ liệu
    {
      enabled: !!episode, // Chỉ thực hiện query nếu movieSlug có giá trị
      onError: (error) => {
        console.error("Error in useEpisodes query:", error);
      }
    }
  );
};
// src/api/episodes.ts

// Hàm lấy danh sách các tập phim theo slug của phim
export const getEpisodesById = async (episode: string) => {
  if (!episode) {
    throw new Error("movieSlug is required");
  }

  try {
    const response = await axiosInstance.get(`/api/episodesById/${episode}`);
    return response.data; // Trả về dữ liệu tập phim
  } catch (error) {
    console.error("Error fetching episodes:", error);
    throw error; // Nếu có lỗi xảy ra, ném lỗi để xử lý ở nơi gọi hàm
  }
};


