import { getAllMovies, getMovieBySlug } from "@/services/Movies/Movies";
import { useQuery } from "react-query";

const UseMovies = (slug?: number | string) => {

    const { data, ...rest } = useQuery({
        queryKey: ["MOVIES_KEY", slug],
        queryFn: async () => {
            // Chuyển slug về kiểu string nếu nó tồn tại
            return slug ? await getMovieBySlug(String(slug)) : await getAllMovies();
        },
    });
    return { data, ...rest };
}
export default UseMovies;
