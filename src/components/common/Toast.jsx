import React from 'react';
import { useToast } from '../../context/ToastContext';

export { useToast };

const Toast = ({ message, type = 'info', onClose }) => {
  return (
    <div className={`p-4 rounded-xl shadow-lg border text-sm font-medium ${
      type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
      type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' :
      type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
      'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        {onClose && (
          <button onClick={onClose} className="ml-2 text-xs font-bold text-slate-400 hover:text-slate-600">
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
