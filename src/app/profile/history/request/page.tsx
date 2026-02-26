"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageTitle from "@/app/_components/ui/PageTitle";
import { IRequest } from "@/types";
import { Button } from "@/app/_components/ui/Button";
import { useAccounts } from "@/providers/AccountContext";

/* ================= PAGE ================= */
const AdminRequestsPage = () => {
  const { activeAccount } = useAccounts();
  const [histories, setHistories] = useState<IRequest[]>([]);

  useEffect(() => {
    if (!activeAccount?._id) return;

    const fetchHistories = async () => {
      try {
        const res = await fetch("/api/requests/my", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accountId: activeAccount?._id }),
        });
        const data = await res.json();

        if (!res.ok) {
          console.error(data.message);
        }

        setHistories(data.requests);
      } catch (error) {
        console.error("Api error", error);
      }
    };
    fetchHistories();
  }, [activeAccount]);

  return (
    <div className="space-y-12">
      <PageTitle
        title="Requests Histories"
        description="All user requests Histories"
      >
        <Link href="/profile/history">
          <Button>
            <ArrowLeft /> Bact to Histories
          </Button>
        </Link>
      </PageTitle>

      {/* ================= REQUESTS TABLE ================= */}
      {histories.length === 0 ? (
        <h2 className="text-xl text-center text-primary">No Request here!</h2>
      ) : (
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm table-fixed">
            <thead className="bg-muted">
              <tr className="text-center">
                <th colSpan={2} className="p-3">
                  Request ID
                </th>
                <th>Month</th>
                <th>Amount</th>
                <th>Method</th>
                <th colSpan={2}>Transaction ID</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {histories.map((historie) => (
                <tr
                  key={historie._id?.toString()}
                  className="border-t hover:bg-muted/40 transition text-center"
                >
                  <td colSpan={2} className="p-3">
                    {historie._id?.toString()}
                  </td>

                  <td>
                    {" "}
                    {historie.month
                      ? new Date(historie.month).toLocaleDateString("en-GB", {
                          month: "long",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td>৳ {historie.amount}</td>
                  <td>{historie.method}</td>
                  <td colSpan={2}>{historie.transactionId}</td>
                  <td>
                    {new Date(historie.createdAt!).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>{historie.status.toLocaleUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRequestsPage;
