
import React, { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar/use-sidebar";
import DashboardNavigation from "./navigation/DashboardNavigation";
import CursosNavigation from "./navigation/CursosNavigation";
import CalendarNavigation from "./navigation/CalendarNavigation";
import MessagesNavigation from "./navigation/MessagesNavigation";
import SettingsNavigation from "./navigation/SettingsNavigation";
import AdminNavigation from "./navigation/AdminNavigation";
import PaymentsNavigation from "./navigation/PaymentsNavigation";
import { useAuth } from "@/contexts/AuthContext";

export function SidebarContent() {
  const { state } = useSidebar();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const isInstructor = user?.role === "instructor";

  // State for opened groups
  const [openGroups, setOpenGroups] = useState({
    dashboard: true,
    courses: false,
    calendar: false,
    messages: false,
    payments: false,
    settings: false,
    admin: false,
  });

  const toggleGroup = (group: keyof typeof openGroups) => {
    if (state === "expanded") {
      setOpenGroups((prev) => ({
        ...prev,
        [group]: !prev[group],
      }));
    }
  };

  return (
    <div className="flex flex-col gap-2 py-2 h-full">
      <DashboardNavigation
        isOpen={openGroups.dashboard}
        onToggle={() => toggleGroup("dashboard")}
      />
      
      <CursosNavigation
        isOpen={openGroups.courses}
        onToggle={() => toggleGroup("courses")}
      />
      
      <CalendarNavigation
        isOpen={openGroups.calendar}
        onToggle={() => toggleGroup("calendar")}
      />
      
      <MessagesNavigation
        isOpen={openGroups.messages}
        onToggle={() => toggleGroup("messages")}
      />
      
      <PaymentsNavigation
        isOpen={openGroups.payments}
        onToggle={() => toggleGroup("payments")}
      />

      <SettingsNavigation
        isOpen={openGroups.settings}
        onToggle={() => toggleGroup("settings")}
      />
      
      {(isAdmin || isInstructor) && (
        <AdminNavigation
          isOpen={openGroups.admin}
          onToggle={() => toggleGroup("admin")}
        />
      )}
    </div>
  );
}
