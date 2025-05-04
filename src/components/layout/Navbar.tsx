
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Check, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="flex items-center h-16 px-4">
        <SidebarTrigger />
        <div className="flex-1 px-4 flex justify-between">
          <div className="hidden md:block relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search establishments, inspections..."
              className="pl-8 w-full bg-background"
            />
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <NotificationsDropdown />
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-96 overflow-y-auto">
          <NotificationItem 
            title="New inspection assigned"
            description="You have been assigned to inspect Green Leaf Cafe"
            time="Just now"
            isNew
          />
          <NotificationItem 
            title="Follow-up required"
            description="City Sweets & Bakery needs a follow-up inspection"
            time="2 hours ago"
            isNew
          />
          <NotificationItem 
            title="Report approval"
            description="Your inspection report for Royal Spice has been approved"
            time="Yesterday"
            isNew
          />
          <NotificationItem 
            title="System maintenance"
            description="The system will be under maintenance on Sunday 2 AM-4 AM"
            time="2 days ago"
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button variant="ghost" className="w-full justify-center" size="sm">
            Mark all as read
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
  isNew?: boolean;
}

function NotificationItem({ title, description, time, isNew }: NotificationItemProps) {
  return (
    <div className={`p-3 ${isNew ? 'bg-accent/50' : ''} hover:bg-muted/50 cursor-pointer`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
          <div className="text-xs text-muted-foreground mt-1">{time}</div>
        </div>
        {isNew && (
          <div className="h-2 w-2 rounded-full bg-blue-600" />
        )}
      </div>
    </div>
  );
}

function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-8 rounded-full border">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Inspector" />
            <AvatarFallback>IS</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Inspector Sharma</p>
            <p className="text-xs text-muted-foreground">sharma.inspector@fssai.gov.in</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
