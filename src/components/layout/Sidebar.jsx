import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Receipt,
  User,
  LogOut,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { DEMO_CREDENTIALS, useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../../context/ToastContext';

const Sidebar = ({ onItemClick }) => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { totalOrdersCount } = useOrders();
  const { info } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    info('You have been logged out.');
    navigate('/login');
    if (onItemClick) onItemClick();
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Products',
      path: '/products',
      icon: Package,
    },
    {
      name: 'Cart',
      path: '/cart',
      icon: ShoppingCart,
      badge: cartCount > 0 ? cartCount : null,
      badgeColor: 'bg-primary text-white',
    },
    {
      name: 'Orders',
      path: '/orders',
      icon: Receipt,
      badge: totalOrdersCount > 0 ? totalOrdersCount : null,
      badgeColor: 'bg-slate-200 text-slate-700',
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full select-none">
      {/* Brand Logo Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
        <NavLink
          to="/dashboard"
          onClick={onItemClick}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-200">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                Shop<span className="text-primary">Admin</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary-light text-primary rounded-md">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Store Management</p>
          </div>
        </NavLink>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Main Menu
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onItemClick}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm shadow-primary/30 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge !== null && item.badge !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold transition-transform ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Pro Badge Promo Box */}
      <div className="px-4 py-3 mx-3 mb-4 rounded-xl bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 border border-indigo-100/80">
        <div className="flex items-center gap-2 text-primary font-bold text-xs mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ShopAdmin Engine</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed mb-2">
          Sync real-time products, orders and dynamic cart totals with zero latency.
        </p>
      </div>

      {/* User Section & Logout */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/40">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'}
              alt={user?.name || 'User'}
              className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100';
              }}
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">
                {user?.name || 'Admin User'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.email || DEMO_CREDENTIALS.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 rounded-lg text-slate-400 hover:text-danger hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
