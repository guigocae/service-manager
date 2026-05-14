import { create } from "zustand";
import { type AuthUser } from "../types/auth.schemas";

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;

  setAuth: (token: string, user: AuthUser) => void;
  setUser: (user: AuthUser | null) => void;
  setIsLoadingAuth: (value: boolean) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  token: localStorage.getItem("accessToken"),
  user: null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  isLoadingAuth: true,

  setAuth: (token, user) => {
    localStorage.setItem("accessToken", token);

    set({ token, user, isAuthenticated: true });
  },

  setUser: (user) => {
    set({ user, isAuthenticated: !!user })
  },

  setIsLoadingAuth: (value) => {
    set({ isLoadingAuth: value });
  },

  clearAuth: () => {
    localStorage.removeItem("accessToken");

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));