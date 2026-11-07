import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  colorScheme = 'indigo', // 'indigo' | 'emerald' | 'amber' | 'blue'
  subtitle,
  onClick,
}) => {
  const schemeStyles = {
    indigo: {
      bg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      badge: 'bg-indigo-50 text-indigo-700',
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      badge: 'bg-emerald-50 text-emerald-700',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-600 border-amber-100',
      badge: 'bg-amber-50 text-amber-700',
    },
    blue: {
      bg: 'bg-blue-50 text-blue-600 border-blue-100',
      badge: 'bg-blue-50 text-blue-700',
    },
  };

  const scheme = schemeStyles[colorScheme] || schemeStyles.indigo;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center border ${scheme.bg}`}
        >
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>

      <div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          {value}
        </h3>

        <div className="flex items-center justify-between mt-2">
          {subtitle && (
            <span className="text-xs text-slate-400 font-medium">{subtitle}</span>
          )}

          {trend && (
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${scheme.badge}`}
            >
              <ArrowUpRight className="w-3 h-3" />
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
