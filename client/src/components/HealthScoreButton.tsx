import { HeartPulse } from "lucide-react";
import { useLocation } from "wouter";

export default function HealthScoreButton() {
  const [_, setLocation] = useLocation();

  return (
    <button
      onClick={() => setLocation("/health-scores")}
      className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
    >
      <HeartPulse size={16} />
      Health Score
    </button>
  );
}
