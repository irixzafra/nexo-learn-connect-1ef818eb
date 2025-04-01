
import React from "react";
import AppRouter from "./routes/AppRouter";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/layout/sidebar/SidebarProvider";
import EditModeControls from "@/components/admin/EditModeControls";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary>
        <ThemeProvider>
          <SidebarProvider>
            <AppRouter />
            <EditModeControls />
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
