"use client";

import ActionBtn from "@/app/_components/ui/ActionBtn";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import { cn } from "@/lib/utils";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import { useAllTransactions } from "@/providers/AllTransactionsContext";
import { useAllUsers } from "@/providers/AllUsersContext";
import { ITransaction } from "@/types";
import { Eye } from "lucide-react";
import { useState } from "react";

const Transactions = () => {
  const { allTransactions } = useAllTransactions();
  const { allUsers } = useAllUsers();
  const { allAccounts } = useAllAccounts();
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);

  const userMap = Object.fromEntries(
    allUsers.map((u) => [u._id?.toString(), u]),
  );

  const accountMap = Object.fromEntries(
    allAccounts.map((a) => [a._id?.toString(), a]),
  );

  return (
    <div className="space-y-10">
      <ProfilePageTitle
        title="Transactions"
        description="Manage all transactions accounts from here"
      />

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-muted">
            <tr className="text-center">
              <th className="p-3">Name</th>
              <th>Account Name</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Processed By</th>
              <th>Transaction Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allTransactions.map((transaction) => {
              const account = accountMap[transaction.accountId.toString()];
              const user = userMap[account.userId.toString()];
              return (
                <tr
                  key={transaction._id?.toString()}
                  className="border-t text-center hover:bg-muted/40"
                >
                  <td>
                    {user.firstName} {user?.lastName}
                  </td>
                  <td>{account.accName} </td>
                  <td>৳ {transaction.amount}</td>

                  <td>
                    <div className="flex justify-center">
                      <p
                        className={cn(
                          "p-1 w-18 rounded-full bg-white/15",
                          {
                            "text-pink-400 bg-pink-400/15":
                              transaction.method === "bkash",
                          },
                          {
                            "text-orange-400 bg-orange-400/15":
                              transaction.method === "nagad",
                          },
                          {
                            "text-purple-500 bg-purple-400/15":
                              transaction.method === "rocket",
                          },
                        )}
                      >
                        {transaction.method?.toUpperCase()}
                      </p>
                    </div>
                  </td>

                  <td>
                    {userMap[transaction.processedBy.toString()].firstName}
                  </td>
                  <td className="capitalize">{transaction.transactionType}</td>
                  <td className="flex justify-center gap-1.5 py-1.5">
                    <ActionBtn
                      icon={<Eye />}
                      onClick={() => setSelectedTransaction(transaction)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
