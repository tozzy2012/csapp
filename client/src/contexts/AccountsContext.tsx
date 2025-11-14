import React, { createContext, useContext, useState } from "react";

export type Account = {
  id: string;
  name: string;
  ownerId?: string;
};

type AccountsContextValue = {
  accounts: Account[];
  addAccount: (data: Omit<Account, "id">) => void;
  updateAccount: (id: string, data: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
};

const AccountsContext = createContext<AccountsContextValue | null>(null);

export function AccountsProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const addAccount = (data: Omit<Account, "id">) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

    setAccounts((prev) => [...prev, { ...data, id }]);
  };

  const updateAccount = (id: string, data: Partial<Account>) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, ...data } : acc))
    );
  };

  const deleteAccount = (id: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
  };

  return (
    <AccountsContext.Provider
      value={{ accounts, addAccount, updateAccount, deleteAccount }}
    >
      {children}
    </AccountsContext.Provider>
  );
}

export function useAccountsContext() {
  const ctx = useContext(AccountsContext);
  if (!ctx) {
    throw new Error(
      "useAccountsContext must be used within AccountsProvider"
    );
  }
  return ctx;
}
