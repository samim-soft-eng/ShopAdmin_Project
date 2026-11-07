import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  User,
  LogOut,
  ChevronDown,
  ShoppingCart,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { useToast } from '../../context/ToastContext';

const Header = ({ onOpenMobileMenu }) => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { searchQuery, setSearchQuery } = useProducts();
  const { info } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Derive current page title dynamically
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard Overview';
    if (path === '/products') return 'Product Catalog';
    if (path.startsWith('/products/')) return 'Product Details';
    if (path === '/cart') return 'Shopping Cart';
    if (path === '/checkout') return 'Order Checkout';
    if (path === '/orders') return 'Order History';
    if (path === '/profile') return 'Admin Profile';
    return 'ShopAdmin';
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/products') {
      navigate('/products');
    }
  };

  const handleLogout = () => {
    logout();
    info('Logged out successfully.');
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {getPageTitle()}
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
            ShopAdmin Enterprise System
          </p>
        </div>
      </div>

      {/* Middle: Global Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="hidden md:flex items-center flex-1 max-w-md mx-6"
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search products by title, category, or keyword..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (location.pathname !== '/products' && e.target.value.trim().length > 0) {
                navigate('/products');
              }
            }}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-primary rounded-xl outline-none transition-all duration-150 text-slate-900 placeholder:text-slate-400 shadow-inner"
          />
        </div>
      </form>

      {/* Right: Notifications, Cart shortcut & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Cart Quick Shortcut */}
        <Link
          to="/cart"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="View Cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Notifications Popover */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => setNotificationOpen((prev) => !prev)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
          </button>

          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-dropdown border border-slate-200 py-3 z-50 animate-fadeIn">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Notifications
                </span>
                <span className="text-[11px] text-primary font-medium cursor-pointer">
                  Mark all as read
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 transition-colors flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      System Synchronized
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Product catalog and inventory synced successfully.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Just now</span>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors flex items-start gap-3">
                  <Bell className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Welcome to ShopAdmin!
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Browse products and test the dynamic cart checkout flow.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setUserDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100';
              }}
            />
            <div className="text-left hidden md:block">
              <span className="block text-xs font-bold text-slate-800 leading-tight">
                {user?.name || 'Alex Morgan'}
              </span>
              <span className="block text-[10px] text-slate-400 font-medium leading-tight">
                {user?.role || 'Store Administrator'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-dropdown border border-slate-200 py-2 z-50 animate-fadeIn">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>

              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Admin Profile</span>
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  <span>Orders Management</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-danger hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-danger" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
