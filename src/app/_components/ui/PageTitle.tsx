import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

type ProfilePageTitleProps = {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

const ProfilePageTitle: FC<ProfilePageTitleProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "text-3xl md:text-4xl py-2.5 md:py-3.5 border-b-2 border-dashed flex justify-between items-center",
        className,
      )}
    >
      <div>
        <h1 className="font-bold mb-2.5 ps-3.5 relative before:absolute before:content-[''] before:w-2 before:h-10/12 before:top-4/7 before:left-0 before:bg-primary before:rounded-full before:-translate-y-1/2">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ProfilePageTitle;
