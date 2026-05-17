import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from "../ui/sidebar";
import { 
  DropdownMenu, 
  DropdownMenuTrigger,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { ChevronRight, LogoutIcon, NotificationIcon, UnfoldMoreIcon, UserIcon } from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { routes } from "@/app/router/routes";
import { NavLink } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { cn } from "@/shared/lib/utils";

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="gap-3 py-6">
              <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M13 20v-4h4.001v4H13zm-6 0v-4h4v4H7zm-6 0v-4h4v4H1zm12-6v-4h4v4h-4zm-6 0v-4h4v4H7zm-6 0v-4h4v4H1zm18-6V3.999h4V8h-4zm0 6v-4h4v4h-4zm-6-6V3.999h4.001V8H13zM7 8V3.999h4V8H7z" fill="var(--primary)"/></svg>
              <div className="flex flex-col text-left leading-tight">
                <span className="truncate font-semibold">Service Manager</span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </div>
              <div className="flex-1 flex justify-end">
                <HugeiconsIcon icon={UnfoldMoreIcon} />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Páginas</SidebarGroupLabel>
          <SidebarMenu>
            {routes.map((route) => 
              route.children ? (
                // ROTAS COM FILHAS
                <Collapsible 
                  key={route.path}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={route.label}>
                      <NavLink end={state === "expanded"} to={route.path} className='flex items-center gap-2'>
                        {({ isActive }) => (
                          <>
                            <HugeiconsIcon
                              icon={route.icon}
                              size={20}
                              {...(isActive ? { strokeWidth: 2.2, color: "var(--primary)"} : {})}
                            />
                            <span className={cn('truncate', isActive && 'font-bold text-primary')}>{route.label}</span>
                          </>
                        )}
                      </NavLink>
                      <CollapsibleTrigger asChild>
                        <button
                          type="button"
                          className="flex-1 flex items-center h-5 justify-end"
                        >
                          <HugeiconsIcon
                            icon={ChevronRight}
                            className="
                              transition-transform
                              group-data-[state=open]/collapsible:rotate-90
                            "
                          />
                        </button>
                      </CollapsibleTrigger>
                    </SidebarMenuButton>

                    <CollapsibleContent className={cn("text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2")}>
                      <SidebarMenuSub>
                        {route.children
                          .filter(child => !child.hidden)
                          .map(child => (
                            <SidebarMenuSubItem key={child.path}>
                              <SidebarMenuSubButton asChild>
                                <NavLink end to={`${route.path}/${child.path ?? ''}`}>
                                  {({ isActive }) => (
                                    <span className={cn("truncate", isActive && "font-bold text-primary")}>
                                      {child.label ?? "defina label"}
                                    </span>
                                  )}
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))
                        }
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>

              ) : (

                // ROTAS SEM FILHAS
                <SidebarMenuItem key={route.path}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={route.label}
                  >
                    <NavLink to={route.path}>
                      {({ isActive }) => (
                        <>
                          <HugeiconsIcon 
                            icon={route.icon} 
                            size={20} 
                            {...(isActive ? { strokeWidth: 2.2, color: "var(--primary)" } : {})}
                          />
                          <span className={cn('truncate', isActive && 'font-bold text-primary')}>
                              {route.label}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Ações</SidebarGroupLabel>

        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="gap-3">
                  <Avatar>
                    <AvatarFallback>GG</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="truncate font-semibold">Guilherme Gomes</span>
                    <span className="text-xs text-muted-foreground">admin@servicemanager.com</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end">

                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-2 text-left text-sm">
                      <Avatar>
                        <AvatarFallback>GG</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">Guilherme Gomes</span>
                        <span className="truncate text-xs">admin@servicemanager.com</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={UserIcon} />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={NotificationIcon} />
                    <span>Notificações</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    <HugeiconsIcon icon={LogoutIcon} />
                    <span>Sair da conta</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}