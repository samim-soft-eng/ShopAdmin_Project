import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  PackageOpen,
  Share2,
} from 'lucide-react';
import { fetchProductById, FALLBACK_PRODUCT_IMAGE } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatINR } from '../utils/currency';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { PageLoader } from '../components/common/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInCart, addToCart } = useCart();
  const { info } = useToast();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadDetails = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const data = await fetchProductById(id);
        if (isMounted) {
          if (data) {
            setProduct(data);
            setSelectedImage(data.image || FALLBACK_PRODUCT_IMAGE);
          } else {
            setNotFound(true);
          }
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadDetails();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <PageLoader message="Loading product specifications..." />;
  }

  if (notFound || !product) {
    return (
      <div className="py-12 animate-fadeIn">
        <EmptyState
          icon={PackageOpen}
          title="Product Not Found"
          description={`We could not locate any product matching ID "${id}". It may have been removed or the link might be broken.`}
          actionLabel="Back to Products"
          onAction={() => navigate('/products')}
          actionIcon={ArrowLeft}
        />
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const isOutOfStock = typeof product.stock === 'number' && product.stock <= 0;
  const thumbnails = product.thumbnails && product.thumbnails.length > 0
    ? product.thumbnails
    : [product.image || FALLBACK_PRODUCT_IMAGE];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      info('Product link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Breadcrumb & Navigation Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
          <span>/</span>
          <span className="text-slate-400">{product.category}</span>
          <span>/</span>
          <span className="text-slate-800 font-medium truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title="Share Product"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Two-Column Product Presentation */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Large Image & Thumbnail Selector (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Large Image Frame */}
            <div className="relative aspect-4/3 w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-xs flex items-center justify-center">
              <img
                src={selectedImage || product.image || FALLBACK_PRODUCT_IMAGE}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                onError={(e) => {
                  e.target.src = FALLBACK_PRODUCT_IMAGE;
                }}
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-white/95 backdrop-blur-md text-slate-900 shadow-sm border border-slate-100">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery (if multiple) */}
            {thumbnails.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {thumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(thumb)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === thumb
                        ? 'border-primary ring-2 ring-primary/20 scale-102'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = FALLBACK_PRODUCT_IMAGE;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Details & Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Rating and Stock badges */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-extrabold text-amber-800">
                    {Number(product.rating || 4.5).toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Verified Customer Reviews
                </span>
              </div>

              {isOutOfStock ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                  Out of Stock
                </span>
              ) : product.stock <= 5 ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
                  Hurry, only {product.stock} units left!
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  In Stock ({product.stock} units ready)
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-baseline justify-between">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Retail Selling Price
                </span>
                <span className="text-3xl font-black text-slate-900 tracking-tight text-primary">
                  {formatINR(product.price)}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                10% Instant Discount Eligible
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Product Description
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions: Add to Cart and Back to Products */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  size="lg"
                  variant={inCart ? 'secondary' : isOutOfStock ? 'secondary' : 'primary'}
                  disabled={inCart || isOutOfStock}
                  onClick={() => addToCart(product)}
                  icon={inCart ? Check : ShoppingCart}
                  className={`w-full sm:flex-1 shadow-md ${
                    inCart
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 opacity-90 cursor-default'
                      : isOutOfStock
                      ? 'opacity-50 cursor-not-allowed'
                      : 'shadow-primary/25'
                  }`}
                >
                  {inCart ? 'Already in Cart' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/products')}
                  className="w-full sm:w-auto"
                >
                  Back to Products
                </Button>
              </div>

              {inCart && (
                <div className="text-center sm:text-left">
                  <Link
                    to="/cart"
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Go to Cart to modify quantities &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Quality & Delivery Assurance Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <span>Express 2-Day Delivery</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1-Year Official Brand Warranty</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <RotateCcw className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>7-Day Return & Replacement</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Genuine Certified Goods</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
