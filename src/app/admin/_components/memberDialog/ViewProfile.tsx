"use client";

import { FC } from "react";
import Image from "next/image";
import { IUser } from "@/types";
import { Button } from "@/app/_components/ui/Button";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import DialogInfoRow from "@/app/_components/ui/DialogInfoRow";
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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface ViewProfileProps {
  user: IUser | null;
  open: boolean;
  onClose: () => void;
}

const ViewProfile: FC<ViewProfileProps> = ({ user, open, onClose }) => {
  const { allAccounts } = useAllAccounts();

  if (!user) return null;

  const memberAccounts = allAccounts.filter((a) => a.userId === user._id);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl z-80">
        <DialogHeader>
          <DialogTitle>Member info</DialogTitle>
          <DialogDescription className="border-b pb-3">
            Check member info for manage.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          {user.avatar && (
            <HoverCard openDelay={10} closeDelay={5000}>
              <HoverCardTrigger asChild>
                <Image
                  src={user.avatar}
                  width={200}
                  height={200}
                  className="size-15 rounded-full cursor-pointer"
                  alt="Profile Picture"
                />
              </HoverCardTrigger>
              <HoverCardContent side="right" className="z-90">
                <Image
                  src={user.avatar}
                  width={500}
                  height={500}
                  className="min-size-100"
                  alt="Profile Picture"
                />
              </HoverCardContent>
            </HoverCard>
          )}

          <ul>
            {memberAccounts.map((a) => (
              <li key={a._id} className="flex items-center">
                <h3
                  className={cn("px-1.5 rounded-full text-green-500", {
                    "text-red-500": a.status === "block",
                  })}
                >
                  {a.accName}:
                </h3>
                <small>{a.accNumber}</small>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <DialogInfoRow
              label="Name"
              value={`${user.firstName} ${user?.lastName}`}
            />
            <DialogInfoRow label="Username" value={user.username} />
            <DialogInfoRow label="Email" value={user.email} />
            <DialogInfoRow label="Number" value={user?.number} />
          </div>
          <div className="space-y-1">
            <DialogInfoRow
              label="Birthday"
              value={
                user.dob
                  ? new Date(user.dob).toLocaleDateString("en-BD", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"
              }
            />
            <DialogInfoRow label="Gender" value={user.gender} />
            <DialogInfoRow label="Nationality" value={user.nationality} />
            <DialogInfoRow label="Role" value={user.role} />
          </div>
          <DialogInfoRow label="Address" value={user?.address} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onClose}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProfile;
