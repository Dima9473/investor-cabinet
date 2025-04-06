export const formatCurrency = (units: string, nano: number, currency: string): string => {
  const total = Number(units) + nano / 1e9;
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total);
}; 
