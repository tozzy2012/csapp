import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard (stub)</CardTitle>
          <CardDescription>
            Interface temporária até integrarmos o layout completo do Manus.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            KPIs, gráficos e widgets serão implementados aqui.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
