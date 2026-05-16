import { HugeiconsIcon } from "@hugeicons/react"
import { ChevronRight } from "@hugeicons/core-free-icons"
import { useLocation } from "react-router-dom"
import { routes } from "@/app/router/routes"
import { SidebarTrigger } from "../ui/sidebar"
import { Avatar } from "../ui/avatar"

export function AppHeader() {
  const location = useLocation();
  const current = routes.find((r) => r.path === location.pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 bg-background/80 px-4 backdrop-blur-md">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <span>Service Manager</span>
        <HugeiconsIcon icon={ChevronRight} size={14} />
        <span className="font-medium text-foreground">
          {current?.label ?? "Page"}
        </span>
      </nav>
      
      {/* Spacer */}
      <div className="flex-1"></div>

      <div className="relative hidden sm:block">
        <Avatar>
          
        </Avatar>
      </div>

    </header>
  )
}