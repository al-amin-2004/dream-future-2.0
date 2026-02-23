import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellDot } from "lucide-react";


const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <BellDot className="size-8 p-2 ring ring-ring rounded-full cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-sm p-2.5">
        <DropdownMenuLabel className="text-2xl font-medium">
          Notifications/
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {Array.from({ length: 8 }).map((_, idx) => (
          <DropdownMenuItem key={idx} className="flex-col items-start gap-0">
            <h5 className="text-base">Official sms</h5>
            <p className="text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Laboriosam, at.
            </p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
