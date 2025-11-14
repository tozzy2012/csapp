import React, { createContext, useContext, useState } from "react";

type Client = {
  id: string;
  name: string;
};

type ClientsContextValue = {
  clients: Client[];
  addClient: (client: Omit<Client, "id">) => void;
};

const ClientsContext = createContext<ClientsContextValue | null>(null);

export function ClientsProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);

  const addClient = (client: Omit<Client, "id">) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    setClients((prev) => [...prev, { ...client, id }]);
  };

  const value: ClientsContextValue = { clients, addClient };

  return (
    <ClientsContext.Provider value={value}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClientsContext() {
  const ctx = useContext(ClientsContext);
  if (!ctx) {
    throw new Error("useClientsContext must be used within ClientsProvider");
  }
  return ctx;
}
