import gissApi from "@/api/gissApi";
import type { User } from "@/interfaces/user.interface";

export const getUserByIdAction = async (id: string): Promise<User> => {
  if (!id) throw new Error("Id is required");

  const { data } = await gissApi.get<User>(`/users/${id}`);
  return data;
};
