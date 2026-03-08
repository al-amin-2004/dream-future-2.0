"use client";

import { MouseEvent, useMemo, useState } from "react";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import { useAllUsers } from "@/providers/AllUsersContext";
import { accStatus } from "@/constants/account";
import { createMapById } from "@/helpers/createMapById";
import { getCurrentMonth } from "@/helpers/getCurrentMonth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { IAccount, Status } from "@/types";
import { BanknoteArrowUp, Eye, ShieldCheck, ShieldX } from "lucide-react";
import { Button } from "@/app/_components/ui/Button";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import Input from "@/app/_components/ui/Input";
import ActionBtn from "@/app/_components/ui/ActionBtn";
import DialogInfoRow from "@/app/_components/ui/DialogInfoRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Accounts = () => {
  const { allAccounts } = useAllAccounts();
  const { allUsers } = useAllUsers();
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [amount, setAmount] = useState<number>(200);
  const [month, setMonth] = useState(getCurrentMonth());
  const [loading, setLoading] = useState<boolean>(false);
  const [viewAccount, setViewAccount] = useState<IAccount | null>(null);
  const [depositAccount, setDepositAccount] = useState<IAccount | null>(null);
  const userMap = createMapById(allUsers);

  // ===== Filtering Search and selected accounts ===== //
  const filteredAccounts = useMemo(() => {
    return allAccounts.filter((account) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        account.accName.toLowerCase().includes(keyword) ||
        account.accNumber?.toLowerCase().includes(keyword);

      const matchStatus =
        statusFilter === "all" ? true : account.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [allAccounts, search, statusFilter]);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!depositAccount) {
      console.error("Form must be fillup");
      toast.error("Please, Fill your Deposit Form");
    }

    if (!amount || amount <= 0) {
      toast.error("Invalid amount");
      return;
    }

    try {
      const res = await fetch("/api/admin/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: depositAccount?._id,
          amount,
          month,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        console.error(data.message);
        toast.error(data.message || "Something went wrong!");
        return;
      }

      toast.success("Deposit successful");
    } catch (error) {
      console.error(error);
      toast.error("Something wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <ProfilePageTitle
        title="Accounts"
        description="Manage all user accounts from here"
      >
        <Input
          type="text"
          placeholder="Search by account name or number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary"
        />
      </ProfilePageTitle>

      {/* =============== FILTER =============== */}
      <Select
        value={statusFilter}
        onValueChange={(value) => setStatusFilter(value as "all" | Status)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Filter role" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {accStatus.map((status) => (
            <SelectItem key={status} value={status} className="capitalize">
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* ================= TABLE ================= */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-muted text-center">
            <tr>
              <th className="p-3">Acc Name</th>
              <th className="hidden md:table-cell">Acc Number</th>
              <th className="hidden md:table-cell">Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {filteredAccounts.map((account) => (
              <tr
                key={account._id}
                className="border-t hover:bg-muted/40 transition"
              >
                {/* Account Name */}
                <td>{account.accName}</td>

                {/* Account Number */}
                <td className="hidden md:table-cell">{account.accNumber}</td>

                {/* Account Status */}
                <td className="hidden md:table-cell">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full text-green-500 bg-green-500/10",
                      {
                        "text-red-500 bg-red-500/10":
                          account.status === "block",
                      },
                    )}
                  >
                    {account.status === "block" ? (
                      <ShieldX className="size-4" />
                    ) : (
                      <ShieldCheck className="size-4" />
                    )}
                    {account.status.toLocaleUpperCase()}
                  </span>
                </td>

                {/* Action */}
                <td title="See all info!" className="flex justify-center p-2.5">
                  <ActionBtn
                    icon={<Eye />}
                    onClick={() => setViewAccount(account)}
                  />
                  <ActionBtn
                    icon={<BanknoteArrowUp />}
                    onClick={() => setDepositAccount(account)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={!!viewAccount || !!depositAccount}
        onOpenChange={() => {
          setViewAccount(null);
          setDepositAccount(null);
        }}
      >
        <form>
          <DialogContent className="max-w-lg">
            <DialogHeader className="text-xl">
              <DialogTitle>
                {viewAccount?.accName || "Cash Deposit"}{" "}
                {viewAccount && "Account"}
              </DialogTitle>
              <div className="flex items-center justify-between">
                <DialogDescription>
                  {viewAccount
                    ? "Account financial overview"
                    : "Admin/Treaser cash deposit to user account"}
                </DialogDescription>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    (viewAccount || depositAccount)?.status === "active"
                      ? "bg-green-500/15 text-green-500"
                      : "bg-red-500/15 text-red-500",
                  )}
                >
                  {(viewAccount || depositAccount)?.status.toUpperCase()}
                </span>
              </div>
            </DialogHeader>

            {viewAccount && (
              <div className="space-y-6">
                {/* ===== STATS ===== */}
                <div className="grid grid-cols-3 gap-3">
                  <StatBox label="Balance" value={`৳ ${viewAccount.balance}`} />
                  <StatBox
                    label="Deposit"
                    value={`৳ ${viewAccount.totalDeposit}`}
                  />
                  <StatBox
                    label="Profit"
                    value={`৳ ${viewAccount.totalProfit}`}
                  />
                </div>

                {/* ===== META INFO ===== */}
                <div className="rounded-lg border p-4 space-y-2 text-sm">
                  <DialogInfoRow
                    className="flex justify-between"
                    label="Account Name"
                    value={viewAccount.accName}
                  />
                  <DialogInfoRow
                    className="flex justify-between"
                    label="Account Number"
                    value={viewAccount.accNumber}
                  />
                  <DialogInfoRow
                    className="flex justify-between"
                    label="Owner username"
                    value={`${userMap[viewAccount.userId.toString()]?.username}`}
                  />
                  <DialogInfoRow
                    className="flex justify-between"
                    label="Email"
                    value={userMap[viewAccount.userId.toString()]?.email}
                  />
                </div>
              </div>
            )}

            {depositAccount && (
              <div className="space-y-5">
                {/* ===== ACCOUNT INFO ===== */}
                <div className="rounded-lg border p-3 text-sm space-y-1">
                  <DialogInfoRow
                    label="Name"
                    value={`${userMap[depositAccount.userId.toString()]?.firstName} ${" "}
                  ${userMap[depositAccount.userId.toString()]?.lastName}`}
                  />
                  <DialogInfoRow
                    label="Account Name"
                    value={depositAccount.accName}
                  />
                  <DialogInfoRow
                    label="Account Number"
                    value={depositAccount.accNumber}
                  />
                </div>

                {/* ===== AMOUNT ===== */}
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter deposit amount"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                {/* ===== MONTH ===== */}
                <div>
                  <label className="text-sm font-medium">Month</label>
                  <Input
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={depositAccount ? "outline" : "default"}>
                  Close
                </Button>
              </DialogClose>

              {depositAccount && (
                <Button
                  type="submit"
                  disabled={loading || !amount || !month}
                  onClick={handleSubmit}
                >
                  {loading ? "Processing..." : "Confirm Deposit"}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default Accounts;

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className={cn("p-3 rounded-lg text-center border")}>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);
