import { FC } from "react";
import { cn } from "@/lib/utils";
import { CalendarFold } from "lucide-react";

type transactionTypes = "Deposit" | "Withdraw" | "Loan";
type methods = "Cash" | "Bkash" | "Nagad" | "Rocket";

export interface HistoryCardProps {
  transactionType: transactionTypes;
  month: string;
  method: methods;
  amount: number;
  depositDate: string;
  transactionId?: string;
  depositBy?: string;
}

const HistoryCardGrid: FC<HistoryCardProps> = ({
  transactionType,
  month,
  method,
  amount,
  transactionId,
  depositDate,
  depositBy,
}) => {
  return (
    <div className={cn("w-full rounded-xl p-4 max-w-100 bg-slate-300/10")}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-medium leading-6">{transactionType}</h2>
        <div className="flex items-center gap-1.5">
          <CalendarFold size={16} />
          <p className="text-xs">{depositDate}</p>
        </div>
      </div>

      <div className="text-sm">
        <div className="flex justify-between mb-1">
          <p>Month: {month}</p>
          <p>Amount: {amount}</p>
        </div>

        <p>Method: {method}</p>

        {method === "Cash" ? (
          <p>Deposit by: {depositBy}</p>
        ) : (
          <p>Transition ID: {transactionId}</p>
        )}
      </div>
    </div>
  );
};

const HistoryCardList: FC<HistoryCardProps> = ({
  transactionType,
  month,
  method,
  amount,
  transactionId,
  depositDate,
  depositBy,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-md p-4 min-w-87.5 bg-slate-300/10 grid grid-cols-6 place-items-center text-sm"
      )}
    >
      <h2>{transactionType}</h2>
      <p>{month}</p>
      <div className="flex items-center gap-1.5">
        <CalendarFold size={16} />
        <p>{depositDate}</p>
      </div>
      <p>{method}</p>
      <p>{amount}</p>
      <p>{method === "Cash" ? depositBy : transactionId}</p>
    </div>
  );
};

export { HistoryCardGrid, HistoryCardList };
