import * as React from "react";

interface EditClientDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  clientId?: string;
}

const EditClientDialog: React.FC<EditClientDialogProps> = ({ children }) => {
  // TODO: implementar dialog real
  return <>{children}</>;
};

export default EditClientDialog;
