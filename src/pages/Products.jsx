import React from 'react';
import { Package, RotateCcw } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import Button from '../components/common/Button';

const Products = () => {
  const {
    products,
    filteredProducts,
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    clearFilters,
    loadProducts,
  } = useProducts();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Products
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-primary-light text-primary rounded-full">
              {products.length} Items Total
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Browse, search, and manage products across multi-tier retail categories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={loadProducts}
            icon={RotateCcw}
            loading={loading}
            title="Refresh Catalog"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalResults={filteredProducts.length}
        onClearFilters={clearFilters}
      />

      {/* Product Cards Grid */}
      <ProductGrid
        products={filteredProducts}
        loading={loading}
        error={error}
        onRetry={loadProducts}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

export default Products;
