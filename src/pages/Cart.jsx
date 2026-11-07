import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';

const Cart = () => {
  const {
    cart,
    totals,
    updateQuantity,
    removeFromCart,
    clearCart,
    uniqueItemCount,
  } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-10 animate-fadeIn">
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          description="Looks like you haven't added any products to your shopping cart yet. Browse our curated catalog of products and discover premium items."
          actionLabel="Continue Shopping"
          onAction={() => navigate('/products')}
          actionIcon={ArrowLeft}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shopping Cart
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-primary-light text-primary rounded-full">
              {totals.totalQuantity} {totals.totalQuantity === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Review your selected products, adjust quantities, and proceed to checkout.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCart}
            icon={Trash2}
            className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          >
            Clear All Items
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/products')}
            icon={ArrowLeft}
          >
            Continue Shopping
          </Button>
        </div>
      </div>

      {/* Two Column Layout: Cart Items (8 cols) + Order Summary (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}

          {/* Quick Notice Banner */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between text-xs text-slate-600">
            <span>
              💡 <strong>Tip:</strong> An automatic 10% instant discount is calculated on your order subtotal.
            </span>
            <Link to="/products" className="font-bold text-primary hover:underline shrink-0 ml-2">
              Add more items
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4">
          <CartSummary
            totals={totals}
            itemCount={uniqueItemCount}
            onCheckout={() => navigate('/checkout')}
            checkoutButtonLabel="Proceed to Checkout"
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
