import React, { createContext, useContext } from "react";
type T = Record<string, unknown>;
const Ctx = createContext<T>({});
export const HealthScoreProvider = ({ children }: { children: React.ReactNode }) => (
  <Ctx.Provider value={{}}>{children}</Ctx.Provider>
);
export const useHealthScore = () => useContext(Ctx);
export default Ctx;
