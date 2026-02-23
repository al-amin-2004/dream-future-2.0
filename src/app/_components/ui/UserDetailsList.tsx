import { FC } from "react";

interface UserDetailsListProps {
  label: string | undefined;
  value: string | number | undefined;
  className?: string;
}

const UserDetailsList: FC<UserDetailsListProps> = ({
  label,
  value,
  className,
}) => {
  return (
    <li
      className={`mb-1.5 border-b border-accent-foreground/7 py-1.5 ${className}`}
    >
      <p>
        <strong className="text-sm">👉 {label}: </strong>
        {value}
      </p>
    </li>
  );
};

export default UserDetailsList;
