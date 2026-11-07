import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Navigation,
  Lock,
  Package,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { validateCheckoutForm } from '../utils/validation';
import { formatINR } from '../utils/currency';
import { FALLBACK_PRODUCT_IMAGE } from '../services/productService';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const Checkout = () => {
  const { user } = useAuth();
  const { cart, totals } = useCart();
  const { placeOrder } = useOrders();
  const { error: toastError } = useToast();
  const navigate = useNavigate();

  // Controlled form state initialized with user info if available
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone?.replace(/\D/g, '').slice(-10) || '',
    address: '14, Palm Avenue, Tech Park Road',
    city: 'Bengaluru',
    pincode: '560100',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // If cart is empty and no confirmed order is showing, warn user
  if (cart.length === 0 && !confirmedOrder) {
    return (
      <div className="py-12 max-w-lg mx-auto text-center bg-white p-8 rounded-3xl border border-slate-200/80 shadow-card animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Checkout Unavailable</h2>
        <p className="text-sm text-slate-500 mb-6">
          Your shopping cart is currently empty. Add products to your cart before proceeding to checkout.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate('/products')}
          icon={ArrowLeft}
          className="w-full"
        >
          Return to Products
        </Button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (cart.length === 0) {
      toastError('Your cart is empty. Please add items before checking out.');
      return;
    }

    const { errors: validationErrors, isValid } = validateCheckoutForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      toastError('Please correct the highlighted form errors.');
      return;
    }

    setIsSubmitting(true);

    // Simulate standard payment processing and confirmation
    setTimeout(() => {
      const created = placeOrder(formData);
      setIsSubmitting(false);

      if (created) {
        setConfirmedOrder(created);
      }
    }, 600);
  };

  const displayItems = confirmedOrder ? confirmedOrder.items : cart;
  const displayTotals = confirmedOrder
    ? {
        subtotal: confirmedOrder.subtotal,
        discount: confirmedOrder.discount,
        tax: confirmedOrder.tax,
        finalTotal: confirmedOrder.finalTotal,
        totalQuantity: confirmedOrder.items?.reduce((a, c) => a + (Number(c.quantity) || 1), 0) || 0,
      }
    : totals;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Back to Cart"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Checkout & Payment
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1 pl-7">
            Provide recipient delivery details to finalize and confirm your order.
          </p>
        </div>

        <Link
          to="/cart"
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          <span>Back to Cart</span>
        </Link>
      </div>

      {/* Two Column Layout: Form (7 cols) + Order Summary (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Customer Information Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-6"
            noValidate
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Customer & Shipping Details
              </h3>
              <span className="text-xs text-slate-400">* All fields required</span>
            </div>

            <div className="space-y-4">
              <Input
                label="Full Name"
                name="fullName"
                placeholder="e.g. Vikram Malhotra"
                icon={User}
                value={formData.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="vikram@example.com"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  icon={Phone}
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  required
                />
              </div>

              <Input
                label="Street Delivery Address"
                name="address"
                placeholder="Building, street name, apartment or suite number"
                icon={MapPin}
                value={formData.address}
                onChange={handleInputChange}
                error={errors.address}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="City"
                  name="city"
                  placeholder="e.g. Bengaluru"
                  icon={Building}
                  value={formData.city}
                  onChange={handleInputChange}
                  error={errors.city}
                  required
                />

                <Input
                  label="Pincode (6 digits)"
                  name="pincode"
                  placeholder="e.g. 560038"
                  icon={Navigation}
                  value={formData.pincode}
                  onChange={handleInputChange}
                  error={errors.pincode}
                  required
                />
              </div>
            </div>

            {/* Payment Method Selector (Simulation) */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Payment Option
              </h4>
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      ShopAdmin Instant Direct Checkout (Demo)
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Zero payment gateway fees &bull; Instant order confirmation
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-white px-2.5 py-1 rounded-lg border border-indigo-100">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Secure</span>
                </div>
              </div>
            </div>

            {/* Submit Place Order Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                disabled={isSubmitting || cart.length === 0}
                icon={CheckCircle2}
                iconPosition="right"
                className="w-full shadow-lg shadow-primary/25"
              >
                {isSubmitting ? 'Confirming Order...' : `Place Order – ${formatINR(totals.finalTotal)}`}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Orders persist in local storage across browser refreshes</span>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Order Items Breakdown & Totals (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Order Items ({displayItems.length})
              </h3>
              <span className="text-xs text-slate-400">
                {displayTotals.totalQuantity} total qty
              </span>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1 mb-4">
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image || FALLBACK_PRODUCT_IMAGE}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-100 shrink-0"
                      onError={(e) => {
                        e.target.src = FALLBACK_PRODUCT_IMAGE;
                      }}
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        Qty: <strong className="text-slate-700">{item.quantity}</strong> &times; {formatINR(item.price)}
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 shrink-0">
                    {formatINR((item.price || 0) * (item.quantity || 1))}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">
                  {formatINR(displayTotals.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>10% Instant Discount</span>
                <span className="font-bold">-{formatINR(displayTotals.discount)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>18% GST Tax</span>
                <span className="font-semibold text-slate-900">
                  +{formatINR(displayTotals.tax)}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Standard Delivery</span>
                <span className="font-bold text-emerald-600 uppercase text-xs">
                  FREE
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
                <span className="text-base font-bold text-slate-900">Total Payable</span>
                <span className="text-2xl font-black text-primary">
                  {formatINR(displayTotals.finalTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Success Modal */}
      <Modal
        isOpen={Boolean(confirmedOrder)}
        onClose={() => navigate('/orders')}
        title="Order Placed Successfully! 🎉"
        subtitle={`Order Reference: ${confirmedOrder?.id}`}
        maxWidth="max-w-xl"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/orders')}
            >
              View Order in Orders List &rarr;
            </Button>
          </div>
        }
      >
        {confirmedOrder && (
          <div className="space-y-5 text-sm">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Thank you for your purchase, {confirmedOrder.customer?.fullName}!</p>
                <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
                  Your order has been recorded with status <strong>Processing</strong>. A confirmation has been logged to the Recent Activities timeline.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID</span>
                <span className="font-bold text-slate-900">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Recipient Email</span>
                <span className="font-semibold text-slate-800">{confirmedOrder.customer?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Delivery Address</span>
                <span className="font-semibold text-slate-800 text-right">
                  {confirmedOrder.customer?.address}, {confirmedOrder.customer?.city} ({confirmedOrder.customer?.pincode})
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-900">Total Charged</span>
                <span className="font-extrabold text-primary text-base">
                  {formatINR(confirmedOrder.finalTotal)}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Checkout;
