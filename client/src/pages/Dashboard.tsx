import { FC } from "react";
import { Users, Activity, TrendingUp, AlertTriangle } from "lucide-react";

const Dashboard: FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="border rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Accounts</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">0</div>
          <span className="text-xs text-muted-foreground">Contas ativas no momento</span>
        </div>

        <div className="border rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Health Score médio</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold">0</div>
          <span className="text-xs text-muted-foreground">Em breve puxando do backend</span>
        </div>

        <div className="border rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">MRR Total</span>
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold">R$ 0,00</div>
          <span className="text-xs text-muted-foreground">Baseado nas subscriptions</span>
        </div>

        <div className="border rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Accounts em risco</span>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-2xl font-bold">0</div>
          <span className="text-xs text-muted-foreground">Detectadas pelas regras de risco</span>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Próximos passos</h2>
        <p className="text-sm text-muted-foreground">
          Em breve: cards conectados ao backend, pipeline de contas, tarefas recentes,
          e visão executiva completa – mas por enquanto, este dashboard já compila e
          permite navegar pelo resto da aplicação.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
