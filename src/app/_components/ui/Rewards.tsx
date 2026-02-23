import { FC } from "react";
import { DiamondIcon } from "@/icons";

const Rewards: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="px-3.5 py-1.5 rounded-full bg-slate-400/15 flex items-center gap-1 md:gap-2">
      <DiamondIcon className="size-5" />
      {children}
    </div>
  );
};

export default Rewards;
