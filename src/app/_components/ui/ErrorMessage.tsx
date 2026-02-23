import { FC } from "react";

const ErrorMessage: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-red-500 text-sm">{children}</p>;
};

export default ErrorMessage;
