import { AppHeader } from "@/shared/components/layout/AppHeader";
import { AppSidebar } from "@/shared/components/layout/AppSidebar";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="h-screen w-full flex">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <main className="overflow-auto flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}