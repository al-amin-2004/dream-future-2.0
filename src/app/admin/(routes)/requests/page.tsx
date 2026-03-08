"use client";

import { useState } from "react";
import { ObjectId } from "mongoose";
import { cn } from "@/lib/utils";
import { createMapById } from "@/helpers/createMapById";
import { Button } from "@/app/_components/ui/Button";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import { useAllRequests } from "@/providers/AllRequestsContext";
import { useAllUsers } from "@/providers/AllUsersContext";
import { IRequest } from "@/types";
import { toast } from "sonner";
import { Check, Eye, X } from "lucide-react";
import ActionBtn from "@/app/_components/ui/ActionBtn";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
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
  const { allRequests, refreshRequests } = useAllRequests();
  const { allUsers } = useAllUsers();
  const { allAccounts } = useAllAccounts();
  const [selectedRequest, setSelectedRequest] = useState<IRequest | null>(null);
  const userMap = createMapById(allUsers);
  const accountMap = createMapById(allAccounts);

  if (!allUsers.length || !allAccounts.length || !allRequests.length) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading transactions...
      </div>
    );
  }

  /* =============== ALL PENDING STATUS FILTERING =============== */
  const pendingRequests = allRequests
    .filter((r) => r.status === "pending")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const handleApprove = async (id: string | ObjectId | undefined) => {
    if (id === undefined) return toast.error("Request id Undefiend");

    const res = await fetch(`/api/requests/action`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: id, action: "approve" }),
    });

    const data = await res.json();

    if (!data.ok) {
      toast.error(data.message || "Action failed");
    }

    if (data.ok) {
      toast.success("Request approved successfully");
      refreshRequests();
    }
  };

  const handleReject = async (id: string | ObjectId | undefined) => {
    const res = await fetch(`/api/requests/action`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: id, action: "reject" }),
    });

    const data = await res.json();

    if (!data.ok) {
      toast.error(data.message || "Action failed");
    }

    if (data.ok) {
      toast.success("Request rejected successfully");
      refreshRequests();
    }
  };

  if (pendingRequests.length === 0) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        No Request yet!
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProfilePageTitle
        title="Pending Requests"
        description="Manage all Pending Requests from here"
      />

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-muted">
            <tr className="text-center">
              <th className="p-3">Name</th>
              <th>Account Name</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Transaction ID</th>
              <th>Month</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pendingRequests.map((req) => {
              const account = accountMap[req.accountId.toString()];
              const user = userMap[account.userId.toString()];
              return (
                <tr
                  key={req._id?.toString()}
                  className="border-t text-center hover:bg-muted/40"
                >
                  <td>
                    {user.firstName} {user?.lastName}
                  </td>
                  <td>{account.accName} </td>
                  <td>৳ {req.amount}</td>

                  <td>
                    <div className="flex justify-center">
                      <p
                        className={cn(
                          "p-1 w-18 rounded-full bg-white/15",
                          {
                            "text-pink-400 bg-pink-400/15":
                              req.method === "bkash",
                          },
                          {
                            "text-orange-400 bg-orange-400/15":
                              req.method === "nagad",
                          },
                          {
                            "text-purple-500 bg-purple-400/15":
                              req.method === "rocket",
                          },
                        )}
                      >
                        {req.method?.toUpperCase()}
                      </p>
                    </div>
                  </td>

                  <td>{req.transactionId}</td>
                  <td>{req.month}</td>
                  <td className="flex justify-center gap-1.5 py-1.5">
                    <ActionBtn
                      icon={<Eye />}
                      onClick={() => setSelectedRequest(req)}
                    />

                    <ActionBtn
                      icon={<Check />}
                      success
                      onClick={() => handleApprove(req._id)}
                    />

                    <ActionBtn
                      icon={<X />}
                      danger
                      onClick={() => handleReject(req._id)}
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
        open={!!selectedRequest}
        onOpenChange={(open) => !open && setSelectedRequest(null)}
      >
        {selectedRequest && (
          <DialogContent className="min-w-2xl z-99">
            <DialogHeader>
              <DialogTitle className="text-xl">Request Details</DialogTitle>
              <DialogDescription>
                Full information about this deposit request
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-between border-b pb-2 text-sm">
              <DialogInfoRow
                label="Request ID"
                value={selectedRequest._id?.toString()}
              />
              <DialogInfoRow
                label="Request on"
                value={new Date(selectedRequest.createdAt).toLocaleString(
                  "en-BD",
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                  },
                )}
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
                        selectedRequest.accountId.toString()
                      ].userId.toString()
                    ]?.firstName
                  }
                    ${
                      userMap[
                        accountMap[
                          selectedRequest.accountId.toString()
                        ].userId.toString()
                      ]?.lastName
                    }`}
                />
                <DialogInfoRow
                  label="Username"
                  value={
                    userMap[
                      accountMap[
                        selectedRequest.accountId.toString()
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
                        selectedRequest.accountId.toString()
                      ].userId.toString()
                    ]?.email
                  }
                />
                {userMap[
                  accountMap[
                    selectedRequest.accountId.toString()
                  ].userId.toString()
                ]?.number && (
                  <DialogInfoRow
                    className="truncate"
                    label="Phone"
                    value={
                      userMap[
                        accountMap[
                          selectedRequest.accountId.toString()
                        ].userId.toString()
                      ]?.number
                    }
                  />
                )}
                <DialogInfoRow
                  label="Account"
                  value={
                    accountMap[selectedRequest.accountId.toString()]?.accName
                  }
                />
                <DialogInfoRow
                  label="Account No"
                  value={
                    accountMap[selectedRequest.accountId.toString()]?.accNumber
                  }
                />
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-2">
                <DialogInfoRow
                  label="Amount"
                  value={`৳ ${selectedRequest.amount}`}
                />
                <DialogInfoRow label="Method" value={selectedRequest.method} />
                <DialogInfoRow
                  label="Transaction ID"
                  value={selectedRequest.transactionId ?? "N/A"}
                />
                <DialogInfoRow
                  label="Month"
                  value={
                    selectedRequest.month
                      ? new Date(selectedRequest.month).toLocaleDateString(
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
                  label="Status"
                  value={
                    <span className="px-2 py-0.5 rounded text-xs bg-yellow-500/20 text-yellow-500">
                      {selectedRequest.status.toUpperCase()}
                    </span>
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setSelectedRequest(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Transactions;
