
import { format } from 'date-fns';

// Format price with currency
export const formatPrice = (price: number, currency: string) => {
  const symbol = currency === 'eur' ? '€' : currency === 'usd' ? '$' : currency;
  return `${symbol}${price.toFixed(2)}`;
};

// Format date
export const formatDate = (date: string) => {
  try {
    return format(new Date(date), 'dd/MM/yyyy');
  } catch (error) {
    return 'Fecha inválida';
  }
};
