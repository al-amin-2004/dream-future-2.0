"use client";

import { useMemo, useState } from "react";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import Input from "@/app/_components/ui/Input";
import { Eye, ShieldCheck, ShieldX } from "lucide-react";
import { Status } from "@/types";
import { accStatus } from "@/constants/account";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const Accounts = () => {
  const { allAccounts } = useAllAccounts();
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");

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
  return (
    <div className="space-y-8">
      <ProfilePageTitle
        title="Accounts"
        description="Manage all user accounts from here"
      >
        <Input
          type="text"
          placeholder="Search by name or email..."
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
                  <Eye
                    className="cursor-pointer"
                    onClick={() => alert("add user details info!")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounts;
