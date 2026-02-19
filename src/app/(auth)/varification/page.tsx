"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/Button";
import { Loader2, ShieldCheck } from "lucide-react";
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
import { emailMasking } from "@/helpers/MaskEmail";

const Varification: FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(120);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  const handleVerify = () => {
    if (otp.length !== 6) return;

    setIsLoading(true);
    setError("");

    // simulate api
    setTimeout(() => {
      setIsLoading(false);

      if (otp !== "123456") {
        setError("Invalid OTP. Please try again.");
        setOtp("");
        return;
      }
      router.push("/profile");
    }, 1200);
  };

  const handleResend = () => {
    setSeconds(120);
    setError("");
    setOtp("");
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
            {emailMasking("alaminmridha2004@gmail.com")}
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
          {seconds > 0 ? `Resend OTP in ${seconds}s` : "Resend OTP"}
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

export default Varification;
