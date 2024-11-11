import {  getAllUsers, getUserById } from "@/services/Auth/Auth";
import { useQuery } from "react-query";

const UseAuth = (id?: string) => {

    const { data, ...rest } = useQuery({
        queryKey: ["AUTH_KEY", id],
        queryFn: async () => {
            // Chuyển slug về kiểu string nếu nó tồn tại
            return id ? await getUserById(id) : await getAllUsers();
        },
    });
    return { data, ...rest };
}
export default UseAuth;
