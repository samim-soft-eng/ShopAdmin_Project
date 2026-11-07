import React from 'react';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from '../common/Loader';
import EmptyState from '../common/EmptyState';
import { SearchX, RotateCcw } from 'lucide-react';

const ProductGrid = ({
  products = [],
  loading = false,
  error = null,
  onRetry,
  onClearFilters,
}) => {
  if (loading) {
    return <ProductGridSkeleton count={8} />;
  }

  if (error) {
    return (
      <EmptyState
        icon={RotateCcw}
        title="Failed to Load Products"
        description={error}
        actionLabel="Retry Loading"
        onAction={onRetry}
        actionIcon={RotateCcw}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No products found"
        description="We couldn't find any products matching your search criteria or active filters. Try adjusting your search query or reset your filters."
        actionLabel="Clear Filters"
        onAction={onClearFilters}
        actionIcon={RotateCcw}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
