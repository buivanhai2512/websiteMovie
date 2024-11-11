import { addGenres, deleteGenres, deleteManyGenres, updateGenres } from "@/services/Genres/Genres";
import { useMutation, useQueryClient } from "react-query";

interface Genre {
  _id: string;
  name: string;
  slug: string; // Thêm slug vào interface
}

type useGenreMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE" | "DELETEMANY";
};

const UseGenreMutation = ({ action }: useGenreMutationProps) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (data: Genre | string | string[]) => {
      switch (action) {
        case "CREATE":
          await addGenres(data as Genre);
          break;
        case "UPDATE":
          await updateGenres(data as Genre); // Sử dụng slug khi update
          break;
        case "DELETE":
          await deleteGenres((data as Genre).slug); // Sử dụng slug khi delete
          break;
        case "DELETEMANY":
          await deleteManyGenres(data as string[]); 
          break;
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["GENRES_KEY"]); // Invalidate cache để làm mới dữ liệu
    },
  });

  return { mutate, ...rest };
};

export default UseGenreMutation;
