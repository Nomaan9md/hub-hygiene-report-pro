
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, Clipboard, FileSearch, Home, Settings, Utensils } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/",
    },
    {
      title: "Inspections",
      icon: Clipboard,
      url: "/inspections",
    },
    {
      title: "Establishments",
      icon: Utensils,
      url: "/establishments",
    },
    {
      title: "Reports",
      icon: FileSearch,
      url: "/reports",
    },
    {
      title: "Schedule",
      icon: Calendar,
      url: "/schedule",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar menuItems={menuItems} currentPath={location.pathname} />
        <main className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 p-6 md:p-8 overflow-y-auto animate-in">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

interface AppSidebarProps {
  menuItems: { title: string; icon: any; url: string }[];
  currentPath: string;
}

function AppSidebar({ menuItems, currentPath }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center p-4 h-[64px]">
        <div className="font-bold text-lg">FSSAI Inspector Hub</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild active={currentPath === item.url}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
