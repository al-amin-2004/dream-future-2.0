"use client";

import ActionBtn from "@/app/_components/ui/ActionBtn";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import { useAllRequests } from "@/providers/AllRequestsContext";
import { useAllUsers } from "@/providers/AllUsersContext";
import { Check, X } from "lucide-react";
import { ObjectId } from "mongoose";
import { toast } from "sonner";

const Transactions = () => {
  const { allRequests, refreshRequests } = useAllRequests();
  const { allUsers } = useAllUsers();
  const { allAccounts } = useAllAccounts();

  if (!allUsers.length || !allAccounts.length || !allRequests.length) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading transactions...
      </div>
    );
  }

  const userMap = Object.fromEntries(
    allUsers.map((u) => [u._id?.toString(), u]),
  );

  const accountMap = Object.fromEntries(
    allAccounts.map((a) => [a._id?.toString(), a]),
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

  const handleReject = async (id: string | ObjectId, rejectReason: string) => {
    const res = await fetch(`/api/requests/action`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: id, action: "reject", rejectReason }),
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

  return (
    <div>
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
            {allRequests.map((req) => {
              const account = accountMap[req.accountId.toString()];
              const user = userMap[account.userId.toString()];
              return (
                <tr
                  key={req._id?.toString()}
                  className="border-t text-center hover:bg-muted/40"
                >
                  <td className="p-3">
                    {user.firstName} {user?.lastName}
                  </td>
                  <td>{account.accName} </td>
                  <td>৳ {req.amount}</td>
                  <td>{req.method?.toUpperCase()}</td>
                  <td>{req.transactionId}</td>
                  <td>{req.month}</td>
                  <td className="flex justify-center gap-2 py-2">
                    <ActionBtn
                      icon={<Check />}
                      success
                      onClick={() => handleApprove(req._id)}
                    />

                    <ActionBtn
                      icon={<X />}
                      danger
                      onClick={() => {
                        alert("back here!");
                      }}
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
