import { UserProvider } from "@/providers/UserContext";
import AdminHeader from "../_components/shared/AdminHeader";
import Sidebar from "../_components/shared/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserProvider>
        <AdminHeader />

        <main className="flex">
          <Sidebar />
          <div className="px-6 md:px-14 container">{children}</div>
        </main>
      </UserProvider>
    </>
  );
}
