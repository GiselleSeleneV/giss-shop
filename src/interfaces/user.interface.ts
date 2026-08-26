export type UserRole = "admin" | "super-user" | "user";

export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: UserRole[];
}
