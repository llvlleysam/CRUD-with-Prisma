import fetchDeleteUser from "@/app/WebServicesCall/fetchDeleteUser";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteUser() {
  return useMutation({
    mutationFn: (id: number) => fetchDeleteUser(id),
  })
}
