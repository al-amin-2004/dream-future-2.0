"use client";

import { Button } from "@/app/_components/ui/Button";
import ProfilePageTitle from "@/app/_components/ui/PageTitle";
import ChangePassword from "../../_components/ui/ChangePassword";
import NotificationSettings from "../../_components/ui/NotificationSettings";
import ChangeEmail from "../../_components/ui/ChangeEmail";

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <ProfilePageTitle
        title="Settings"
        description="Customize your all info and data."
      />

      <div className="grid grid-cols-2 w-full">
        {/* Change Password */}
        <ChangePassword />

        {/* change Email */}
        <ChangeEmail />

        {/* Notification Settings */}
        <NotificationSettings />
      </div>

      {/* Delete Account */}
      <section className=" p-6 rounded-lg shadow-md space-y-4 border-t border-red-500">
        <h2 className="text-xl font-semibold text-red-600">Delete Account</h2>
        <p className="text-sm text-gray-600">
          Deleting your account is permanent. All your data will be lost.
        </p>
        <Button disabled>Delete Account</Button>
      </section>
    </div>
  );
};

export default SettingsPage;
