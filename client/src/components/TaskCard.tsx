import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TaskCard({ task }: any) {
  if (!task) return null;

  return (
    <Card className="p-3">
      <CardContent className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{task.title}</div>
          <Badge>{task.status || "Open"}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </CardContent>
    </Card>
  );
}
