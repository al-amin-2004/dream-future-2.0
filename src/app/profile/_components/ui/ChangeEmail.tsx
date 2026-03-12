"use client";

import { FC, useState } from "react";
import { toast } from "sonner";
import { emailValidation } from "@/schemas/EmailSchema";
import { Button } from "@/app/_components/ui/Button";
import z from "zod";
import Input from "@/app/_components/ui/Input";
import Label from "@/app/_components/ui/Label";
import ErrorMessage from "@/app/_components/ui/ErrorMessage";
import { useUser } from "@/providers/UserContext";
import { useRouter } from "next/navigation";

export const emailSchema = z.object({
  newEmail: emailValidation,
});

type FormErrors = Partial<Record<keyof z.infer<typeof emailSchema>, string[]>>;

const ChangeEmail: FC = () => {
  const router = useRouter();
  const [newEmail, setNewEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const handleEmailChange = async () => {
    setErrors({});

    // Validate email
    const result = emailSchema.safeParse({ newEmail });
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/users/change-email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?._id, newEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Email update failed");
      } else {
        toast.success("Send code successfully");
        router.push(`/verification?userid=${data.userId}`);
        setNewEmail("");
        console.log("end");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Change Email</h2>

      <div className="space-y-3">
        <div>
          <Label htmlFor="new-email">New Email</Label>
          <Input
            id="new-email"
            type="email"
            placeholder="Enter new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          {errors?.newEmail && (
            <ErrorMessage>{errors.newEmail[0]}</ErrorMessage>
          )}
        </div>

        <Button onClick={handleEmailChange} disabled={loading}>
          {loading ? "Updating..." : "Update Email"}
        </Button>
      </div>
    </section>
  );
};

export default ChangeEmail;
