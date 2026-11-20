const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatPrice(value: number): string {
  return currencyFormatter.format(value);
}

export function formatInstallment(price: number, installments = 10): string {
  const installmentValue = price / installments;
  return `ou ${installments}x de ${formatPrice(installmentValue)} sem juros`;
}

export function calculateDiscountPercentage(
  price: number,
  oldPrice?: number,
): number | null {
  if (!oldPrice || oldPrice <= price) {
    return null;
  }
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
