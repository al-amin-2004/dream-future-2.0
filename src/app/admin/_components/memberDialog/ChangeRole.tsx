"use client";

import { FC, useState } from "react";
import { role } from "@/constants/user";
import { IUser, Role } from "@/types";
import { Shield } from "lucide-react";
import { Button } from "@/app/_components/ui/Button";
import { useAllUsers } from "@/providers/AllUsersContext";
import { toast } from "sonner";
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

interface ViewProfileProps {
  user: IUser | null;
  open: boolean;
  onClose: () => void;
}

const ChangeRole: FC<ViewProfileProps> = ({ user, open, onClose }) => {
  const { refreshUsers } = useAllUsers();
  const [newRole, setNewRole] = useState<Role | "">(user?.role ?? "");

  if (!user) return null;

  const handleUpdate = async () => {
    if (!newRole || newRole === user.role) return;

    try {
      const res = await fetch("/api/users/role", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newRole, memberId: user._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
        toast.error(data.message || "Something wrong");
      }

      toast.success(`Role updated to "${data.updatedUser.role}" successfully.`);
      refreshUsers();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Change Member Role</DialogTitle>
          <DialogDescription className="border-b pb-3">
            Update the role for this member.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Current Role */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Role</span>

            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
              <Shield className="size-3" />
              {user.role.toUpperCase()}
            </span>
          </div>

          {/* Select New Role */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Select New Role</p>

            <Select
              value={newRole}
              onValueChange={(value) => setNewRole(value as Role)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {role.map((r) => (
                  <SelectItem key={r} value={r} className="capitalize">
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            onClick={handleUpdate}
            disabled={!newRole || newRole === user.role}
          >
            Update Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRole;
