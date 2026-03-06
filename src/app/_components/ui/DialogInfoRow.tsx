import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface DialogInfoRowProps {
  label: string;
  value: ReactNode;
  className?: string;
}

const DialogInfoRow: FC<DialogInfoRowProps> = ({ label, value, className }) => {
  return (
    <div className={cn("flex gap-3", className)}>
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
};

export default DialogInfoRow;
