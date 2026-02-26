"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useAccounts } from "@/providers/AccountContext";
import { Plus, X } from "lucide-react";
import { Button } from "@/app/_components/ui/Button";
import { getCurrentMonth } from "@/helpers/getCurrentMonth";
import { requestSchema } from "@/schemas/requestSchema";
import { paymentMethods } from "@/constants/request";
import ErrorMessage from "@/app/_components/ui/ErrorMessage";
import Input from "@/app/_components/ui/Input";
import Label from "@/app/_components/ui/Label";
import {
  RegistrationCard,
  RegistrationCardHeader,
  RegistrationCardTitle,
} from "@/app/_components/ui/RegistrarCard";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type RequestFormTypes = z.infer<typeof requestSchema>;

const RequestForm = () => {
  const currentMonth = getCurrentMonth();
  const { activeAccount } = useAccounts();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RequestFormTypes>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      amount: 200,
      month: currentMonth,
      method: "bkash",
      transactionId: "",
    },
  });

  const depositMethods = paymentMethods.filter((method) => method !== "cash");
  const onSubmit = async (formData: RequestFormTypes) => {
    setLoading(true);

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: activeAccount?._id,
          requestType: "deposit",
          ...formData,
        }),
      });

      if (!res.ok) throw new Error("Failed to deposit request");

      toast.success("Deposit request submitted!");
      setOpen(false);
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="float-right sticky lg:static bottom-8">
        <Button>
          <Plus className="stroke-3 mr-1" /> Deposit money
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-3 z-99">
        <DrawerClose className="cursor-pointer mt-0 ml-auto mr-7">
          <X />
        </DrawerClose>

        <DrawerHeader>
          <DrawerTitle>Deposit Submission</DrawerTitle>
          <DrawerDescription>
            Enter your deposit information carefully. All submissions are
            subject to verification.
          </DrawerDescription>
        </DrawerHeader>

        <div className="max-w-lg mx-auto mb-7">
          <RegistrationCard className="rounded-2xl shadow-md">
            <RegistrationCardHeader>
              <RegistrationCardTitle className="text-xl">
                💰 Monthly Deposit
              </RegistrationCardTitle>
            </RegistrationCardHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Deposit Amount (৳)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  min={200}
                  max={200}
                  {...register("amount", { valueAsNumber: true })}
                />
                {errors.amount && (
                  <ErrorMessage>{errors.amount.message}</ErrorMessage>
                )}
              </div>

              {/* Month */}
              <div className="space-y-2">
                <Label htmlFor="month">Deposit Month</Label>
                <Input
                  id="month"
                  type="month"
                  min={currentMonth}
                  {...register("month")}
                />
                {errors.month && (
                  <ErrorMessage>{errors.month.message}</ErrorMessage>
                )}
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label htmlFor="method">Payment Method</Label>
                <div className="flex gap-4">
                  {depositMethods.map((m) => (
                    <label
                      key={m}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        id="method"
                        type="radio"
                        value={m}
                        {...register("method")}
                      />
                      <span>{m}</span>
                    </label>
                  ))}
                </div>
                {errors.method && (
                  <ErrorMessage>{errors.method.message}</ErrorMessage>
                )}
              </div>

              {/* Transaction ID */}
              <div className="space-y-2">
                <Label htmlFor="transaction-id">Transaction ID</Label>
                <Input
                  id="transaction-id"
                  placeholder="Enter transaction reference"
                  {...register("transactionId")}
                />
                {errors.transactionId && (
                  <ErrorMessage>{errors.transactionId.message}</ErrorMessage>
                )}
              </div>

              {/* Info */}
              <p className="text-xs text-muted-foreground">
                ⚠ Your deposit will be reviewed by treasurer or admin. Balance
                will be updated after approval.
              </p>

              {/* Submit */}
              <Button
                disabled={loading}
                className="w-full rounded hover:translate-0"
              >
                {loading ? "Submitting..." : "Submit Deposit Request"}
              </Button>
            </form>
          </RegistrationCard>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default RequestForm;
