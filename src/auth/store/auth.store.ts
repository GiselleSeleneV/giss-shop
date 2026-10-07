import { create } from "zustand";
import type { User } from "@/interfaces/user.interface";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/checkAuth.action";

type AuthStatus = "authenticated" | "unauthenticated" | "checking";

type AuthStore = {
  //properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  //getters
  isAdmin: () => boolean;

  //actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  //implementacion del store
  user: null,
  token: null,
  authStatus: "checking",

  //getters
  isAdmin: () => {
    const roles = get().user?.roles ?? [];
    return roles.includes("admin");
  },

  //actions
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email.trim(), password);
      localStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, authStatus: "authenticated" });

      return true;
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "unauthenticated" });

      return false;
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "unauthenticated" });
    return true;
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({ user, token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      set({
        user: undefined,
        token: undefined,
        authStatus: "unauthenticated",
      });
      return false;
    }
  },
}));
