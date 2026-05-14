import { HugeiconsIcon } from "@hugeicons/react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Separator } from "../ui/separator"
import { ChevronRight, PanelLeftCloseIcon, PanelRightCloseIcon } from "@hugeicons/core-free-icons"
import { useLocation } from "react-router-dom"
import { routes } from "@/app/router/routes"



type AppHeaderProps = {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function AppHeader({ collapsed, onToggle }: AppHeaderProps) {
  const location = useLocation();
  const current = routes.find((r) => r.path === location.pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="text-slate-500 hover:text-slate-800"
      >
        {collapsed ? (
          <HugeiconsIcon icon={PanelRightCloseIcon} size={18} />
        ) : (
          <HugeiconsIcon icon={PanelLeftCloseIcon} size={18} />
        )}
      </Button>

      <Separator orientation="vertical" className="h-5" />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-slate-500">
        <span>Service Manager</span>
        <HugeiconsIcon icon={ChevronRight} size={14} />
        <span className="font-medium text-slate-800">
          {current?.label ?? "Page"}
        </span>
      </nav>
      
      {/* Spacer */}
      <div className="flex-1"></div>

      <div className="relative hidden sm:block">

      </div>

    </header>
  )
}