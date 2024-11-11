import { getGenres, getGenresBySlug } from "@/services/Genres/Genres";
import { useQuery } from "react-query";

const UseGenres = (slug?: number | string) => {

    const { data, ...rest } = useQuery({
        queryKey: ["GENRES_KEY", slug],
        queryFn: async () => {
            // Chuyển slug về kiểu string nếu nó tồn tại
            return slug ? await getGenresBySlug(String(slug)) : await getGenres();
        },
    });
    return { data, ...rest };
}
export default UseGenres;
