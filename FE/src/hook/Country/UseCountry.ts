import { getCountry, getCountryBySlug } from "@/services/Country/Country";
import { useQuery } from "react-query";

const UseCountry = (slug? : number | string) => {

    const { data, ...rest } = useQuery({
        queryKey: ["COUNTRY_KEY", slug],
        queryFn: async () => {
            return slug ? await getCountryBySlug(String(slug)) : await getCountry();
        },
    });
    return { data, ...rest };
}
export default UseCountry;
