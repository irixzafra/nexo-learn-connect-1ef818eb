
import React from 'react';
import { AdminMenuItem } from './presets/types';
import {
  adminMainMenuItems,
  adminSecurityMenuItems,
  adminEducationMenuItems,
  adminContentMenuItems,
  adminFinanceMenuItems,
  adminDataMenuItems,
  adminConfigMenuItems,
  adminAlertMenuItems,
  adminMobileMenuItems
} from './presets';

// Re-exportar todos los elementos para mantener compatibilidad con código existente
export {
  adminMainMenuItems,
  adminSecurityMenuItems,
  adminEducationMenuItems,
  adminContentMenuItems,
  adminFinanceMenuItems,
  adminDataMenuItems,
  adminConfigMenuItems,
  adminAlertMenuItems,
  adminMobileMenuItems
};

// Re-exportar el tipo AdminMenuItem para compatibilidad con código existente
export type { AdminMenuItem };
