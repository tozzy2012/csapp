import * as React from "react";

interface AddClientDialogProps {
  onClientAdded?: () => void;
}

const AddClientDialog: React.FC<AddClientDialogProps> = ({ children }) => {
  // TODO: implementar dialog real
  return <>{children}</>;
};

export default AddClientDialog;
