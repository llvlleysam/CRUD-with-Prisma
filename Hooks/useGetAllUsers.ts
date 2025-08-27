import fetchGETAllUsers from "@/app/WebServicesCall/fetchGETAllUsers";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchGETAllUsers,
  });
}
