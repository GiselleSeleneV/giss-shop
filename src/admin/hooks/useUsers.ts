import { useQuery } from "@tanstack/react-query";
import { getUsersAction } from "../actions/getUsers.action";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsersAction,
    staleTime: 1000 * 60 * 5,
  });
};
