import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ActivityCard({ activity }: any) {
  if (!activity) return null;

  return (
    <Card className="p-3">
      <CardContent className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{activity.title}</div>
          <Badge>{activity.type || "Activity"}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
      </CardContent>
    </Card>
  );
}
