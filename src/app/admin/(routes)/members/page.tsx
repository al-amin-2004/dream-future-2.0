"use client";

import Image from "next/image";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import { useAllUsers } from "@/providers/AllUsersContext";
import { Eye, Shield } from "lucide-react";

const Members = () => {
  const { allUsers } = useAllUsers();
  return (
    <div className="space-y-8">
      <ProfilePageTitle
        title="Members"
        description="Manage all registered members"
      />

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
            {allUsers.map((user) => (
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
                    onClick={() => alert("add user details info!")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
