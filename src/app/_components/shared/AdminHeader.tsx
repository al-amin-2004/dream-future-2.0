"use client";

import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/providers/UserContext";
import { ChevronDown, User } from "lucide-react";
import { Button } from "../ui/Button";
import { Skeleton } from "@/components/ui/skeleton";
import LogoutButton from "@/app/(auth)/components/ui/LogoutButton";
import Notification from "../ui/Notification";
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

const AdminHeader: FC = () => {
  const { user, loading } = useUser();
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);
  return (
    <header className="py-4 md:py-5 px-6 flex items-center justify-end md:justify-between border-b border-zinc-700 sticky top-0 z-50 bg-background">
      {/* left side */}
      <div></div>
      {/* right side */}
      <div className="flex items-center gap-4 md:gap-5">
        {/* Notification component */}
        <Notification />

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
            </DropdownMenuGroup>

            <div>
              <Link href="profile/">
                <DropdownMenuItem className="cursor-pointer">
                  My Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </div>

            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setShowLogoutDialog(true)}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logout Popup */}
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

export default AdminHeader;
