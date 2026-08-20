import type { User } from "@/interfaces/user.interface";

//funciona con login, register y check status
export interface AuthResponse {
  token: string;
  user: User;
}
