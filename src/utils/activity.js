import { getStorageItem, setStorageItem, STORAGE_KEYS } from './localStorage';

export const ACTIVITY_TYPES = {
  CART_ADD: 'CART_ADD',
  CART_REMOVE: 'CART_REMOVE',
  CART_QUANTITY: 'CART_QUANTITY',
  ORDER_PLACED: 'ORDER_PLACED',
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
};

export const getActivities = () => {
  const result = getStorageItem(STORAGE_KEYS.ACTIVITIES, null);
  if (Array.isArray(result)) return result;
  return [
    {
      id: 'act-init-1',
      type: 'SYSTEM',
      description: 'ShopAdmin platform initialized and ready.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'info',
    },
  ];
};

export const recordActivity = (type, description, status = 'info') => {
  try {
    const current = getActivities();
    const newActivity = {
      id: 'act-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      type,
      description,
      timestamp: new Date().toISOString(),
      status, // 'success' | 'warning' | 'info' | 'danger'
    };

    // Keep the most recent 30 activities
    const updated = [newActivity, ...current].slice(0, 30);
    setStorageItem(STORAGE_KEYS.ACTIVITIES, updated);

    // Notify listeners across components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('shopadmin_activity_updated', { detail: newActivity }));
    }

    return newActivity;
  } catch (err) {
    console.error('Failed to record activity:', err);
    return null;
  }
};
