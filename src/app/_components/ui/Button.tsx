import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "font-semibold text-sm text-nowrap px-4 py-1.5 rounded-full inline-flex justify-center items-center hover:translate-x-0.5 disabled:hover:translate-x-0 transition-all duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "text-black bg-primary hover:bg-primary/90 disabled:bg-primary/60",
        outline:
          "text-primary border-primary bg-trasparent border shadow-xs hover:bg-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
