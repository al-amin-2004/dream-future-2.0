"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  BookUser,
  ChartNoAxesColumn,
  DoorOpen,
  LayoutDashboard,
  MessageSquareShare,
  Settings,
  Users,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", icon: <LayoutDashboard />, link: "/admin" },
  {
    label: "Analytics",
    icon: <ChartNoAxesColumn />,
    link: "/admin/analytics",
  },
  { label: "Users", icon: <Users />, link: "/admin/users" },
  { label: "Accounts", icon: <BookUser />, link: "/admin/accounts" },
  {
    label: "Transactions",
    icon: <ArrowLeftRight />,
    link: "/admin/transactions",
  },
  {
    label: "Requests",
    icon: <MessageSquareShare />,
    link: "/admin/requests",
  },
  { label: "Settings", icon: <Settings />, link: "/admin/settings" },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <aside className={cn()}>
        <ul className="p-2 mt-10 ml-10 bg-primary rounded-full">
          {sidebarItems.map((item, idx) => {
            const navActive = pathname === item.link;
            return (
              <Link key={idx} href={item.link} className="relative">
                <li
                  className={cn(
                    "p-3 border-2 border-transparent hover:border-green-500 rounded-full mb-4",
                    navActive && "bg-green-500"
                  )}
                >
                  {item.icon}
                </li>

                {/* {pendingRequests.length > 0 && item.label === "Requests" && (
                  <div className="absolute -right-0.5 -top-2 z-20 bg-red-600 size-5.5 text-sm flex justify-center items-center rounded-full">
                    {pendingRequests.length}
                  </div>
                )} */}
              </Link>
            );
          })}

          <Link href="/">
            <li className="p-3 border-2 border-transparent hover:border-green-500 rounded-full">
              <DoorOpen />
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
};

export default AdminSidebar;
