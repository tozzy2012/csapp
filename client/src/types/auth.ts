export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}
export type User = { id?: string; name?: string; role?: UserRole };
export type AuthState = { isAuthenticated: boolean; user?: User | null };
