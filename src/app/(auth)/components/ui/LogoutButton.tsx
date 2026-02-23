import { Button } from "@/app/_components/ui/Button";
import { FC } from "react";
import { toast } from "sonner";

const LogoutButton: FC<{ children: React.ReactNode }> = ({ children }) => {
    const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) return toast.error(data?.message || "Logout failed!");
      window.location.href = "/";
      toast.success(data?.message);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };
  return (
    <Button
      type="submit"
      className="bg-red-500 hover:bg-red-600 hover:translate-0"
      onClick={handleLogout}
    >
      {children}
    </Button>
  );
};

export default LogoutButton;
