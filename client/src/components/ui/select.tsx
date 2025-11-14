import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  className,
  children,
  placeholder,
  ...props
}) => (
  <select
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {children}
  </select>
);

export const SelectTrigger: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div className={cn("w-full", className)} {...props} />
);

export const SelectContent: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div className={cn("w-full", className)} {...props} />
);

export const SelectItem: React.FC<
  React.LiHTMLAttributes<HTMLLIElement> & { value: string }
> = ({ className, ...props }) => (
  <li className={cn(className)} {...props} />
);

export const SelectValue: React.FC<{ placeholder?: string }> = ({
  placeholder,
}) => <span>{placeholder}</span>;
