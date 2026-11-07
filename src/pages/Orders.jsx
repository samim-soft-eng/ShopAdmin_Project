import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Receipt,
  Eye,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowLeft,
  Calendar,
  User,
  MapPin,
  Package,
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { formatINR } from '../utils/currency';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';

const Orders = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

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
        hour: '2-digit',
        minute: '2-digit',
      }).format(d);
    } catch {
      return 'Recently';
    }
  };

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (order.customer?.fullName || '').toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (order.customer?.email || '').toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (order.customer?.city || '').toLowerCase().includes(searchQuery.toLowerCase().trim());

      const matchesStatus =
        statusFilter === 'All' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  if (orders.length === 0) {
    return (
      <div className="py-12 animate-fadeIn">
        <EmptyState
          icon={Receipt}
          title="No orders found"
          description="You haven't placed any orders yet. Add items to your cart and complete checkout to review transaction history."
          actionLabel="Continue Shopping"
          onAction={() => navigate('/products')}
          actionIcon={ArrowLeft}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Order History
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-primary-light text-primary rounded-full">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Recorded
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Review and track previously placed transactions and fulfillment statuses.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/products')}
          icon={ArrowLeft}
        >
          Browse More Products
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by Order ID, customer, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white rounded-xl outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white rounded-xl outline-none font-medium cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Order Date</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Order Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-400 text-sm">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/70 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">
                        {order.customer?.fullName || 'Valued Customer'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {order.customer?.city || 'India'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">
                      {formatINR(order.finalTotal)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={Eye}
                        onClick={() => setSelectedOrder(order)}
                        className="text-xs hover:bg-primary-light hover:text-primary"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Order Details Modal */}
      <Modal
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        title={`Order Details – ${selectedOrder?.id}`}
        subtitle={`Placed on ${
          selectedOrder?.createdAt ? formatDate(selectedOrder.createdAt) : ''
        }`}
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-slate-500">
              Current Status:{' '}
              <strong className="text-primary font-bold">
                {selectedOrder?.status || 'Processing'}
              </strong>
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </Button>
          </div>
        }
      >
        {selectedOrder && (
          <div className="space-y-6 text-sm">
            {/* Customer Details Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-primary" />
                Customer & Shipping Information
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">Customer Name</span>
                  <span className="font-semibold text-slate-800">
                    {selectedOrder.customer?.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Email</span>
                  <span className="font-semibold text-slate-800">
                    {selectedOrder.customer?.email}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Phone</span>
                  <span className="font-semibold text-slate-800">
                    {selectedOrder.customer?.phone}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">City & Pin</span>
                  <span className="font-semibold text-slate-800">
                    {selectedOrder.customer?.city} ({selectedOrder.customer?.pincode})
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-xs">Full Address</span>
                  <span className="font-semibold text-slate-800">
                    {selectedOrder.customer?.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Ordered Products Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-primary" />
                Ordered Products ({selectedOrder.items?.length || 0})
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                {selectedOrder.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100';
                        }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          Qty: {item.quantity} &times; {formatINR(item.price)}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm shrink-0">
                      {formatINR((item.price || 0) * (item.quantity || 1))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Breakdown */}
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">
                  {formatINR(selectedOrder.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>10% Discount</span>
                <span className="font-semibold">
                  -{formatINR(selectedOrder.discount)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>18% GST</span>
                <span className="font-semibold text-slate-900">
                  +{formatINR(selectedOrder.tax)}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Final Total Amount</span>
                <span className="text-primary font-black">
                  {formatINR(selectedOrder.finalTotal)}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
