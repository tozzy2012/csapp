export type OnboardingStage =
  | "not_started"
  | "invited"
  | "kicked_off"
  | "live"
  | "adoption"
  | "expansion";

interface OnboardingInfo {
  stage: OnboardingStage;
  progress: number; // 0–100
}

export function useOnboarding() {
  function getOnboardingInfo(_account: any): OnboardingInfo {
    // TODO: lógica real baseada na account
    return {
      stage: "live",
      progress: 70,
    };
  }

  function getStageLabel(stage: OnboardingStage): string {
    switch (stage) {
      case "not_started":
        return "Não iniciado";
      case "invited":
        return "Convite enviado";
      case "kicked_off":
        return "Kickoff feito";
      case "live":
        return "Live";
      case "adoption":
        return "Adoção";
      case "expansion":
        return "Expansão";
      default:
        return "Desconhecido";
    }
  }

  return { getOnboardingInfo, getStageLabel };
}
