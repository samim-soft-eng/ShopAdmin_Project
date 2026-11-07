import React from 'react';
import {
  ShoppingCart,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Activity,
  Clock,
} from 'lucide-react';
import EmptyState from '../common/EmptyState';

const RecentActivity = ({ activities = [] }) => {
  const getActivityIcon = (type, status) => {
    switch (type) {
      case 'CART_ADD':
        return {
          icon: ShoppingCart,
          color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        };
      case 'CART_REMOVE':
        return {
          icon: Trash2,
          color: 'bg-rose-50 text-rose-600 border-rose-100',
        };
      case 'CART_QUANTITY':
        return {
          icon: RefreshCw,
          color: 'bg-amber-50 text-amber-600 border-amber-100',
        };
      case 'ORDER_PLACED':
        return {
          icon: CheckCircle2,
          color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        };
      default:
        return {
          icon: Activity,
          color: 'bg-slate-50 text-slate-600 border-slate-100',
        };
    }
  };

  const formatTimestamp = (isoString) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return 'Recently';
    }
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Recent Activity Timeline
        </h3>
        <EmptyState
          icon={Activity}
          title="No Recent Activities"
          description="Actions such as adding products to cart, updating quantities, and placing orders will be tracked here in real-time."
          className="border-0 shadow-none p-4"
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Recent Activity Timeline
        </h3>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
          Live Sync
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 flex-1 overflow-y-auto max-h-[420px] pr-1">
        {activities.map((act) => {
          const { icon: Icon, color } = getActivityIcon(act.type, act.status);
          return (
            <div key={act.id} className="relative flex items-start group">
              {/* Dot / Icon */}
              <div
                className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center border shadow-xs ${color} transition-transform group-hover:scale-110`}
              >
                <Icon className="w-3 h-3" />
              </div>

              {/* Content */}
              <div className="ml-3 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  {act.description}
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimestamp(act.timestamp)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
