"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/_components/ui/Button";
import Input from "../../_components/ui/Input";
import Label from "../../_components/ui/Label";
import { toast } from "sonner";
import {
  RegistrationCard,
  RegistrationCardDescription,
  RegistrationCardFooter,
  RegistrationCardHeader,
  RegistrationCardTitle,
} from "../../_components/ui/RegistrarCard";
import {
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (formData: SignUpFormData) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.info(data.message || "Something Worng!");
      } else {
        toast.success(data.message);
        router.push(`/verification?userid=${data.userId}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegistrationCard className="w-full md:max-w-md mt-20">
      {/* Header */}
      <RegistrationCardHeader>
        <div className="inline-flex items-center justify-center size-16 md:size-12 bg-gray-900 rounded-full mb-4 ring md:ring-0 ring-primary">
          <UserIcon className="size-10 md:size-7" />
        </div>
        <RegistrationCardTitle className="text-3xl md:text-2xl mb-2">
          Create account
        </RegistrationCardTitle>
        <RegistrationCardDescription>
          Enter your details to get started
        </RegistrationCardDescription>
      </RegistrationCardHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* First and last Name Inputs */}
        <div className="flex gap-2">
          <div className="w-full space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input placeholder="John" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName.message}</p>
            )}
          </div>
          <div className="w-full space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input placeholder="Doe" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <MailIcon
              size={16}
              className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-gray-500"
            />
            <Input
              placeholder="example@gmail.com"
              {...register("email")}
              className="pl-8 md:pl-9"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <LockIcon
              size={16}
              className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-gray-500"
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              {...register("password")}
              className="pl-8 md:pl-9"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 text-gray-500 md:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-2">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="terms"
              required
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="sr-only"
            />
            <Label htmlFor="terms" className="flex items-center cursor-pointer">
              <div
                className={`size-4 border border-gray-600 rounded flex items-center justify-center transition-all duration-200 ${
                  isChecked ? "border-primary" : "hover:border-gray-500"
                }`}
              >
                {isChecked && <CheckIcon color="var(--primary)" />}
              </div>
            </Label>
          </div>

          <Label
            htmlFor="terms"
            className="text-xs text-gray-400 cursor-pointer leading-4"
          >
            I agree to the
            <Link href="#" className="text-gray-100 hover:underline">
              Terms of Service
            </Link>
            and
            <Link href="#" className="text-gray-100 hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isChecked || isLoading}
          className="w-full rounded md:rounded-md"
        >
          {isLoading ? "Sending OTP..." : "Get OTP"}
        </Button>
      </form>

      {/* Footer */}
      <RegistrationCardFooter>
        <p className="text-sm text-gray-400">
          Already have an account?
          <Link
            href="/login"
            className="text-gray-100 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </RegistrationCardFooter>
    </RegistrationCard>
  );
};

export default SignUp;
