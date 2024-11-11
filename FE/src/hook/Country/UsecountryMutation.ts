import { addCountry, deleteCountry, deleteManyCountries, updateCountry } from "@/services/Country/Country";
import { useMutation, useQueryClient } from "react-query";


interface Country {
  _id: string;
  name: string;
  slug: string; // Thêm slug vào interface

}

type useCountryMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE" | "DELETEMANY";
};

const UsecountryMutation = ({ action }: useCountryMutationProps) => {
  const queryClient = useQueryClient();
  
  const { mutate, ...rest } = useMutation({
    mutationFn: async (data: Country | string | string[]) => {
      switch (action) {
        case "CREATE":
          await addCountry(data as Country);
          break;
        case "UPDATE":
          await updateCountry(data as Country);
          break;
        case "DELETE":
          await deleteCountry((data as Country).slug);
          break;
        case "DELETEMANY":
          await deleteManyCountries(data as string[]); // Truyền danh sách ID
          break;
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["COUNTRY_KEY"]); // Làm mới dữ liệu quốc gia sau khi thao tác thành công
      
    },
  });

  return { mutate, ...rest };
};

export default UsecountryMutation;
