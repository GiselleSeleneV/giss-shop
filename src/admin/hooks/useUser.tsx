import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserByIdAction } from "../actions/getUserById.action";
import { updateUserAction } from "../actions/updateUser.action";
import type { User } from "@/interfaces/user.interface";

export const useUser = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["user", { id }],
    queryFn: () => getUserByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: updateUserAction,
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["user", { id: user.id }], user);
      queryClient.setQueryData(["user", { id }], user);
    },
  });

  return {
    ...query,
    mutation,
  };
};
