
import { supabase } from '@/lib/supabase';
import { SitePage, PageRevision, PageStatus, PageLayout } from '@/types/pages';

// Get all pages (admin)
export const getAllPages = async (): Promise<SitePage[]> => {
  const { data, error } = await supabase
    .from('site_pages')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }

  return data || [];
};

// Get published pages (public)
export const getPublishedPages = async (): Promise<SitePage[]> => {
  const { data, error } = await supabase
    .from('site_pages')
    .select('*')
    .eq('status', 'published')
    .order('title');

  if (error) {
    console.error('Error fetching published pages:', error);
    throw error;
  }

  return data || [];
};

// Get a single page by slug
export const getPageBySlug = async (slug: string): Promise<SitePage | null> => {
  const { data, error } = await supabase
    .from('site_pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // Code for no rows returned
      return null;
    }
    console.error('Error fetching page by slug:', error);
    throw error;
  }

  return data;
};

// Get a page by ID
export const getPageById = async (id: string): Promise<SitePage | null> => {
  const { data, error } = await supabase
    .from('site_pages')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching page by ID:', error);
    throw error;
  }

  return data;
};

// Create a new page
export const createPage = async (page: Omit<SitePage, 'id' | 'created_at' | 'updated_at'>): Promise<SitePage> => {
  const { data, error } = await supabase
    .from('site_pages')
    .insert([page])
    .select()
    .single();

  if (error) {
    console.error('Error creating page:', error);
    throw error;
  }

  return data;
};

// Update an existing page
export const updatePage = async (id: string, updates: Partial<SitePage>): Promise<SitePage> => {
  const { data, error } = await supabase
    .from('site_pages')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating page:', error);
    throw error;
  }

  return data;
};

// Delete a page
export const deletePage = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('site_pages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting page:', error);
    throw error;
  }
};

// Add a page revision
export const createPageRevision = async (revision: Omit<PageRevision, 'id' | 'created_at'>): Promise<PageRevision> => {
  const { data, error } = await supabase
    .from('site_page_revisions')
    .insert([revision])
    .select()
    .single();

  if (error) {
    console.error('Error creating page revision:', error);
    throw error;
  }

  return data;
};

// Get revisions for a page
export const getPageRevisions = async (pageId: string): Promise<PageRevision[]> => {
  const { data, error } = await supabase
    .from('site_page_revisions')
    .select('*')
    .eq('page_id', pageId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching page revisions:', error);
    throw error;
  }

  return data || [];
};

// Update page status
export const updatePageStatus = async (id: string, status: PageStatus): Promise<SitePage> => {
  return updatePage(id, { status });
};

// Verify if a slug is unique
export const isSlugUnique = async (slug: string, excludeId?: string): Promise<boolean> => {
  let query = supabase
    .from('site_pages')
    .select('id')
    .eq('slug', slug);
    
  if (excludeId) {
    query = query.neq('id', excludeId);
  }
    
  const { data, error } = await query;

  if (error) {
    console.error('Error checking slug uniqueness:', error);
    throw error;
  }

  return (data || []).length === 0;
};
