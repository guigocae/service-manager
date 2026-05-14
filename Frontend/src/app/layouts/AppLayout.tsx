import { AppHeader } from "@/shared/components/layout/AppHeader";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </div>
  )
}