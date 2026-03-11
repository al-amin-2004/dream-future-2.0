"use client";

import { FC, useState } from "react";
import { z } from "zod";
import { passwordValidation } from "@/schemas/passwordSchema";
import { toast } from "sonner";
import { Button } from "@/app/_components/ui/Button";
import Input from "@/app/_components/ui/Input";
import ErrorMessage from "@/app/_components/ui/ErrorMessage";
import Label from "@/app/_components/ui/Label";

const ChangePasswordSchema = z.object({
  currentPassword: passwordValidation,
  newPassword: passwordValidation,
});

type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;
type FormErrors = Partial<Record<keyof ChangePasswordType, string[]>>;
const ChangePassword: FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    setErrors({});

    const result = ChangePasswordSchema.safeParse({
      currentPassword,
      newPassword,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/users/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Password update failed");
        return;
      }

      toast.success("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Change Password</h2>

      <div className="space-y-3">
        <div>
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            id="current-password"
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          {errors?.currentPassword && (
            <ErrorMessage>{errors.currentPassword[0]}</ErrorMessage>
          )}
        </div>

        <div>
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {errors?.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword[0]}</p>
          )}
        </div>

        <Button onClick={handlePasswordChange} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </section>
  );
};

export default ChangePassword;
