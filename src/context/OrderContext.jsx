import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/localStorage';
import { getActivities, recordActivity, ACTIVITY_TYPES } from '../utils/activity';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';
import { formatINR } from '../utils/currency';

const OrderContext = createContext(null);

// Initial sample orders so the dashboard and orders screen look alive if brand new,
// but users can create new orders or clear them.
const INITIAL_DEMO_ORDERS = [
  {
    id: 'ORD-78241',
    customer: {
      fullName: 'Vikram Malhotra',
      email: 'vikram.m@example.com',
      phone: '9876543210',
      address: '42, Indiranagar 100ft Road',
      city: 'Bengaluru',
      pincode: '560038',
    },
    items: [
      {
        id: 1,
        name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        category: 'Electronics',
        price: 29990,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
      },
      {
        id: 16,
        name: 'Fossil Minimalist Chronograph Brown Leather Watch',
        category: 'Accessories',
        price: 11995,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&auto=format&fit=crop&q=80',
      },
    ],
    subtotal: 41985,
    discount: 4198.5,
    tax: 6801.57,
    finalTotal: 44588.07,
    status: 'Processing',
    createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
  },
  {
    id: 'ORD-65192',
    customer: {
      fullName: 'Priya Sharma',
      email: 'priya.s@example.com',
      phone: '9812345678',
      address: 'Penthouse 12B, Powai Heights',
      city: 'Mumbai',
      pincode: '400076',
    },
    items: [
      {
        id: 7,
        name: 'Women Pure Mulberry Silk Trench Coat',
        category: 'Fashion',
        price: 18500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=80',
      },
    ],
    subtotal: 18500,
    discount: 1850,
    tax: 2997,
    finalTotal: 19647,
    status: 'Completed',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

export const OrderProvider = ({ children }) => {
  const { cart, totals, clearCart } = useCart();
  const { success, error } = useToast();

  const [orders, setOrders] = useState(() => {
    const saved = getStorageItem(STORAGE_KEYS.ORDERS, INITIAL_DEMO_ORDERS);
    return Array.isArray(saved) ? saved : INITIAL_DEMO_ORDERS;
  });

  const [activities, setActivities] = useState(() => {
    const saved = getActivities();
    return Array.isArray(saved) ? saved : [];
  });

  // Persist orders
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.ORDERS, orders);
  }, [orders]);

  // Listen for activity updates across the app
  useEffect(() => {
    const handleActivityUpdate = () => {
      setActivities(getActivities());
    };

    window.addEventListener('shopadmin_activity_updated', handleActivityUpdate);
    return () => {
      window.removeEventListener('shopadmin_activity_updated', handleActivityUpdate);
    };
  }, []);

  const placeOrder = useCallback(
    (customerData) => {
      if (!cart || cart.length === 0) {
        error('Cannot place order with an empty cart.');
        return null;
      }

      // Generate unique professional Order ID
      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const orderId = `ORD-${randomSuffix}`;

      const newOrder = {
        id: orderId,
        customer: { ...customerData },
        items: [...cart],
        subtotal: totals.subtotal,
        discount: totals.discount,
        tax: totals.tax,
        finalTotal: totals.finalTotal,
        status: 'Processing',
        createdAt: new Date().toISOString(),
      };

      // Add to orders list
      setOrders((prev) => [newOrder, ...prev]);

      // Record in activity log
      recordActivity(
        ACTIVITY_TYPES.ORDER_PLACED,
        `Order #${orderId} placed by ${customerData.fullName} (${formatINR(totals.finalTotal)})`,
        'success'
      );

      // Clear the cart
      clearCart();

      success(`Order #${orderId} placed successfully!`);
      return newOrder;
    },
    [cart, totals, clearCart, success, error]
  );

  const getOrderById = useCallback(
    (id) => {
      return orders.find((o) => o.id === id) || null;
    },
    [orders]
  );

  return (
    <OrderContext.Provider
      value={{
        orders,
        activities,
        totalOrdersCount: orders.length,
        placeOrder,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
