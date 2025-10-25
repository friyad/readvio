import { create } from "zustand";
import { User } from "better-auth";

export type AuthState = {
  user: User | null;
};

export type AuthActions = {
  setUser: (user: User) => void;
  clearUser: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  user: {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://github.com/shadcn.png",
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));
