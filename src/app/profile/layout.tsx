import { ReactNode } from "react";
import { SidebarProvider } from "@/providers/SidebarContext";
import ProfileHeader from "../_components/shared/ProfileHeader";
import { UserProvider } from "@/providers/UserContext";
import { AccountProvider } from "@/providers/AccountContext";
import ProfileSidebar from "../_components/shared/ProfileSidebar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <AccountProvider>
        <SidebarProvider>
          <main className="flex h-screen overflow-hidden" aria-hidden={false}>
            <ProfileSidebar />

            <div className="flex-1 overflow-y-scroll">
              <ProfileHeader />
              <section className="px-6 md:px-14">{children}</section>
            </div>
          </main>
        </SidebarProvider>
      </AccountProvider>
    </UserProvider>
  );
}
