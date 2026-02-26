"use client";

import { X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type WithdrawRequestFormProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const WithdrawRequestForm = ({ open, setOpen }: WithdrawRequestFormProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-3 z-99">
        <DrawerClose className="cursor-pointer mt-0 ml-auto mr-7">
          <X />
        </DrawerClose>

        <DrawerHeader>
          <DrawerTitle>Withdraw Submission</DrawerTitle>
          <DrawerDescription>
            Enter your withdraw information carefully. All submissions are
            subject to verification.
          </DrawerDescription>
        </DrawerHeader>

        <div className="max-w-lg text-2xl text-red-500 font-semibold mx-auto mb-7">
          <h2>Now this servic are not avalable!</h2>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default WithdrawRequestForm;
