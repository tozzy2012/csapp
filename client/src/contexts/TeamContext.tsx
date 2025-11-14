import React, { createContext, useContext, useState } from "react";

export type TeamRole =
  | "ADMIN"
  | "CS_LEAD"
  | "CS_MANAGER"
  | "CS_ANALYST"
  | "CS_REP";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  title?: string;
  avatarColor?: string;
  isAdmin?: boolean;
};

type TeamContextValue = {
  members: TeamMember[];
  addMember: (member: Omit<TeamMember, "id">) => void;
  updateMember: (id: string, changes: Partial<TeamMember>) => void;
  deleteMember: (id: string) => void;
};

const TeamContext = createContext<TeamContextValue | null>(null);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "m-1",
      name: "Lisa Mara",
      email: "lisa.mara@example.com",
      role: "CS_MANAGER",
      title: "CS Manager",
      avatarColor: "#2563eb",
      isAdmin: true,
    },
    {
      id: "m-2",
      name: "Ricardo Lange",
      email: "ricardo@example.com",
      role: "CS_LEAD",
      title: "CS Lead",
      avatarColor: "#16a34a",
      isAdmin: true,
    },
  ]);

  const addMember: TeamContextValue["addMember"] = (member) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

    setMembers((prev) => [...prev, { ...member, id }]);
  };

  const updateMember: TeamContextValue["updateMember"] = (id, changes) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...changes } : m))
    );
  };

  const deleteMember: TeamContextValue["deleteMember"] = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const value: TeamContextValue = {
    members,
    addMember,
    updateMember,
    deleteMember,
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
}

/**
 * Hook com o nome que as páginas do protótipo esperam
 */
export function useTeamContext() {
  const ctx = useContext(TeamContext);
  if (!ctx) {
    throw new Error("useTeamContext must be used within TeamProvider");
  }
  return ctx;
}
