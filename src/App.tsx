
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner'; // Usando sonner ya que está importado en el archivo original
import { AuthProvider } from './contexts/auth';
import { LanguageProvider } from './contexts/LanguageContext'; // Importamos LanguageProvider
import { TooltipProvider } from '@/components/ui/tooltip'; // Importamos TooltipProvider

const App: React.FC = () => {
  return (
    <AuthProvider> {/* AuthProvider es el más externo */}
      <Router>
        <TooltipProvider> {/* Añadimos TooltipProvider */}
          <LanguageProvider> {/* LanguageProvider envuelve AppRoutes */}
            <AppRoutes />
            <Toaster />
          </LanguageProvider>
        </TooltipProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
