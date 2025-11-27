export const formatCNPJ = (value: string): string => {
  return value
    .replace(/\D/g, '') // Remove all non-digits
    .replace(/^(\d{2})(\d)/, '$1.$2') // Add dot after first 2 digits
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Add dot after next 3 digits
    .replace(/\.(\d{3})(\d)/, '.$1/$2') // Add slash after next 3 digits
    .replace(/(\d{4})(\d)/, '$1-$2') // Add dash after next 4 digits
    .substring(0, 18); // Limit to 18 characters
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};