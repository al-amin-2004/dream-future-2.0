import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import style from "@/styles/registrationForm.module.css";

function RegistrationCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "p-4 md:p-6 md:border border-gray-700 rounded-lg shadow-sm",
        style.FormCard,
        className
      )}
      {...props}
    />
  );
}

function RegistrationCardHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("text-center mb-6", className)}
      {...props}
    />
  );
}

function RegistrationCardTitle({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function RegistrationCardDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

function RegistrationCardFooter({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("mt-6 text-center", className)} {...props}>
      {children}
    </div>
  );
}

export {
  RegistrationCard,
  RegistrationCardHeader,
  RegistrationCardTitle,
  RegistrationCardDescription,
  RegistrationCardFooter,
};
