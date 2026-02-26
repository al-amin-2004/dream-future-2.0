import { ReactNode } from "react";
import Sidebar from "../_components/shared/ProfileSidebar";
import { SidebarProvider } from "@/providers/SidebarContext";
import Header from "../_components/shared/ProfileHeader";
import { UserProvider } from "@/providers/UserContext";
import { AccountProvider } from "@/providers/AccountContext";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <main className="flex h-screen overflow-hidden" aria-hidden={false}>
        <Sidebar />

        <UserProvider>
          <AccountProvider>
            <div className="flex-1 overflow-y-scroll">
              <Header />
              <section className="px-6 md:px-14">{children}</section>
            </div>
          </AccountProvider>
        </UserProvider>
      </main>
    </SidebarProvider>
  );
}
