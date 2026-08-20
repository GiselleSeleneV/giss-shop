import gissApi from "@/api/gissApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const loginAction = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const { data } = await gissApi.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return data;
};
