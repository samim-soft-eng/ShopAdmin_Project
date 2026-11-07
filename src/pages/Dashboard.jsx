import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  IndianRupee,
  Receipt,
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { formatINR } from '../utils/currency';
import StatCard from '../components/dashboard/StatCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import RecentOrders from '../components/dashboard/RecentOrders';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

const Dashboard = () => {
  const { user } = useAuth();
  const { products } = useProducts();
  const { cart, totals } = useCart();
  const { orders, activities } = useOrders();
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Formatted date string for header
  const todayFormatted = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome & Quick Actions Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-40 w-60 h-60 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-primary-light" />
              <span>{todayFormatted}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Hello, {user?.name || 'Administrator'}! 👋
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Welcome to your live e-commerce operations hub. All inventory, shopping cart metrics, and customer transactions are synchronized in real time.
            </p>
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/products')}
              icon={Package}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40"
            >
              Browse Products
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/cart')}
              icon={ShoppingCart}
              className="shadow-lg shadow-primary/30"
            >
              View Cart ({totals.totalQuantity})
            </Button>
          </div>
        </div>
      </div>

      {/* 4 Premium Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Products"
          value={products.length}
          icon={Package}
          colorScheme="indigo"
          subtitle="Available in catalog"
          trend="+12% active"
          onClick={() => navigate('/products')}
        />

        <StatCard
          title="Cart Items"
          value={totals.totalQuantity}
          icon={ShoppingCart}
          colorScheme="blue"
          subtitle={`${totals.itemCount} distinct products`}
          trend={totals.totalQuantity > 0 ? 'Active' : 'Empty'}
          onClick={() => navigate('/cart')}
        />

        <StatCard
          title="Total Cart Value"
          value={formatINR(totals.finalTotal)}
          icon={IndianRupee}
          colorScheme="emerald"
          subtitle="Incl. 18% GST & 10% disc"
          trend="Live calculation"
          onClick={() => navigate('/cart')}
        />

        <StatCard
          title="Total Orders"
          value={orders.length}
          icon={Receipt}
          colorScheme="amber"
          subtitle="Confirmed transactions"
          trend="Tracked"
          onClick={() => navigate('/orders')}
        />
      </div>

      {/* Dashboard Main Split: Recent Orders (8 cols) + Recent Activity (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Orders (8 cols) */}
        <div className="lg:col-span-8">
          <RecentOrders
            orders={orders}
            onViewOrder={(order) => setSelectedOrder(order)}
          />
        </div>

        {/* Right Column: Recent Activity Timeline (4 cols) */}
        <div className="lg:col-span-4">
          <RecentActivity activities={activities} />
        </div>
      </div>

      {/* Order Details Modal when clicked from Recent Orders */}
      <Modal
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        title={`Order Details – ${selectedOrder?.id}`}
        subtitle={`Placed on ${
          selectedOrder?.createdAt
            ? new Date(selectedOrder.createdAt).toLocaleString('en-IN')
            : 'Recent'
        }`}
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-slate-500">
              Status:{' '}
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
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Customer & Delivery Information
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">Full Name</span>
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
                  <span className="text-slate-400 block text-xs">Delivery City</span>
                  <span className="font-semibold text-slate-800">
                    {selectedOrder.customer?.city} ({selectedOrder.customer?.pincode})
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-xs">Address</span>
                  <span className="font-semibold text-slate-800">
                    {selectedOrder.customer?.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Ordered Products Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Items In Order ({selectedOrder.items?.length || 0})
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
                <span>Discount (10%)</span>
                <span className="font-semibold">
                  -{formatINR(selectedOrder.discount)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST Tax (18%)</span>
                <span className="font-semibold text-slate-900">
                  +{formatINR(selectedOrder.tax)}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Final Total Paid</span>
                <span className="text-primary">
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

export default Dashboard;
