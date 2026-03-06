"use client"

import { useState } from "react";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";

const Accounts = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div>
      <ProfilePageTitle
        title="Accounts"
        description="Manage all user accounts from here"
      >
        <input
          type="text"
          placeholder="Search by User Name or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm w-68"
        />
      </ProfilePageTitle>
    </div>
  );
};

export default Accounts;
