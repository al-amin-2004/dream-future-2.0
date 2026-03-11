"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/Button";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import ChangePassword from "../../_components/ui/ChangePassword";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    deposit: true,
    request: true,
    messages: true,
  });

  const handleNotificationToggle = (type: string) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev],
    }));
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      console.log("Account Deleted");
    }
  };

  return (
    <div className="space-y-8">
      <ProfilePageTitle
        title="Settings"
        description="Customize your all info and data."
      />

      <div className="grid grid-cols-2 w-full">
        {/* Change Password */}
        <ChangePassword />

        {/* Notification Settings */}
        <section className="p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Notification Settings</h2>
          <div className="flex flex-col gap-3">
            {Object.keys(notifications).map((key) => (
              <label key={key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={notifications[key as keyof typeof notifications]}
                  onChange={() => handleNotificationToggle(key)}
                  className="w-4 h-4"
                />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            ))}
          </div>
        </section>
      </div>

      {/* Delete Account */}
      <section className=" p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-red-600">Delete Account</h2>
        <p className="text-sm text-gray-600">
          Deleting your account is permanent. All your data will be lost.
        </p>
        <Button onClick={handleDeleteAccount}>Delete Account</Button>
      </section>
    </div>
  );
};

export default SettingsPage;
