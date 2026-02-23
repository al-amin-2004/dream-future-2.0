"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "@/schemas/signInSchema";
import { useUser } from "@/providers/UserContext";
import Input from "../../_components/ui/Input";
import Label from "../../_components/ui/Label";
import { Button } from "@/app/_components/ui/Button";
import z from "zod";
import {
  RegistrationCard,
  RegistrationCardDescription,
  RegistrationCardFooter,
  RegistrationCardHeader,
  RegistrationCardTitle,
} from "../../_components/ui/RegistrarCard";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

type SigninFormData = z.infer<typeof signinSchema>;

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { refreshUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({ resolver: zodResolver(signinSchema) });

  const onSubmit = async (formData: SigninFormData) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
      }

      toast.success(data.message);
      refreshUser();
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegistrationCard className="w-full max-w-md  mt-20">
      {/* Header */}
      <RegistrationCardHeader>
        <div className="inline-flex items-center justify-center size-16 md:size-12 bg-gray-900 rounded-full mb-4 ring md:ring-0 ring-primary">
          <UserIcon className="size-10 md:size-7" />
        </div>
        <RegistrationCardTitle className="text-2xl mb-2">
          Login account
        </RegistrationCardTitle>
        <RegistrationCardDescription>
          Enter your details to get started
        </RegistrationCardDescription>
      </RegistrationCardHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <MailIcon
              size={16}
              className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-gray-500"
            />
            <Input
              placeholder="name@example.com"
              {...register("email")}
              className="pl-8 md:pl-9"
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs -mt-1.5">
              {errors.email.message}
            </p>
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
              placeholder="Inter your password"
              {...register("password")}
              className="pl-8 md:pl-9 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs -mt-1.5">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full rounded md:rounded-md">
          {isLoading ? "Checking..." : "Log in"}
        </Button>
      </form>

      {/* Footer */}
      <RegistrationCardFooter>
        <p className="text-sm text-gray-400">
          Already have no account?{" "}
          <Link
            href="/signup"
            className="text-gray-100 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </RegistrationCardFooter>
    </RegistrationCard>
  );
};

export default SignUp;
