import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Check, Eye } from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { FALLBACK_PRODUCT_IMAGE } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isInCart, addToCart } = useCart();

  const inCart = isInCart(product.id);

  const getStockBadge = (stock) => {
    if (stock <= 5) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
          Only {stock} left
        </span>
      );
    }
    if (stock <= 15) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
          Low Stock ({stock})
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
        In Stock ({stock})
      </span>
    );
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-slate-300 transition-all duration-200 flex flex-col h-full overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-slate-50 overflow-hidden">
        <img
          src={product.image || FALLBACK_PRODUCT_IMAGE}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = FALLBACK_PRODUCT_IMAGE;
          }}
          loading="lazy"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/95 backdrop-blur-md text-slate-800 shadow-sm border border-slate-100">
            {product.category}
          </span>
        </div>

        {/* Quick View Floating Action */}
        <button
          type="button"
          onClick={() => navigate(`/products/${product.id}`)}
          className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-600 hover:text-primary hover:bg-white shadow-sm border border-slate-100 transition-all opacity-0 group-hover:opacity-100 duration-200"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Stock Row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-800">
                {product.rating ? Number(product.rating).toFixed(1) : '4.5'}
              </span>
            </div>
            {getStockBadge(product.stock || 20)}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => navigate(`/products/${product.id}`)}
            className="font-bold text-sm sm:text-base text-slate-900 line-clamp-2 hover:text-primary cursor-pointer transition-colors leading-snug mb-2"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price and Cart Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Price
            </span>
            <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {formatINR(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant={inCart ? 'secondary' : 'primary'}
              disabled={inCart}
              onClick={() => addToCart(product)}
              icon={inCart ? Check : ShoppingCart}
              className={inCart ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 opacity-90 cursor-default' : ''}
            >
              {inCart ? 'Already in Cart' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
