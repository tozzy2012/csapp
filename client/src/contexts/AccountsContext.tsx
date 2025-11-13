import React, { createContext, useContext } from "react";
const AccountsContext = createContext({ accounts: [] });
export const AccountsProvider = ({ children }: { children: React.ReactNode }) => (
  <AccountsContext.Provider value={{ accounts: [] }}>{children}</AccountsContext.Provider>
);
export const useAccounts = () => useContext(AccountsContext);
