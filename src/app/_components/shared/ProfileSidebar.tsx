"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/providers/SidebarContext";
import {
  DoorOpen,
  History,
  Info,
  Settings,
  User,
  UserRoundPen,
} from "lucide-react";
import { LeftArrowIcon } from "@/icons";

const sidebarItems = [
  { label: "Profile", icon: <User />, link: "/profile" },
  { label: "History", icon: <History />, link: "/profile/history" },
  { label: "Info", icon: <Info />, link: "/profile/info" },
  { label: "Update Profle", icon: <UserRoundPen />, link: "/profile/update" },
  { label: "Settings", icon: <Settings />, link: "/profile/settings" },
];

const Sidebar: FC = () => {
  const pathname = usePathname();
  const { open } = useSidebar();
  const [navOpen, setNavOpen] = useState<boolean>(false);
  return (
    <>
      <aside
        className={cn(
          "fixed md:static bg-background h-screen z-60 md:p-2 border-r border-zinc-700 transition-all duration-400 ease-in-out",
          navOpen ? "w-[calc(100%-30px)]" : "w-0",
          open ? "md:w-84" : "md:w-25"
        )}
      >
        <LeftArrowIcon
          className={cn(
            "md:hidden size-10 cursor-pointer mt-3.5 mr-6 ml-auto z-60 transition",
            navOpen ? "rotate-0" : "rotate-180 -mr-12"
          )}
          onClick={() => setNavOpen(!navOpen)}
        />

        <div className="overflow-hidden">
          <ul className="space-y-2 p-4">
            {sidebarItems.map((item, idx) => {
              const navActive = pathname === item.link;
              return (
                <li key={idx} onClick={() => setNavOpen(false)}>
                  <Link
                    href={item.link}
                    className={cn(
                      "flex items-center gap-2 rounded text-nowrap cursor-pointer",
                      { "hover:bg-slate-400/20": open && !navActive },
                      { "bg-primary": open && navActive }
                    )}
                  >
                    <div
                      className={cn(
                        "p-2.5 rounded-full",
                        { "hover:bg-slate-400/20": !open && !navActive },
                        { "bg-primary": !open && navActive }
                      )}
                    >
                      {item.icon}
                    </div>
                    <p>{open && item.label}</p>
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-2 rounded cursor-pointer",
                  {
                    "hover:bg-slate-400/20": open,
                  }
                )}
              >
                <div
                  className={cn("p-2.5 rounded-full", {
                    "hover:bg-slate-400/20": !open,
                  })}
                >
                  <DoorOpen />
                </div>
                <p>{open && "Exit"}</p>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
