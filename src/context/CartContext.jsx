import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/localStorage';
import { calculateCartTotals } from '../utils/calculations';
import { recordActivity, ACTIVITY_TYPES } from '../utils/activity';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { success, warning, info } = useToast();

  const [cart, setCart] = useState(() => {
    const saved = getStorageItem(STORAGE_KEYS.CART, []);
    return Array.isArray(saved) ? saved : [];
  });

  // Sync with localStorage
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CART, cart);
  }, [cart]);

  // Derived totals
  const totals = useMemo(() => {
    return calculateCartTotals(cart);
  }, [cart]);

  const isInCart = useCallback(
    (productId) => {
      const id = Number(productId);
      return Array.isArray(cart) && cart.some((item) => item.id === id);
    },
    [cart]
  );

  const addToCart = useCallback(
    (product) => {
      if (!product) return false;
      const productId = Number(product.id);

      if (typeof product.stock === 'number' && product.stock <= 0) {
        warning(`"${product.name}" is currently out of stock.`);
        return false;
      }

      if (isInCart(productId)) {
        warning(`"${product.name}" is already in your cart.`);
        return false;
      }

      const newItem = {
        id: productId,
        name: product.name,
        category: product.category,
        price: Number(product.price) || 0,
        rating: product.rating,
        stock: product.stock,
        image: product.image,
        quantity: 1,
      };

      setCart((prev) => [...prev, newItem]);
      recordActivity(ACTIVITY_TYPES.CART_ADD, `Added "${product.name}" to cart`, 'success');
      success(`Added "${product.name}" to cart.`);
      return true;
    },
    [isInCart, success, warning]
  );

  const updateQuantity = useCallback(
    (productId, newQuantity) => {
      const id = Number(productId);
      const targetQty = Number(newQuantity);

      if (targetQty < 1) {
        warning('Item quantity cannot be less than 1.');
        return;
      }

      setCart((prev) => {
        const item = prev.find((i) => i.id === id);
        if (!item) return prev;

        if (item.stock && targetQty > item.stock) {
          warning(`Only ${item.stock} units available in stock.`);
          return prev;
        }

        const updated = prev.map((i) => (i.id === id ? { ...i, quantity: targetQty } : i));
        recordActivity(
          ACTIVITY_TYPES.CART_QUANTITY,
          `Updated quantity for "${item.name}" to ${targetQty}`,
          'info'
        );
        info(`Updated "${item.name}" quantity to ${targetQty}.`);
        return updated;
      });
    },
    [info, warning]
  );

  const removeFromCart = useCallback(
    (productId) => {
      const id = Number(productId);
      setCart((prev) => {
        const item = prev.find((i) => i.id === id);
        if (item) {
          recordActivity(ACTIVITY_TYPES.CART_REMOVE, `Removed "${item.name}" from cart`, 'warning');
          warning(`Removed "${item.name}" from cart.`);
        }
        return prev.filter((i) => i.id !== id);
      });
    },
    [warning]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        totals,
        isInCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount: totals.totalQuantity,
        uniqueItemCount: totals.itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
