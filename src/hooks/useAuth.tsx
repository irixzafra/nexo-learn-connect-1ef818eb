
// Este archivo ya no se usa y causa conflictos con AuthContext.tsx
// Solo exportamos un hook vacío para evitar errores de importación
// en componentes que puedan estar usando este hook

import { useContext } from 'react';
import { useAuth as useRealAuth } from '@/contexts/AuthContext';

export const useAuth = useRealAuth;

export default useAuth;
