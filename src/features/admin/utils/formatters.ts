
import { format } from 'date-fns';

// Format price with currency
export const formatPrice = (price: number, currency: string) => {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${price.toFixed(2)}`;
};

// Get currency symbol
export const getCurrencySymbol = (currency: string) => {
  const lowerCaseCurrency = currency.toLowerCase();
  return lowerCaseCurrency === 'eur' ? '€' : 
         lowerCaseCurrency === 'usd' ? '$' : 
         currency;
};

// Format date
export const formatDate = (date: string | null | undefined) => {
  if (!date) return 'Fecha no disponible';
  
  try {
    return format(new Date(date), 'dd/MM/yyyy');
  } catch (error) {
    return 'Fecha inválida';
  }
};

// Format course status
export const formatStatus = (status: string) => {
  return status === 'published' ? 'Publicado' : 'Borrador';
};

// Format student count with pluralization
export const formatStudentCount = (count: number) => {
  return count === 1 ? '1 estudiante' : `${count} estudiantes`;
};
