import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { FALLBACK_PRODUCT_IMAGE } from '../../services/productService';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const itemSubtotal = (Number(item.price) || 0) * (Number(item.quantity) || 1);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200 gap-4">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
          <img
            src={item.image || FALLBACK_PRODUCT_IMAGE}
            alt={item.name}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.src = FALLBACK_PRODUCT_IMAGE;
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 mb-1">
            {item.category}
          </span>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
            {item.name}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Unit Price: <span className="font-semibold text-slate-700">{formatINR(item.price)}</span>
          </p>
        </div>
      </div>

      {/* Quantity Controls & Subtotal */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Stepper */}
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shadow-xs">
          <button
            type="button"
            disabled={item.quantity <= 1}
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <span className="px-3.5 py-1 text-xs sm:text-sm font-bold text-slate-900 select-none min-w-[2.5rem] text-center bg-white">
            {item.quantity}
          </span>

          <button
            type="button"
            disabled={item.stock && item.quantity >= item.stock}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Subtotal */}
        <div className="text-right min-w-[90px]">
          <span className="block text-[10px] uppercase font-bold text-slate-400">
            Subtotal
          </span>
          <span className="text-sm sm:text-base font-extrabold text-slate-900">
            {formatINR(itemSubtotal)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
