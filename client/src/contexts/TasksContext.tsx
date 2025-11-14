import React, { createContext, useContext, useState } from "react";

export type TaskStatus = "todo" | "in_progress" | "done" | "blocked";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;        // ISO string
  accountId?: string;
  clientId?: string;
  ownerName?: string;
};

type TasksContextValue = {
  tasks: Task[];
  addTask: (input: Omit<Task, "id">) => void;
  updateTask: (id: string, changes: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByAccount: (accountId: string) => Task[];
  getTasksByClient: (clientId: string) => Task[];
};

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      title: "Revisar QBR North Sea Capital",
      description: "Preparar deck com upsell de 160% de MRR.",
      status: "in_progress",
      priority: "high",
      dueDate: new Date().toISOString(),
      accountId: "acc-1",
      clientId: "cli-1",
      ownerName: "CS Owner",
    },
    {
      id: "task-2",
      title: "Follow-up pós-onboarding",
      status: "todo",
      priority: "medium",
      accountId: "acc-1",
      clientId: "cli-1",
      ownerName: "CS Owner",
    },
  ]);

  const addTask: TasksContextValue["addTask"] = (input) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

    setTasks((prev) => [...prev, { ...input, id }]);
  };

  const updateTask: TasksContextValue["updateTask"] = (id, changes) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  };

  const deleteTask: TasksContextValue["deleteTask"] = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const getTasksByAccount: TasksContextValue["getTasksByAccount"] = (accountId) =>
    tasks.filter((t) => t.accountId === accountId);

  const getTasksByClient: TasksContextValue["getTasksByClient"] = (clientId) =>
    tasks.filter((t) => t.clientId === clientId);

  const value: TasksContextValue = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTasksByAccount,
    getTasksByClient,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}

/**
 * Hook no nome que as páginas do Manus esperam
 */
export function useTasksContext() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error("useTasksContext must be used within TasksProvider");
  }
  return ctx;
}
