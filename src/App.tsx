
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner'; // Usando sonner ya que está importado en el archivo original
import { AuthProvider } from './contexts/auth';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Renderiza AppRoutes DIRECTAMENTE aquí */}
        <AppRoutes />
        <Toaster />
      </Router>
    </AuthProvider>
  );
};

export default App;
