import { addMovie, deleteMovie, updateMovie } from "@/services/Movies/Movies";
import { Movie } from "@/types/allType";
import { useMutation, useQueryClient } from "react-query";

type useGenreMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
};

const UseMoviesMutation = ({ action }: useGenreMutationProps) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (data: Movie | string | string[]) => {
      switch (action) {
        case "CREATE":
          await addMovie(data as Movie);
          break;
        case "UPDATE":
          await updateMovie(data as Movie); // Sử dụng slug khi update
          break;
        case "DELETE":
          await deleteMovie((data as Movie)); // Sử dụng slug khi delete
          break;
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["MOVIES_KEY"]); // Invalidate cache để làm mới dữ liệu
    },
  });

  return { mutate, ...rest };
};

export default UseMoviesMutation;
