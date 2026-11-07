/**
 * Cart and order calculation utilities
 */

export const calculateCartTotals = (cartItems = []) => {
  // Subtotal = Sum of (price * quantity)
  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return acc + price * qty;
  }, 0);

  // Total quantity of items in cart
  const totalQuantity = cartItems.reduce((acc, item) => {
    return acc + (Number(item.quantity) || 1);
  }, 0);

  // Discount = Fixed 10% discount on subtotal
  const discountRate = 0.10;
  const discount = subtotal * discountRate;

  // Taxable amount = Subtotal - Discount
  const taxableAmount = Math.max(0, subtotal - discount);

  // Tax = 18% GST applied after discount
  const taxRate = 0.18;
  const tax = taxableAmount * taxRate;

  // Final Total = Subtotal - Discount + Tax
  const finalTotal = subtotal - discount + tax;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    finalTotal: Math.round(finalTotal * 100) / 100,
    totalQuantity,
    itemCount: cartItems.length,
    discountPercentage: 10,
    taxPercentage: 18,
  };
};
