import { useState } from "react";
import Label from "@/app/_components/ui/Label";
import { Switch } from "@/components/ui/switch";

const NotificationSettings = () => {
  const [notifications] = useState({
    deposit: true,
    request: true,
    messages: true,
  });

  return (
    <section className="p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Notification Settings</h2>
      <div className="flex flex-col gap-3">
        {Object.keys(notifications).map((key) => (
          <div key={key} className="flex items-center justify-between gap-2">
            <Label htmlFor={key} className="flex items-center gap-3">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Label>
            <Switch id={key} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotificationSettings;
