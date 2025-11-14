import * as React from "react";

type ImportAccountsDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onImported?: () => void;
};

const ImportAccountsDialog: React.FC<
  React.PropsWithChildren<ImportAccountsDialogProps>
> = ({ children }) => {
  // TODO: implementar importação real de contas (CSV, etc.)
  return <>{children}</>;
};

export default ImportAccountsDialog;
