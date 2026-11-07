import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '../utils/localStorage';
import { validateEmail, validatePassword } from '../utils/validation';

const AuthContext = createContext(null);

const DEFAULT_DEMO_USER = {
  name: 'Alex Morgan',
  email: 'admin@shopadmin.com',
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
   * Demo authentication: checks email format and password length >= 6
   */
  const login = (email, password, rememberMe = true) => {
    const emailError = validateEmail(email);
    if (emailError) {
      return { success: false, error: emailError };
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return { success: false, error: passwordError };
    }

    // Generate user profile dynamically based on email
    const namePart = email.split('@')[0];
    const formattedName = namePart
      .split(/[._-]/)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ') || 'Admin User';

    const authenticatedUser = {
      ...DEFAULT_DEMO_USER,
      name: email === 'admin@shopadmin.com' ? 'Alex Morgan' : formattedName,
      email: email.trim().toLowerCase(),
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
