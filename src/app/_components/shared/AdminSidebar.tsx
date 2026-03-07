"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/providers/SidebarContext";
import { useAllRequests } from "@/providers/AllRequestsContext";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Exit, LeaderBoard, LeftArrowIcon } from "@/icons";
import {
  ArrowLeftRight,
  CalendarDays,
  ClockArrowUp,
  Flag,
  Info,
  LayoutDashboard,
  Megaphone,
  Settings,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", icon: <LayoutDashboard />, link: "/admin" },
  { label: "Members", icon: <Users />, link: "/admin/members" },
  { label: "Accounts", icon: <Wallet />, link: "/admin/accounts" },
  {
    label: "Transactions",
    icon: <ArrowLeftRight />,
    link: "/admin/transactions",
  },
  {
    label: "Pending Requests",
    icon: <ClockArrowUp />,
    link: "/admin/requests",
  },
  { label: "Announcements", icon: <Megaphone />, link: "/admin/announcements" },
  { label: "Leaderboard", icon: <LeaderBoard />, link: "/admin/leaderboard" },
  { label: "Events", icon: <CalendarDays />, link: "/admin/events" },
  { label: "Reports", icon: <Flag />, link: "/admin/reports" },
];
const sidebarItems2 = [
  { label: "Settings", icon: <Settings />, link: "/admin/settings" },
  {
    label: "Role Management",
    icon: <UserCog />,
    link: "/admin/rolemanagement",
  },
  { label: "Support", icon: <Info />, link: "/admin/support" },
];

const AdminSidebar: FC = () => {
  const pathname = usePathname();
  const { allRequests } = useAllRequests();
  const { open } = useSidebar();
  const [navOpen, setNavOpen] = useState<boolean>(false);

  const pendingRequests = allRequests.filter((r) => r.status === "pending");
  return (
    <>
      <aside
        className={cn(
          "fixed md:static bg-background h-screen z-60 md:p-2 border-r border-zinc-700 transition-all duration-400 ease-in-out",
          navOpen ? "w-[calc(100%-30px)]" : "w-0",
          open ? "md:w-84" : "md:w-25",
        )}
      >
        <LeftArrowIcon
          className={cn(
            "md:hidden size-10 cursor-pointer mt-3.5 mr-6 ml-auto z-60 transition",
            navOpen ? "rotate-0" : "rotate-180 -mr-12",
          )}
          onClick={() => setNavOpen(!navOpen)}
        />

        <div className="overflow-hidden h-full flex flex-col justify-between p-3">
          <ul className="space-y-1.5 p-3">
            {sidebarItems.map((item, idx) => {
              const navActive = pathname === item.link;
              return (
                <li key={idx} onClick={() => setNavOpen(false)}>
                  <Link
                    href={item.link}
                    className={cn(
                      "relative flex items-center gap-2 rounded text-nowrap cursor-pointer",
                      { "hover:bg-slate-400/20": open && !navActive },
                      { "bg-primary": open && navActive },
                    )}
                  >
                    <div
                      className={cn(
                        "p-2.5 rounded-full",
                        { "hover:bg-slate-400/20": !open && !navActive },
                        { "bg-primary": !open && navActive },
                      )}
                    >
                      {item.icon}
                    </div>
                    <p>{open && item.label}</p>

                    {pendingRequests.length > 0 &&
                      item.label === "Pending Requests" && (
                        <div
                          className={cn(
                            " bg-red-600 size-5.5 text-sm flex justify-center items-center rounded-full z-20",
                            { "absolute -right-4 -top-2": !open },
                          )}
                        >
                          {pendingRequests.length}
                        </div>
                      )}
                  </Link>
                </li>
              );
            })}

            <DropdownMenuSeparator />

            {sidebarItems2.map((item, idx) => {
              const navActive = pathname === item.link;
              return (
                <li key={idx} onClick={() => setNavOpen(false)}>
                  <Link
                    href={item.link}
                    className={cn(
                      "flex items-center gap-2 rounded text-nowrap cursor-pointer",
                      { "hover:bg-slate-400/20": open && !navActive },
                      { "bg-primary": open && navActive },
                    )}
                  >
                    <div
                      className={cn(
                        "p-2.5 rounded-full",
                        { "hover:bg-slate-400/20": !open && !navActive },
                        { "bg-primary": !open && navActive },
                      )}
                    >
                      {item.icon}
                    </div>
                    <p>{open && item.label}</p>
                  </Link>
                </li>
              );
            })}

            <DropdownMenuSeparator />

            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 rounded-lg border-0 border-red-500 text-red-500 mt-2",
                {
                  "hover:bg-red-300/30 border": open,
                },
              )}
            >
              <div
                className={cn("p-2.5 rounded-full", {
                  "hover:bg-slate-300/30": !open,
                })}
              >
                <Exit className="fill-red-500" />
              </div>
              <p>{open && "Exit"}</p>
            </Link>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
