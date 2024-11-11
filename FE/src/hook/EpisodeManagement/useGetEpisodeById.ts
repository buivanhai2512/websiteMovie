import { useQuery } from 'react-query';
import axiosInstance from '@/config/Axios';

// Định nghĩa URL API (cần thay đổi URL thành URL đúng của bạn)
const fetchEpisodeById = async (episodeId : string) => {
  const response = await axiosInstance.get(`/api/episodesById/${episodeId}`);
  return response.data; // Trả về dữ liệu từ API
};

const useGetEpisodeById = (episodeId : string) => {
  // Sử dụng useQuery từ react-query để fetch dữ liệu
  return useQuery(
    ['episodeById', episodeId], // Key cho react-query
    () => fetchEpisodeById(episodeId), // Hàm fetch dữ liệu
    {
      enabled: !!episodeId, // Chỉ kích hoạt query khi có episodeId
      retry: 2, // Số lần thử lại nếu có lỗi
      refetchOnWindowFocus: false, // Không tự động refetch khi window có focus
      onError: (error) => {
        console.error('Error fetching episode:', error); // Xử lý lỗi
      }
    }
  );
};

export default useGetEpisodeById;
