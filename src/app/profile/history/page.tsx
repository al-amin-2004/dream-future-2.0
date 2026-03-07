"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/_components/ui/Button";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import { useAccounts } from "@/providers/AccountContext";
// import { ChartAreaInteractive } from "../_components/Graph";
import {
  HistoryCardGrid,
  TransactionCardProps,
} from "../_components/ui/HistoryCard";
import {
  ArrowDownUp,
  ArrowRight,
  Funnel,
  LayoutGrid,
  List,
} from "lucide-react";

const History = () => {
  const { activeAccount } = useAccounts();
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<TransactionCardProps[]>([]);

  useEffect(() => {
    const activeAccId = activeAccount?._id;

    if (!activeAccId) return;

    const fetchHistories = async () => {
      try {
        const res = await fetch(
          `/api/transactions/me?accountId=${activeAccId}`,
        );
        const data = await res.json();

        if (data.ok) setTransactions(data.histories);
      } catch (error) {
        console.error("Api error", error);
      }
    };

    fetchHistories();
  }, [activeAccount]);

  return (
    <div className="space-y-12">
      {/* ================= PAGE TITLE COMPONENT ================= */}
      <ProfilePageTitle
        title="History"
        description="Showing your all histories with a clear view."
      >
        <Link href="/profile/history/request">
          <Button>
            Requests <ArrowRight />
          </Button>
        </Link>
      </ProfilePageTitle>

      <div className="flex gap-8">
        <div className="flex-3 border-2 p-6 rounded-xl"></div>

        <div className="flex-2 border-2 p-6 rounded-xl">
          {/* <ChartAreaInteractive monthlyDate={deposits} /> */}
        </div>
      </div>

      <div className="border-2 py-6 pl-6 rounded-xl">
        <div className="py-3 flex justify-between items-center pe-6">
          <ProfilePageTitle
            className="border-0 text-2xl md:text-2xl"
            title="Your Transition Histories"
          />

          <div className="flex items-center gap-2.5">
            <LayoutGrid
              size={34}
              className={`cursor-pointer p-1.5 border rounded-md ${
                isGrid && "bg-gray-400/10"
              }`}
              onClick={() => setIsGrid(true)}
            />

            <List
              size={34}
              className={`cursor-pointer p-1.5 border rounded-md me-2.5 ${
                !isGrid && "bg-gray-400/10"
              }`}
              onClick={() => setIsGrid(false)}
            />
            <div className="cursor-pointer flex items-center gap-2 border px-2.5 py-1 rounded-md">
              <ArrowDownUp size={18} />
              <span className="inline">Sort</span>
            </div>
            <div className="cursor-pointer flex items-center gap-2 border px-2.5 py-1 rounded-md">
              <Funnel size={18} />
              <span className="inline">Filter</span>
            </div>
          </div>
        </div>

        <div
          className={`max-h-185 pe-6 overflow-y-scroll grid justify-items-center ${
            isGrid
              ? "grid-cols-[repeat(4,minmax(300px,1fr))] gap-6"
              : "grid-cols-1 gap-2.5"
          }`}
        >
          <div
            className={`w-full rounded-md p-4 min-w-87.5 bg-background grid grid-cols-6 place-items-center font-medium border border-emerald-600 sticky top-0 ${
              isGrid && "hidden"
            }`}
          >
            <p>Transaction Type</p>
            <p>Month</p>
            <p>Date</p>
            <p>Method</p>
            <p>Amount</p>
            <p>Transition ID / Deposit by</p>
          </div>

          {transactions.map((transaction, idx) => {
            return isGrid ? (
              <HistoryCardGrid
                key={idx}
                transactionType={transaction.transactionType}
                month={new Date(transaction.month).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
                transactionDate={new Date(
                  transaction.transactionDate,
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
                method={transaction.method}
                amount={transaction.amount}
                processedBy={transaction.processedBy.firstName}
              />
            ) : (
              // <HistoryCardList
              //   key={idx}
              //   transactionType="Deposit"
              //   month={new Date(transaction.month).toLocaleDateString("en-US", {
              //     month: "long",
              //     year: "numeric",
              //   })}
              //   depositDate={new Date(
              //     transaction.depositDate,
              //   ).toLocaleDateString("en-GB", {
              //     day: "2-digit",
              //     month: "long",
              //     year: "numeric",
              //   })}
              //   method={transaction.method}
              //   amount={transaction.amount}
              //   transactionId={transaction.transactionId}
              //   depositBy={transaction.depositBy}
              // />
              ""
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
