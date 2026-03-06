import { cn } from "@/lib/utils";
import { FC } from "react";

interface ActionBtnProps {
  icon: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  success?: boolean;
}

const ActionBtn: FC<ActionBtnProps> = ({ icon, onClick, danger, success }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-md hover:bg-muted transition cursor-pointer",
        danger && "text-red-500 hover:bg-red-500/10",
        success && "text-green-500 hover:bg-green-500/10"
      )}
    >
      {icon}
    </button>
  );
};

export default ActionBtn;
