import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

// Páginas principais existentes em src/pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Clients from "./pages/Clients";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Playbooks from "./pages/Playbooks";
import PlaybookLibrary from "./pages/PlaybookLibrary";
import PlaybookView from "./pages/PlaybookView";
import PlaybookEditor from "./pages/PlaybookEditor";
import OnboardingSettings from "./pages/OnboardingSettings";
import HealthScoreSettings from "./pages/HealthScoreSettings";
import TagsManagement from "./pages/TagsManagement";
import StatusManagement from "./pages/StatusManagement";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import AccountDetails from "./pages/AccountDetails";
import ClientDetails from "./pages/ClientDetails";
import Activities from "./pages/Activities";
import ActivitiesDetails from "./pages/ActivitiesDetails";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// === Tipos e config usados pela tela de Subscriptions ===

type Subscription = {
  subscription_id: string;
  product_name: string;
  plan_name: string;
  mrr: number | string;
  arr: number | string;
  currency: string;
  status: "active" | "cancelled" | "expired";
  start_date: string;
  renewal_date: string;
  licenses_purchased: number;
  licenses_active: number;
  tenant_id: string;
  account_id: string;
  created_at: string;
  updated_at: string;
};

const API = import.meta.env.VITE_API_BASE_URL as string;
const TOKEN = import.meta.env.VITE_DEV_TOKEN as string;

// === Página que já está funcionando: lista de subscriptions ===

function SubscriptionsPage() {
  const [data, setData] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`${API}/subscriptions`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }
      const json = await res.json();
      setData(json);
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: 8 }}>Subscriptions</h1>
      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
        <button onClick={load} disabled={loading}>
          {loading ? "Atualizando..." : "Recarregar"}
        </button>
        <code>API={API}</code>
      </div>

      {err && (
        <div style={{ color: "crimson", marginBottom: 12 }}>
          Erro: {err}
        </div>
      )}

      {data.length === 0 ? (
        <div>Nenhum registro.</div>
      ) : (
        <table
          cellPadding={6}
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th align="left">Produto</th>
              <th align="left">Plano</th>
              <th align="right">MRR</th>
              <th align="right">ARR</th>
              <th align="left">Moeda</th>
              <th align="left">Status</th>
              <th align="left">Renova</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s) => (
              <tr
                key={s.subscription_id}
                style={{ borderTop: "1px solid #eee" }}
              >
                <td>{s.product_name}</td>
                <td>{s.plan_name}</td>
                <td align="right">{s.mrr}</td>
                <td align="right">{s.arr}</td>
                <td>{s.currency}</td>
                <td>{s.status}</td>
                <td>{s.renewal_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// === App principal com Router ===

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "system-ui, sans-serif" }}>
        {/* Navbar mínima só pra navegar e testar as páginas */}
        <nav
          style={{
            display: "flex",
            gap: 12,
            padding: "8px 16px",
            borderBottom: "1px solid #eee",
            marginBottom: 16,
          }}
        >
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/accounts">Accounts</Link>
          <Link to="/clients">Clients</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/team">Team</Link>
          <Link to="/playbooks">Playbooks</Link>
          <Link to="/subscriptions">Subscriptions</Link>
          <Link to="/settings">Settings</Link>
        </nav>

        <Routes>
          {/* redireciona raiz para o Dashboard (ajuste se preferir outra) */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Rotas principais */}
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/executive" element={<ExecutiveDashboard />} />

          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts/:id" element={<AccountDetails />} />

          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<ClientDetails />} />

          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivitiesDetails />} />

          <Route path="/tasks" element={<Tasks />} />
          <Route path="/team" element={<Team />} />

          <Route path="/playbooks" element={<Playbooks />} />
          <Route path="/playbooks/library" element={<PlaybookLibrary />} />
          <Route path="/playbooks/:id" element={<PlaybookView />} />
          <Route path="/playbooks/:id/edit" element={<PlaybookEditor />} />

          <Route path="/onboarding" element={<OnboardingSettings />} />
          <Route path="/health-scores" element={<HealthScoreSettings />} />
          <Route path="/tags" element={<TagsManagement />} />
          <Route path="/status" element={<StatusManagement />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/login" element={<Login />} />

          {/* Tela de Subscriptions que você já validou */}
          <Route path="/subscriptions" element={<SubscriptionsPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
