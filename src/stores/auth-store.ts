import { create } from "zustand";
import { UserType } from "@/types/user.type";

export type AuthState = {
  user?: UserType | null;
};

export type AuthActions = {
  setUser: (user: UserType) => void;
  clearUser: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: UserType) => set({ user }),
  clearUser: () => set({ user: null }),
}));
