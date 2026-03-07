import { FC } from "react";
import { cn } from "@/lib/utils";
import { CalendarFold } from "lucide-react";
import { paymentMethods, requestTypes } from "@/constants/request";

type TransactionTypes = (typeof requestTypes)[number];
type PaymentMethods = (typeof paymentMethods)[number];

export interface TransactionCardProps {
  transactionType: TransactionTypes;
  transactionDate: string;
  month: string;
  method: PaymentMethods;
  amount: number;
  processedBy: string;
}

const HistoryCardGrid: FC<TransactionCardProps> = ({
  transactionType,
  transactionDate,
  month,
  method,
  amount,
  processedBy,
}) => {
  return (
    <div className={cn("w-full rounded-xl p-4 max-w-100 bg-slate-300/10")}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-medium leading-6 capitalize">
          {transactionType}
        </h2>
        <div className="flex items-center gap-1.5">
          <CalendarFold size={16} />
          <p className="text-xs">{transactionDate}</p>
        </div>
      </div>

      <div className="text-sm">
        <div className="flex justify-between mb-1">
          <p>Month: {month}</p>
          <p>Amount: {amount}</p>
        </div>
        <p>Method: {method}</p>
        <p>Deposit by: {processedBy}</p>
      </div>
    </div>
  );
};

const HistoryCardList: FC<TransactionCardProps> = ({
  transactionType,
  month,
  method,
  amount,
  transactionDate,
  processedBy,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-md p-4 min-w-87.5 bg-slate-300/10 grid grid-cols-6 place-items-center text-sm",
      )}
    >
      <h2>{transactionType}</h2>
      <p>{month}</p>
      <div className="flex items-center gap-1.5">
        <CalendarFold size={16} />
        <p>{transactionDate}</p>
      </div>
      <p>{method}</p>
      <p>{amount}</p>
      <p>{processedBy}</p>
    </div>
  );
};

export { HistoryCardGrid, HistoryCardList };
