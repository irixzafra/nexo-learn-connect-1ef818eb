import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gets the initials from a full name (first letter of first name and first letter of last name)
 * @param fullName Full name to get initials from
 * @returns Initials as a string
 */
export function getInitials(fullName: string): string {
  if (!fullName || typeof fullName !== 'string') return '';
  
  // Split the name by spaces
  const parts = fullName.trim().split(/\s+/);
  
  // If there's only one part, return the first letter
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  // Otherwise, return the first letter of the first part and the first letter of the last part
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency
  }).format(amount);
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

// Delay execution for async operations (useful for simulating API calls)
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
