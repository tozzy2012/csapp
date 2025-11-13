import React, { createContext, useContext } from "react";
type T = { user?: unknown; isAuthenticated?: boolean };
const Ctx = createContext<T>({ isAuthenticated: false });
export const AuthProvider = ({ children }: { children: React.ReactNode }) => (
  <Ctx.Provider value={{ isAuthenticated: false }}>{children}</Ctx.Provider>
);
export const useAuth = () => useContext(Ctx);
export default Ctx;
