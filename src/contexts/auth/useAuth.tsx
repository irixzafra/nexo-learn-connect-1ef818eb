
// Este archivo redirige al contexto principal de autenticación
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export default useAuth;
