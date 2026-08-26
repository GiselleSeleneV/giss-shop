import gissApi from "@/api/gissApi";
import type { User, UserRole } from "@/interfaces/user.interface";

export interface UpdateUserPayload {
  email?: string;
  password?: string;
  fullName?: string;
  roles?: UserRole[];
  isActive?: boolean;
}

export interface UpdateUserInput {
  id: string;
  payload: UpdateUserPayload;
}

interface UserFormValues {
  email: string;
  fullName: string;
  password?: string;
  roles: UserRole[];
  isActive: boolean;
}

const sameRoles = (left: string[] = [], right: string[] = []) => {
  if (left.length !== right.length) return false;

  const a = [...left].sort();
  const b = [...right].sort();
  return a.every((role, index) => role === b[index]);
};

export const buildUserPatch = (
  original: User,
  next: UserFormValues,
): UpdateUserPayload => {
  const payload: UpdateUserPayload = {};
  const email = next.email.trim();
  const fullName = next.fullName.trim();
  const password = next.password?.trim();

  if (email !== original.email) payload.email = email;
  if (fullName !== original.fullName) payload.fullName = fullName;
  if (next.isActive !== original.isActive) payload.isActive = next.isActive;
  if (!sameRoles(original.roles, next.roles)) payload.roles = next.roles;
  if (password) payload.password = password;

  return payload;
};

export const updateUserAction = async ({
  id,
  payload,
}: UpdateUserInput): Promise<User> => {
  const { data } = await gissApi.patch<User>(`/users/${id}`, payload);
  return data;
};
