"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/providers/SidebarContext";
import { useUser } from "@/providers/UserContext";
import { useAccounts } from "@/providers/AccountContext";
import { Button } from "@/app/_components/ui/Button";
import { Skeleton } from "@/components/ui/skeleton";
import LogoutButton from "@/app/(auth)/components/ui/LogoutButton";
import { ChevronDown, PanelLeft, PanelRight, User } from "lucide-react";
import Notification from "../ui/Notification";
// import Rewards from "../ui/Rewards";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header = () => {
  const { accounts, activeAccount, setActiveAccount } = useAccounts();
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);
  const { open, toggle } = useSidebar();
  const { user, loading } = useUser();

  return (
    <header className="py-4 md:py-5 px-6 flex items-center justify-end md:justify-between border-b border-zinc-700 sticky top-0 z-50 bg-background">
      {/* left side */}
      <button onClick={toggle} className="hidden md:block cursor-pointer">
        {open ? <PanelLeft /> : <PanelRight />}
      </button>

      {/* right side */}
      <div className="flex items-center gap-4 md:gap-5">
        {accounts.length > 1 && (
          <ul className="hidden md:flex gap-2.5">
            {accounts.map((account, idx) => (
              <li
                key={idx}
                onClick={() => setActiveAccount(account)}
                className={cn(
                  "p-2 bg-green-500/15 text-green-500 size-8 rounded-full flex justify-center items-center cursor-pointer",
                  account._id === activeAccount?._id &&
                    "text-red-400 ring ring-red-400 bg-red-400/15",
                )}
              >
                {idx + 1}
              </li>
            ))}
          </ul>
        )}

        {/* Notification component */}
        <Notification />

        {/* Rewards components */}
        {/* <Rewards>{activeAccount?.totalRewards || 0}</Rewards> */}

        <DropdownMenu>
          <DropdownMenuTrigger>
            {loading ? (
              <div className="flex items-center space-x-3">
                <Skeleton className="size-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-37.5" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ) : (
              <div className="text-start md:px-2.5 md:py-1.5 rounded-full bg-slate-400/15 flex items-center gap-3 cursor-pointer">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    width={300}
                    height={300}
                    alt="Profile Picture"
                    className="size-7 ring-2 ring-ring rounded-full"
                  />
                ) : (
                  <User className="size-7 p-1 ring-2 ring-ring rounded-full" />
                )}

                <span className="hidden md:block w-0.5 h-6 bg-slate-300/40" />

                <div className="hidden md:block">
                  <h2 className="font-semibold text-sm leading-4 tracking-wider">
                    {`${user?.firstName} ${user?.lastName}`}
                  </h2>
                  <p className="text-xs text-primary">{user?.role}</p>
                </div>
                <ChevronDown className="hidden md:block size-5 ms-2.5 me-1" />
              </div>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-[calc(100vw-20px)] md:w-65 mr-2.5 p-2.5"
          >
            <DropdownMenuGroup className="shadow-xl bg-accent rounded-sm p-2 mb-2">
              <DropdownMenuItem>
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    width={300}
                    height={300}
                    alt="Profile Picture"
                    className="size-7 ring-2 ring-ring rounded-full"
                  />
                ) : (
                  <User className="size-7 p-1 ring-2 ring-ring rounded-full" />
                )}

                <span className="w-0.5 h-6 bg-slate-300/40 mr-2" />

                <div>
                  <h2 className="font-semibold text-sm leading-4 tracking-wider">
                    {`${user?.firstName} ${user?.lastName}`}
                  </h2>
                  <p className="text-xs text-primary">{user?.role}</p>
                </div>
              </DropdownMenuItem>
              {accounts.length > 1 && (
                <Select
                  value={activeAccount ? String(activeAccount._id) : undefined}
                  onValueChange={(value) => {
                    const selected = accounts.find(
                      (acc) => String(acc._id) === value,
                    );
                    if (selected) setActiveAccount(selected);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>

                  <SelectContent>
                    {accounts.map((account, idx) => (
                      <SelectItem
                        key={String(account._id)}
                        value={String(account._id)}
                      >
                        Account {idx + 1}
                        {idx + 1 === 1 && " (Main)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </DropdownMenuGroup>

            {user?.role === "admin" && (
              <div>
                <Link href="admin/">
                  <DropdownMenuItem className="cursor-pointer">
                    Admin Panel
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
              </div>
            )}

            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setShowLogoutDialog(true)}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Logout Account</DialogTitle>
              <DialogDescription>
                Are you sure you want to{" "}
                <b className="text-destructive">Logout</b> of your account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="hover:translate-0">Cancel</Button>
              </DialogClose>
              <LogoutButton>Sure</LogoutButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
