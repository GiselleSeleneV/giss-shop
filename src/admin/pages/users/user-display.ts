import type { UserRole } from "@/interfaces/user.interface";

export const AVAILABLE_ROLES: UserRole[] = ["admin", "super-user", "user"];

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  "super-user": "Super user",
  user: "Usuario",
};

export const getRoleLabel = (role: string) =>
  ROLE_LABELS[role as UserRole] ?? role.replace("-", " ");

export const getInitials = (fullName?: string) => {
  if (!fullName?.trim()) return "";

  const [first, second] = fullName.trim().split(/\s+/);
  return `${first.charAt(0)}${second?.charAt(0) ?? ""}`.toUpperCase();
};
