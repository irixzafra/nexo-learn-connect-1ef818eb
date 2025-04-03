
import { supabase } from '@/lib/supabase';

// Interfaces para los tipos de componentes
export interface UIComponent {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  usage: string;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
  is_system: boolean;
}

export interface NavigationComponent {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  usage: string;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface OrphanPage {
  id: string;
  title: string;
  path: string;
  last_accessed: string;
  access_count: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Funciones para obtener componentes UI
export const getUIComponents = async (): Promise<UIComponent[]> => {
  const { data, error } = await supabase
    .from('ui_components')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching UI components:', error);
    throw error;
  }

  return data || [];
};

// Función para obtener un componente UI por ID
export const getUIComponentById = async (id: string): Promise<UIComponent | null> => {
  const { data, error } = await supabase
    .from('ui_components')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching UI component:', error);
    return null;
  }

  return data;
};

// Funciones para obtener componentes de navegación
export const getNavigationComponents = async (): Promise<NavigationComponent[]> => {
  const { data, error } = await supabase
    .from('navigation_components')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching navigation components:', error);
    throw error;
  }

  return data || [];
};

// Función para obtener un componente de navegación por ID
export const getNavigationComponentById = async (id: string): Promise<NavigationComponent | null> => {
  const { data, error } = await supabase
    .from('navigation_components')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching navigation component:', error);
    return null;
  }

  return data;
};

// Funciones para obtener páginas huérfanas
export const getOrphanPages = async (): Promise<OrphanPage[]> => {
  const { data, error } = await supabase
    .from('orphan_pages')
    .select('*')
    .order('title');

  if (error) {
    console.error('Error fetching orphan pages:', error);
    throw error;
  }

  return data || [];
};

// Función para obtener una página huérfana por ID
export const getOrphanPageById = async (id: string): Promise<OrphanPage | null> => {
  const { data, error } = await supabase
    .from('orphan_pages')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching orphan page:', error);
    return null;
  }

  return data;
};

// Funciones para obtener páginas del sitio (usando la tabla existente)
export const getSitePages = async (): Promise<any[]> => {
  const { data, error } = await supabase
    .from('site_pages')
    .select('*')
    .order('title');

  if (error) {
    console.error('Error fetching site pages:', error);
    throw error;
  }

  return data || [];
};

// Función para obtener una página del sitio por ID
export const getSitePageById = async (id: string): Promise<any | null> => {
  const { data, error } = await supabase
    .from('site_pages')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching site page:', error);
    return null;
  }

  return data;
};
