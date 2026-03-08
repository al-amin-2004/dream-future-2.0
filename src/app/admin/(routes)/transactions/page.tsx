"use client";

import { useState } from "react";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import { useAllTransactions } from "@/providers/AllTransactionsContext";
import { useAllUsers } from "@/providers/AllUsersContext";
import { ITransaction } from "@/types";
import { createMapById } from "@/helpers/createMapById";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { Button } from "@/app/_components/ui/Button";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import ActionBtn from "@/app/_components/ui/ActionBtn";
import DialogInfoRow from "@/app/_components/ui/DialogInfoRow";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Transactions = () => {
  const { allTransactions } = useAllTransactions();
  const { allUsers } = useAllUsers();
  const { allAccounts } = useAllAccounts();
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);
  const userMap = createMapById(allUsers);
  const accountMap = createMapById(allAccounts);

  return (
    <div className="space-y-8">
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
              const user = userMap[account?.userId.toString()];
              return (
                <tr
                  key={transaction._id?.toString()}
                  className="border-t text-center hover:bg-muted/40"
                >
                  <td>
                    {user?.firstName} {user?.lastName}
                  </td>
                  <td>{account?.accName} </td>
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
                    {userMap[transaction.processedBy.toString()]?.firstName}
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

      {/* ======== Dialog ======== */}
      <Dialog
        open={!!selectedTransaction}
        onOpenChange={(open) => !open && setSelectedTransaction(null)}
      >
        {selectedTransaction && (
          <DialogContent className="min-w-2xl z-99">
            <DialogHeader>
              <DialogTitle className="text-xl">Request Details</DialogTitle>
              <DialogDescription>
                Full information about this deposit request
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-between border-b pb-2 text-sm">
              <DialogInfoRow
                label="Transaction ID"
                value={selectedTransaction._id?.toString()}
              />
              <DialogInfoRow
                label="Transaction on"
                value={new Date(
                  selectedTransaction.transactionDate,
                ).toLocaleString("en-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
              {/* LEFT COLUMN */}
              <div className="space-y-2">
                <DialogInfoRow
                  label="Name"
                  value={`${
                    userMap[
                      accountMap[
                        selectedTransaction.accountId.toString()
                      ].userId.toString()
                    ]?.firstName
                  }
                    ${
                      userMap[
                        accountMap[
                          selectedTransaction.accountId.toString()
                        ].userId.toString()
                      ]?.lastName
                    }`}
                />
                <DialogInfoRow
                  label="Username"
                  value={
                    userMap[
                      accountMap[
                        selectedTransaction.accountId.toString()
                      ].userId.toString()
                    ]?.username
                  }
                />
                <DialogInfoRow
                  className="truncate"
                  label="Email"
                  value={
                    userMap[
                      accountMap[
                        selectedTransaction.accountId.toString()
                      ].userId.toString()
                    ]?.email
                  }
                />
                {userMap[
                  accountMap[
                    selectedTransaction.accountId.toString()
                  ].userId.toString()
                ]?.number && (
                  <DialogInfoRow
                    className="truncate"
                    label="Phone"
                    value={
                      userMap[
                        accountMap[
                          selectedTransaction.accountId.toString()
                        ].userId.toString()
                      ]?.number
                    }
                  />
                )}
                <DialogInfoRow
                  label="Account"
                  value={
                    accountMap[selectedTransaction.accountId.toString()]
                      ?.accName
                  }
                />
                <DialogInfoRow
                  label="Account No"
                  value={
                    accountMap[selectedTransaction.accountId.toString()]
                      ?.accNumber
                  }
                />
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-2">
                <DialogInfoRow
                  label="Amount"
                  value={`৳ ${selectedTransaction.amount}`}
                />
                <DialogInfoRow
                  label="Method"
                  value={selectedTransaction.method}
                />
                <DialogInfoRow
                  label="Transaction ID"
                  value={selectedTransaction.transactionId ?? "N/A"}
                />
                <DialogInfoRow
                  label="Month"
                  value={
                    selectedTransaction.month
                      ? new Date(selectedTransaction.month).toLocaleDateString(
                          "en-BD",
                          {
                            month: "long",
                            year: "numeric",
                          },
                        )
                      : "N/A"
                  }
                />
                <DialogInfoRow
                  label="Request on"
                  value={
                    selectedTransaction.requestDate
                      ? new Date(
                          selectedTransaction.requestDate,
                        ).toLocaleString("en-BD", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"
                  }
                />
                <DialogInfoRow
                  label="Processed By"
                  value={`
                    ${userMap[selectedTransaction.processedBy.toString()].firstName}
                    (${userMap[selectedTransaction.processedBy.toString()].role})
                  `}
                />
              </div>
            </div>

            {selectedTransaction.profitSource && (
              <DialogInfoRow
                label="Profit Source"
                value={selectedTransaction.profitSource}
              />
            )}

            <DialogFooter>
              <Button onClick={() => setSelectedTransaction(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Transactions;
