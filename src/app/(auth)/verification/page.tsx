"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/providers/UserContext";
import { emailMasking } from "@/helpers/MaskEmail";
import { formatTime } from "@/helpers/formatTime";
import { Button } from "@/app/_components/ui/Button";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import {
  RegistrationCard,
  RegistrationCardDescription,
  RegistrationCardFooter,
  RegistrationCardHeader,
  RegistrationCardTitle,
} from "@/app/_components/ui/RegistrarCard";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VarificationPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useUser();
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [email, setEmail] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(0);

  const [attempts, setAttempts] = useState<number>(0);

  const userId = searchParams.get("userid");

  // get email and OTP
  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await fetch("/api/auth/getValidationOtp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
        }

        setEmail(data.email);
        setExpiresAt(data.expiresAt);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) getInfo();
  }, [userId]);

  // date to second convert
  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const remaining = Math.floor(
        (new Date(expiresAt).getTime() - new Date().getTime()) / 1000,
      );

      setSeconds(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  // OTP Verifi here
  const handleVerify = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong!");
        return;
      }

      refreshUser();
      toast.success(data.message, {
        duration: 1500,
        onAutoClose: () => {
          router.push("/profile");
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    // todo back here
  };

  const isBlocked = attempts >= 5;

  return (
    <RegistrationCard className="w-full md:max-w-md mt-20 p-6 space-y-6">
      <RegistrationCardHeader className="text-center">
        <div className="mx-auto inline-flex items-center justify-center size-14 bg-primary/20 rounded-full mb-4">
          <ShieldCheck className="size-7 text-primary" />
        </div>

        <RegistrationCardTitle className="text-2xl font-semibold">
          Verify Your Email
        </RegistrationCardTitle>

        <RegistrationCardDescription>
          Enter the 6 digit code sent to <br />
          <span className="text-sm font-medium text-foreground">
            {email && emailMasking(email)}
          </span>
        </RegistrationCardDescription>
      </RegistrationCardHeader>

      <div className="flex flex-col items-center gap-5">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOtp}
          disabled={isBlocked}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {isBlocked && (
          <p className="text-sm text-red-500">
            Too many failed attempts. Try again later.
          </p>
        )}

        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isLoading || isBlocked}
          className="w-full flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="animate-spin size-4" />}
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>

        <button
          onClick={handleResend}
          disabled={seconds > 0}
          className="text-sm text-muted-foreground hover:underline disabled:opacity-50"
        >
          {seconds > 0 ? `Resend OTP in ${formatTime(seconds)}s` : "Resend OTP"}
        </button>
      </div>

      <RegistrationCardFooter className="text-center">
        <span
          onClick={() => router.back()}
          className="text-sm text-primary cursor-pointer hover:underline"
        >
          Change email
        </span>
      </RegistrationCardFooter>
    </RegistrationCard>
  );
};

export default VarificationPage;
