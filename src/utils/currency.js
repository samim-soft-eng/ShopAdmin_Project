/**
 * Formats a number into Indian Rupee (INR - ₹) currency format
 * Example: ₹2,500.00
 */
export const formatINR = (amount) => {
  const numericAmount = typeof amount === 'number' ? amount : Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
};
