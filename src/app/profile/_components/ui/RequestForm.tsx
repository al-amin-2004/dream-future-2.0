import { useState } from "react";
import { Button } from "@/app/_components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DepositRequestForm from "./DepositRequestForm";
import WithdrawRequestForm from "./WithdrawRequestForm";

const RequestForm = () => {
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="float-right sticky lg:static bottom-8"
        >
          <Button>Deposit / Withdraw money</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50" align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Choose an any option</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setOpenDeposit(true)}
              className="cursor-pointer hover:bg-gray-400/30"
            >
              Deposit Money
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenWithdraw(true)}
              className="cursor-pointer hover:bg-gray-400/30"
            >
              Withdraw Money
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Drawer components */}
      <DepositRequestForm open={openDeposit} setOpen={setOpenDeposit} />
      <WithdrawRequestForm open={openWithdraw} setOpen={setOpenWithdraw} />
    </>
  );
};

export default RequestForm;
