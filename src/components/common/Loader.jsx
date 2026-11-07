import React from 'react';
import { Loader2 } from 'lucide-react';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };
  return (
    <Loader2
      className={`animate-spin text-primary ${sizeMap[size] || sizeMap.md} ${className}`}
    />
  );
};

export const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full py-12">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-card animate-pulse flex flex-col h-full">
      <div className="w-full h-48 bg-slate-200 rounded-xl mb-4" />
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 bg-slate-200 rounded-full w-20" />
        <div className="h-4 bg-slate-200 rounded-full w-12" />
      </div>
      <div className="h-5 bg-slate-200 rounded-md w-3/4 mb-2" />
      <div className="h-4 bg-slate-200 rounded-md w-full mb-4" />
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="h-6 bg-slate-200 rounded-md w-24" />
        <div className="h-9 bg-slate-200 rounded-lg w-28" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const TableSkeleton = ({ rows = 5, cols = 6 }) => {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse">
      <div className="h-12 bg-slate-100 border-b border-slate-200" />
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="flex items-center px-6 py-4 border-b border-slate-100 gap-4"
        >
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className={`h-4 bg-slate-200 rounded ${c === 0 ? 'w-24' : 'flex-1'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Spinner;
