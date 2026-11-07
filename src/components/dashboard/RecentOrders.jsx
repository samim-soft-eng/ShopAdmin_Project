import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Receipt, Eye, ArrowRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { formatINR } from '../../utils/currency';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';

const RecentOrders = ({ orders = [], onViewOrder }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            Cancelled
          </span>
        );
      case 'Processing':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
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
        month: 'short',
        year: 'numeric',
      }).format(d);
    } catch {
      return 'Recent';
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-4 h-4 text-primary" />
            Recent Customer Orders
          </h3>
        </div>
        <EmptyState
          icon={Receipt}
          title="No Orders Placed Yet"
          description="When orders are placed through checkout, they will appear here with full customer and order breakdown details."
          actionLabel="Browse Products"
          onAction={() => navigate('/products')}
          className="border-0 shadow-none p-4"
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-4 h-4 text-primary" />
            Recent Customer Orders
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Latest purchase transactions and fulfillment status
          </p>
        </div>

        <Link
          to="/orders"
          className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 group"
        >
          <span>View All Orders</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/70 rounded-lg">
            <tr>
              <th className="px-4 py-3 rounded-l-lg">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Total Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right rounded-r-lg">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.slice(0, 5).map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50/60 transition-colors duration-150"
              >
                <td className="px-4 py-3.5 font-bold text-slate-900">
                  {order.id}
                </td>
                <td className="px-4 py-3.5">
                  <div className="font-semibold text-slate-800">
                    {order.customer?.fullName || 'Guest Customer'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {order.customer?.city || 'India'}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-500">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-4 py-3.5 font-bold text-slate-900">
                  {formatINR(order.finalTotal)}
                </td>
                <td className="px-4 py-3.5">{getStatusBadge(order.status)}</td>
                <td className="px-4 py-3.5 text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={Eye}
                    onClick={() => {
                      if (onViewOrder) onViewOrder(order);
                      else navigate('/orders');
                    }}
                    className="text-xs hover:text-primary"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
