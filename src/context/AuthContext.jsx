import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '../utils/localStorage';
import { validateEmail, validatePassword } from '../utils/validation';

const AuthContext = createContext(null);

export const DEMO_CREDENTIALS = {
  email: 'samim@gmail.com',
  password: '123456',
};

const DEFAULT_DEMO_USER = {
  name: 'Alex Morgan',
  email: DEMO_CREDENTIALS.email,
  role: 'Store Administrator',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  phone: '+91 98765 43210',
  location: 'Bengaluru, Karnataka, India',
  joinedDate: 'January 2024',
  company: 'ShopAdmin Global Logistics',
  status: 'Active',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return getStorageItem(STORAGE_KEYS.AUTH, null);
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(getStorageItem(STORAGE_KEYS.AUTH, null));
  });

  useEffect(() => {
    if (user) {
      setStorageItem(STORAGE_KEYS.AUTH, user);
      setIsAuthenticated(true);
    } else {
      removeStorageItem(STORAGE_KEYS.AUTH);
      setIsAuthenticated(false);
    }
  }, [user]);

  /**
   * Demo authentication: validates format, then checks authorized demo credentials
   */
  const login = (email, password, rememberMe = true) => {
    // 1. Format validation
    const emailError = validateEmail(email);
    if (emailError) {
      return { success: false, error: emailError, field: 'email' };
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return { success: false, error: passwordError, field: 'password' };
    }

    // 2. Verify against authorized demo credentials
    const trimmedEmail = (email || '').trim().toLowerCase();
    if (trimmedEmail !== DEMO_CREDENTIALS.email || password !== DEMO_CREDENTIALS.password) {
      return { success: false, error: 'Invalid email or password', field: 'general' };
    }

    const authenticatedUser = {
      ...DEFAULT_DEMO_USER,
    };

    setUser(authenticatedUser);
    setIsAuthenticated(true);
    setStorageItem(STORAGE_KEYS.AUTH, authenticatedUser);

    return { success: true, user: authenticatedUser };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    removeStorageItem(STORAGE_KEYS.AUTH);
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedData };
      setStorageItem(STORAGE_KEYS.AUTH, merged);
      return merged;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
