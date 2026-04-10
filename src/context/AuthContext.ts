import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type AuthUser = {
  guestid?: number;
  guest?: string;
  name?: string;
  [key: string]: unknown;
} | null;

export type AuthContextValue = {
  user: AuthUser;
  loading: boolean;
  setUser: Dispatch<SetStateAction<AuthUser>>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
