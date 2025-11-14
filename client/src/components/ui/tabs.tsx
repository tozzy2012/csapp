import * as React from "react";
import { cn } from "@/lib/utils";

type TabsContextType = {
  value: string;
  setValue?: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextType | null>(null);

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");

  const currentValue = value ?? internalValue;

  function handleChange(v: string) {
    setInternalValue(v);
    onValueChange?.(v);
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue: handleChange }}>
      <div className={cn("space-y-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn("inline-flex items-center justify-start rounded-lg bg-muted p-1", className)}
    {...props}
  />
);

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  const ctx = React.useContext(TabsContext);
  const isActive = ctx?.value === value;

  const handleClick = () => {
    ctx?.setValue?.(value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "px-3 py-1.5 text-sm rounded-md transition-all",
        isActive
          ? "bg-background shadow-sm text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx || ctx.value !== value) return null;

  return (
    <div className={cn("mt-2", className)} {...props}>
      {children}
    </div>
  );
};
