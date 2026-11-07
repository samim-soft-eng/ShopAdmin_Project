import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Receipt,
  User,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Package,
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { formatINR } from '../utils/currency';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';

const OrderDetails = () => {
  const { id } = useParams();
  const { getOrderById } = useOrders();
  const navigate = useNavigate();

  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="py-12 animate-fadeIn">
        <EmptyState
          icon={Receipt}
          title="Order Not Found"
          description={`We could not locate any order records with ID "${id}".`}
          actionLabel="Back to Orders"
          onAction={() => navigate('/orders')}
          actionIcon={ArrowLeft}
        />
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Cancelled
          </span>
        );
      case 'Processing':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Processing
          </span>
        );
    }
  };

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(d);
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>

        {getStatusBadge(order.status)}
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Transaction Details
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              Order #{order.id}
            </h1>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-500">
            <span className="block font-medium">Placed on:</span>
            <span className="font-bold text-slate-800">{formatDate(order.createdAt)}</span>
          </div>
        </div>

        {/* Customer Information Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <User className="w-4 h-4 text-primary" />
            Customer & Delivery Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-slate-400 block">Recipient Name</span>
              <span className="font-bold text-slate-800">{order.customer?.fullName}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Contact Email</span>
              <span className="font-bold text-slate-800">{order.customer?.email}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Phone Number</span>
              <span className="font-bold text-slate-800">{order.customer?.phone}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">City & Pincode</span>
              <span className="font-bold text-slate-800">
                {order.customer?.city} – {order.customer?.pincode}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs text-slate-400 block">Delivery Address</span>
              <span className="font-bold text-slate-800">{order.customer?.address}</span>
            </div>
          </div>
        </div>

        {/* Ordered Items List */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-primary" />
            Purchased Items ({order.items?.length || 0})
          </h3>

          <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
            {order.items?.map((item, idx) => (
              <div
                key={idx}
                className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100';
                    }}
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Qty: {item.quantity} &times; {formatINR(item.price)}
                    </p>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900 text-sm shrink-0">
                  {formatINR((item.price || 0) * (item.quantity || 1))}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Order Subtotal</span>
            <span className="font-semibold text-slate-900">{formatINR(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-emerald-600">
            <span>Special Promotional Discount (10%)</span>
            <span className="font-bold">-{formatINR(order.discount)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>GST Tax (18% applied)</span>
            <span className="font-semibold text-slate-900">+{formatINR(order.tax)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Shipping</span>
            <span className="font-bold text-emerald-600 uppercase text-xs">FREE</span>
          </div>
          <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
            <span>Total Amount Paid</span>
            <span className="text-primary text-xl">{formatINR(order.finalTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
