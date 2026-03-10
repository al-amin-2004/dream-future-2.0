"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useAllUsers } from "@/providers/AllUsersContext";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import { Coins, EllipsisVertical, Shield, User } from "lucide-react";
import { IUser, Role } from "@/types";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import Input from "@/app/_components/ui/Input";
import ViewProfile from "../../_components/memberDialog/ViewProfile";
import EditProfile from "../../_components/memberDialog/EditProfile";
import ChangeRole from "../../_components/memberDialog/ChangeRole";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { role } from "@/constants/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Members = () => {
  const { allUsers } = useAllUsers();
  const { allAccounts } = useAllAccounts();
  const [search, setSearch] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");
  const [viewProfile, setViewProfile] = useState<IUser | null>(null);
  const [editProfile, setEditProfile] = useState<IUser | null>(null);
  const [changeRole, setChangeRole] = useState<IUser | null>(null);

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
              <th className="hidden md:table-cell">Account length</th>
              <th className="hidden md:table-cell">Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {filteredUsers.map((user) => {
              const memberAccounts = allAccounts.filter(
                (a) => a.userId === user._id,
              );
              return (
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
                        {user.firstName +
                          " " +
                          (user.lastName && user.lastName)}
                      </p>
                      <p className="text-xs text-muted-foreground hidden md:block">
                        {user.email}
                      </p>
                    </div>
                  </td>

                  {/* USERNAME */}
                  <td className="hidden md:table-cell">{user.username}</td>

                  {/* ACCOUNTS LENGTH */}
                  <td className="hidden md:table-cell">
                    {memberAccounts.length}
                  </td>

                  {/* ROLE */}
                  <td className="hidden md:table-cell">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full bg-blue-500/20 text-blue-400">
                      {user.role === "admin" && <Shield className="size-4" />}
                      {user.role === "treasurer" && (
                        <Coins className="size-4" />
                      )}
                      {user.role === "member" && <User className="size-4" />}
                      {user.role.toLocaleUpperCase()}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td title="Select all actions!">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-muted/40 cursor-pointer">
                          <EllipsisVertical />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewProfile(user)}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditProfile(user)}>
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setChangeRole(user)}>
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ====== All action Dialog components here ====== */}
      <ViewProfile
        open={!!viewProfile}
        onClose={() => setViewProfile(null)}
        user={viewProfile}
      />
      <EditProfile
        open={!!editProfile}
        onClose={() => setEditProfile(null)}
        user={editProfile}
      />
      <ChangeRole
        open={!!changeRole}
        onClose={() => setChangeRole(null)}
        user={changeRole}
      />
    </div>
  );
};

export default Members;
