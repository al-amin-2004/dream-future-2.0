import AdminHeader from "../_components/shared/AdminHeader";
import AdminSidebar from "../_components/shared/AdminSidebar";
import { UserProvider } from "@/providers/UserContext";
import { SidebarProvider } from "@/providers/SidebarContext";
import { AllUsersProvider } from "@/providers/AllUsersContext";
import { AllRequestsProvider } from "@/providers/AllRequestsContext";
import { AllAccountsProvider } from "@/providers/AllAccountsContext";
import { AllTransactionsProvider } from "@/providers/AllTransactionsContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AllUsersProvider>
      <AllAccountsProvider>
        <AllRequestsProvider>
          <AllTransactionsProvider>
            <SidebarProvider>
              <main
                className="flex h-screen overflow-hidden"
                aria-hidden={false}
              >
                <AdminSidebar />

                <UserProvider>
                  <div className="flex-1 overflow-y-scroll">
                    <AdminHeader />
                    <section className="px-6 md:px-14">{children}</section>
                  </div>
                </UserProvider>
              </main>
            </SidebarProvider>
          </AllTransactionsProvider>
        </AllRequestsProvider>
      </AllAccountsProvider>
    </AllUsersProvider>
  );
}
