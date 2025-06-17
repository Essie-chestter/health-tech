
import { Calendar, Users, Bell, MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationDropdownProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function NavigationDropdown({ activeTab, setActiveTab }: NavigationDropdownProps) {
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Calendar },
    { id: "patients", label: "Patients", icon: Users },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "reminders", label: "Reminders", icon: Bell },
    { id: "notifications", label: "Settings", icon: MessageSquare },
  ];

  const activeItem = navigationItems.find(item => item.id === activeTab);
  const ActiveIcon = activeItem?.icon || Calendar;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ActiveIcon className="h-4 w-4" />
          {activeItem?.label || "Navigation"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 ${
                activeTab === item.id ? "bg-accent" : ""
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
