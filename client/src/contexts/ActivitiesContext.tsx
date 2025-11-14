import React, { createContext, useContext, useState } from "react";

export type ActivityType = "call" | "email" | "meeting" | "task" | "note";

export type ActivityStatus = "planned" | "done" | "canceled";

export type Activity = {
  id: string;
  title: string;
  description?: string;
  type: ActivityType;
  status: ActivityStatus;
  date: string; // ISO string, ex: "2025-01-01"
  accountId?: string;
  clientId?: string;
  ownerName?: string;
};

type ActivitiesContextValue = {
  activities: Activity[];
  addActivity: (input: Omit<Activity, "id">) => void;
  updateActivity: (id: string, changes: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  getActivitiesByAccount: (accountId: string) => Activity[];
  getActivitiesByClient: (clientId: string) => Activity[];
};

const ActivitiesContext = createContext<ActivitiesContextValue | null>(null);

export function ActivitiesProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "act-1",
      title: "Kickoff com North Sea Capital",
      description: "Alinhar objetivos do quarter e principais KPIs.",
      type: "meeting",
      status: "done",
      date: new Date().toISOString(),
      accountId: "acc-1",
      clientId: "cli-1",
      ownerName: "CS Owner",
    },
    {
      id: "act-2",
      title: "Follow-up de onboarding",
      description: "Revisar pendências da fase de adoção inicial.",
      type: "call",
      status: "planned",
      date: new Date().toISOString(),
      accountId: "acc-1",
      clientId: "cli-1",
      ownerName: "CS Owner",
    },
  ]);

  const addActivity: ActivitiesContextValue["addActivity"] = (input) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

    setActivities((prev) => [...prev, { ...input, id }]);
  };

  const updateActivity: ActivitiesContextValue["updateActivity"] = (
    id,
    changes,
  ) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...changes } : a)),
    );
  };

  const deleteActivity: ActivitiesContextValue["deleteActivity"] = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  const getActivitiesByAccount: ActivitiesContextValue["getActivitiesByAccount"] =
    (accountId) => activities.filter((a) => a.accountId === accountId);

  const getActivitiesByClient: ActivitiesContextValue["getActivitiesByClient"] =
    (clientId) => activities.filter((a) => a.clientId === clientId);

  const value: ActivitiesContextValue = {
    activities,
    addActivity,
    updateActivity,
    deleteActivity,
    getActivitiesByAccount,
    getActivitiesByClient,
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
}

/**
 * Hook que as páginas do protótipo usam
 * (é exatamente o nome que o Manus colocou: useActivitiesContext)
 */
export function useActivitiesContext() {
  const ctx = useContext(ActivitiesContext);
  if (!ctx) {
    throw new Error("useActivitiesContext must be used within ActivitiesProvider");
  }
  return ctx;
}
