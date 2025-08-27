import fetchEditUser from "@/app/WebServicesCall/fetchEditUser";
import { useMutation } from "@tanstack/react-query";

type TData = {
    id?: number;
  name?: string;
  family?: string;
  age?: number;
  liked?: boolean;
};

export default function useEditUser() {
  return useMutation({
    mutationFn: ({ data, id }: { data: TData; id: number }) =>
      fetchEditUser(data, id),
  });
}
