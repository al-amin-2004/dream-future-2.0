"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import { useAllUsers } from "@/providers/AllUsersContext";
import { Eye, Shield } from "lucide-react";
import Input from "@/app/_components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IUser, Role } from "@/types";
import { role } from "@/constants/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DialogInfoRow from "@/app/_components/ui/DialogInfoRow";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/app/_components/ui/Button";

const Members = () => {
  const { allUsers } = useAllUsers();
  const [search, setSearch] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        user.firstName.toLowerCase().includes(keyword) ||
        user.lastName?.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword);

      const matchRole = roleFilter === "all" ? true : user.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [allUsers, search, roleFilter]);

  return (
    <div className="space-y-8">
      <ProfilePageTitle
        title="Members"
        description="Manage all registered members"
      />

      {/* ================= SEARCH AND FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Role Filter */}
        <Select
          value={roleFilter}
          onValueChange={(value) => setRoleFilter(value as "all" | Role)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter role" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {role.map((role) => (
              <SelectItem key={role} value={role} className="capitalize">
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ================= TABLE ================= */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-muted text-center">
            <tr>
              <th className="p-3">Users</th>
              <th className="hidden md:table-cell">Username</th>
              <th className="hidden md:table-cell">Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-muted/40 transition"
              >
                {/* USER */}
                <td className="p-3 flex justify-center items-center gap-3">
                  <div className="hidden md:block">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        width={36}
                        height={36}
                        alt="avatar"
                        className="rounded-full"
                      />
                    ) : (
                      <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                        {user.firstName.slice(0, 1)}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-medium">
                      {user.firstName + " " + (user.lastName && user.lastName)}
                    </p>
                    <p className="text-xs text-muted-foreground hidden md:block">
                      {user.email}
                    </p>
                  </div>
                </td>

                {/* USERNAME */}
                <td className="hidden md:table-cell">{user.username}</td>

                {/* ROLE */}
                <td className="hidden md:table-cell">
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                    <Shield className="size-3" />
                    {user.role.toLocaleUpperCase()}
                  </span>
                </td>

                {/* ACTION */}
                <td title="See all info!" className="flex justify-center">
                  <Eye
                    className="cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="min-w-2xl">
          <DialogHeader>
            <DialogTitle>Member info</DialogTitle>
            <DialogDescription className="border-b pb-3">
              Check member info for manage.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <>
              <HoverCard openDelay={10} closeDelay={5000}>
                <HoverCardTrigger asChild>
                  <Image
                    src={selectedUser.avatar ? selectedUser.avatar : ""}
                    width={200}
                    height={200}
                    className="size-15 rounded-full cursor-pointer"
                    alt="Profile Picture"
                  />
                </HoverCardTrigger>
                <HoverCardContent side="right">
                  <Image
                    src={selectedUser.avatar ? selectedUser.avatar : ""}
                    width={500}
                    height={500}
                    className="min-size-100"
                    alt="Profile Picture"
                  />
                </HoverCardContent>
              </HoverCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <DialogInfoRow
                    label="Name"
                    value={`${selectedUser.firstName} ${selectedUser?.lastName}`}
                  />
                  <DialogInfoRow
                    label="Username"
                    value={selectedUser.username}
                  />
                  <DialogInfoRow label="Email" value={selectedUser.email} />
                  <DialogInfoRow label="Number" value={selectedUser?.number} />
                </div>
                <div className="space-y-1">
                  <DialogInfoRow
                    label="Birthday"
                    value={
                      selectedUser.dob
                        ? new Date(selectedUser.dob).toLocaleDateString(
                            "en-BD",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          )
                        : "N/A"
                    }
                  />
                  <DialogInfoRow label="Gender" value={selectedUser.gender} />
                  <DialogInfoRow
                    label="Nationality"
                    value={selectedUser.nationality}
                  />
                  <DialogInfoRow label="Role" value={selectedUser.role} />
                </div>
                <DialogInfoRow label="Address" value={selectedUser?.address} />
              </div>
            </>
          )}
          <DialogFooter>
            <DialogClose>
              <Button onClick={() => setSelectedUser(null)}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Members;
