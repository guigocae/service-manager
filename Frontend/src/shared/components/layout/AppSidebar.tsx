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
  SidebarMenuSubItem
} from "../ui/sidebar";
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons";
import { Avatar } from "../ui/avatar";
import { routes } from "@/app/router/routes";
import { NavLink } from "react-router-dom";

export function AppSidebar() {
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
            {routes.map((route) => (
              <SidebarMenuItem key={route.path}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={route.label}
                >
                  <NavLink to={route.path}>
                    <HugeiconsIcon 
                      icon={route.icon} 
                      size={20} 
                    />

                    <span>{route.label}</span>
                  </NavLink>
                </SidebarMenuButton>

                {route.children && (
                  <SidebarMenuSub>
                    {route.children
                      .filter((child) => !child.hidden)
                      .map((child) => (
                        <SidebarMenuSubItem key={child.path}>
                          <SidebarMenuSubButton asChild>
                            <NavLink to={`${route.path}/${child.path}`}>
                              <span>{child.label ?? "defina label"}</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}

              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Ações</SidebarGroupLabel>

        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="gap-3">
              <Avatar>

              </Avatar>
              <div className="flex flex-col text-left leading-tight">
                <span className="truncate font-semibold">Guilherme</span>
                <span className="text-xs text-muted-foreground">admin@servicemanager.com</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}