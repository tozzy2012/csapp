import React from "react";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: 16, border: "1px solid #eee" }}>
    <header style={{ marginBottom: 16 }}>DashboardLayout (stub)</header>
    {children}
  </div>;
}
