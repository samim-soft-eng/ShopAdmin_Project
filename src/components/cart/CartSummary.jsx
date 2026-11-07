import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Tag, Percent, Truck } from 'lucide-react';
import { formatINR } from '../../utils/currency';
import Button from '../common/Button';

const CartSummary = ({
  totals,
  itemCount,
  onCheckout,
  disabled = false,
  showCheckoutButton = true,
  checkoutButtonLabel = 'Proceed to Checkout',
}) => {
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-card sticky top-24">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <h3 className="text-base font-bold text-slate-900">Order Summary</h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {totals.totalQuantity} {totals.totalQuantity === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Line Item Calculations */}
      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Cart Subtotal</span>
          <span className="font-semibold text-slate-900">
            {formatINR(totals.subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between text-emerald-600">
          <span className="flex items-center gap-1.5 font-medium">
            <Tag className="w-3.5 h-3.5" />
            Special Discount ({totals.discountPercentage}%)
          </span>
          <span className="font-bold">-{formatINR(totals.discount)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            GST Tax ({totals.taxPercentage}% applied)
          </span>
          <span className="font-semibold text-slate-900">
            +{formatINR(totals.tax)}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-slate-400" />
            Express Shipping
          </span>
          <span className="font-bold text-emerald-600 uppercase tracking-wider text-[11px]">
            FREE
          </span>
        </div>
      </div>

      {/* Final Total Box */}
      <div className="pt-4 mt-4 border-t border-slate-100">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-base font-bold text-slate-900">Final Total</span>
          <span className="text-2xl font-black text-slate-900 tracking-tight text-primary">
            {formatINR(totals.finalTotal)}
          </span>
        </div>
        <p className="text-[11px] text-slate-400">
          Includes all applicable taxes and 10% seasonal discount savings.
        </p>
      </div>

      {/* Checkout Action Button */}
      {showCheckoutButton && (
        <div className="mt-6">
          <Button
            size="lg"
            variant="primary"
            disabled={disabled || itemCount === 0}
            onClick={handleCheckoutClick}
            icon={ArrowRight}
            iconPosition="right"
            className="w-full shadow-md shadow-primary/25"
          >
            {checkoutButtonLabel}
          </Button>
        </div>
      )}

      {/* Trust & Guarantee Badges */}
      <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>100% Encrypted & Safe Checkout Flow</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Percent className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>Automatic promotional pricing applied at checkout</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
