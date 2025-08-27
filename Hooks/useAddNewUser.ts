import fetchAddNewUser from "@/app/WebServicesCall/fetchAddNewUser";
import { useMutation } from "@tanstack/react-query";

type TData = {
  name?: string;
  family?: string;
  age?: number;
  liked?: boolean;
};

export default function useAddNewUser() {
  return useMutation({
    mutationFn: (data: TData) => fetchAddNewUser(data),
  });
}
