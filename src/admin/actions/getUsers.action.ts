import gissApi from "@/api/gissApi";
import type { User } from "@/interfaces/user.interface";

export const getUsersAction = async (): Promise<User[]> => {
  const { data } = await gissApi.get<User[] | { users: User[] }>("/users");

  return Array.isArray(data) ? data : (data.users ?? []);
};
