
import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRoutes />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
