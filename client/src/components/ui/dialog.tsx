import React, { ReactNode } from "react";

export interface DialogProps {
  open?: boolean;
  onOpenChange?(open: boolean): void;
  children: ReactNode;
}

export function Dialog({ open = false, children }: DialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {children}
    </div>
  );
}

export function DialogContent({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-md">
      {children}
    </div>
  );
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}
