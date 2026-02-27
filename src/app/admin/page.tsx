"use client";

// import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../_components/ui/Button";

export default function AdminDashboardBody() {
  return (
    <div className="p-6 space-y-6">

      {/* ===== Top Summary Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Members"
          value="1,248"
          growth="+12%"
        />
        <DashboardCard
          title="Total Accounts"
          value="35"
          growth="+3"
        />
        <DashboardCard
          title="Total Balance"
          value="৳ 2,45,600"
          growth="+18%"
        />
        <DashboardCard
          title="Today's Collection"
          value="৳ 12,500"
          growth="+8%"
        />
      </div>

      {/* ===== Charts + Recent Members ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Chart Placeholder */}
        <div id="card" className="xl:col-span-2 bg-zinc-900 border border-zinc-800">
          <div id="CardContent" className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              Members Growth
            </h2>
            <div className="h-60 flex items-center justify-center text-zinc-500">
              Chart Area (Recharts / Chart.js এখানে বসবে)
            </div>
          </div>
        </div>

        {/* Recent Members */}
        <div id="card" className="bg-zinc-900 border border-zinc-800">
          <div id="CardContent" className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">
              Recent Members
            </h2>

            <MemberItem name="Rakib Hasan" status="Active" />
            <MemberItem name="Nusrat Jahan" status="Active" />
            <MemberItem name="Mehedi Alam" status="Pending" />
            <MemberItem name="Farhana Akter" status="Blocked" />

            <Button className="w-full mt-3">
              View All Members
            </Button>
          </div>
        </div>
      </div>

      {/* ===== Recent Transactions ===== */}
      <div id="card" className="bg-zinc-900 border border-zinc-800">
        <div id="CardContent" className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Recent Transactions
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="py-3">User</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <TransactionRow
                  name="Rakib Hasan"
                  type="Deposit"
                  amount="+৳ 1,200"
                  status="Success"
                />
                <TransactionRow
                  name="Sumaya Rahman"
                  type="Withdraw"
                  amount="-৳ 500"
                  status="Pending"
                />
                <TransactionRow
                  name="Admin Fee"
                  type="Income"
                  amount="+৳ 2,000"
                  status="Success"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

function DashboardCard({
  title,
  value,
  growth,
}: {
  title: string;
  value: string;
  growth: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-sm">
      <p className="text-sm text-zinc-400">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
      <span className="text-sm text-green-500 mt-1 block">
        {growth}
      </span>
    </div>
  );
}


function MemberItem({
  name,
  status,
}: {
  name: string;
  status: string;
}) {
  const statusColor =
    status === "Active"
      ? "text-green-500"
      : status === "Pending"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="flex justify-between items-center text-sm">
      <span>{name}</span>
      <span className={statusColor}>{status}</span>
    </div>
  );
}


function TransactionRow({
  name,
  type,
  amount,
  status,
}: {
  name: string;
  type: string;
  amount: string;
  status: string;
}) {
  return (
    <tr className="text-zinc-300">
      <td className="py-3">{name}</td>
      <td>{type}</td>
      <td>{amount}</td>
      <td>Apr 24, 2025</td>
      <td>
        <span
          className={
            status === "Success"
              ? "text-green-500"
              : "text-yellow-500"
          }
        >
          {status}
        </span>
      </td>
    </tr>
  );
}