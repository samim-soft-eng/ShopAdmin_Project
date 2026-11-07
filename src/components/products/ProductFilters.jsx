import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import Button from '../common/Button';

const ProductFilters = ({
  searchQuery,
  onSearchChange,
  categories = [],
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalResults,
  onClearFilters,
}) => {
  const isFiltered =
    searchQuery.trim().length > 0 ||
    (selectedCategory && selectedCategory !== 'All Categories') ||
    sortBy !== 'default';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-card mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
        {/* Search input (5 cols) */}
        <div className="md:col-span-5 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search products by title, category, keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white rounded-xl outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Dropdown (3 cols) */}
        <div className="md:col-span-3">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white rounded-xl outline-none cursor-pointer appearance-none text-slate-800 font-medium"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Sorting Dropdown (3 cols) */}
        <div className="md:col-span-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white rounded-xl outline-none cursor-pointer appearance-none text-slate-800 font-medium"
            >
              <option value="default">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Clear Filters (1 col) */}
        <div className="md:col-span-1 flex justify-end">
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              icon={X}
              className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 w-full md:w-auto"
              title="Clear all filters"
            >
              <span className="md:hidden">Reset</span>
            </Button>
          )}
        </div>
      </div>

      {/* Meta Bar */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500">
        <div>
          Showing <span className="font-bold text-slate-800">{totalResults}</span> products
          {selectedCategory !== 'All Categories' && (
            <span> in <span className="font-semibold text-primary">{selectedCategory}</span></span>
          )}
          {searchQuery && (
            <span> matching &ldquo;<span className="italic">{searchQuery}</span>&rdquo;</span>
          )}
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-primary hover:underline font-semibold hidden sm:inline-block"
          >
            Clear active filters
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
