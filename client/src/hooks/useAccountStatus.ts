type Status = "active" | "churned" | "risk" | "onboarding";

export function useAccountStatus() {
  function getStatus(_account: any): Status {
    return "active";
  }

  function getStatusLabel(status: Status): string {
    switch (status) {
      case "churned":
        return "Churn";
      case "risk":
        return "Risco";
      case "onboarding":
        return "Onboarding";
      default:
        return "Ativo";
    }
  }

  function getStatusColor(status: Status): string {
    switch (status) {
      case "churned":
        return "destructive";
      case "risk":
        return "warning";
      case "onboarding":
        return "secondary";
      default:
        return "default";
    }
  }

  return { getStatus, getStatusLabel, getStatusColor };
}
