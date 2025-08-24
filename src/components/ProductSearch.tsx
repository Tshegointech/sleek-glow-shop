import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Serums', 'Moisturizers', 'Cleansers', 'Treatments'];
  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
  ];

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('All');
    onPriceRangeChange([0, 200]);
    onSortChange('name');
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategory !== 'All' ? selectedCategory : null,
    priceRange[0] > 0 || priceRange[1] < 200 ? 'price' : null,
    sortBy !== 'name' ? sortBy : null,
  ].filter(Boolean).length;

  return (
    <div className="bg-background/80 backdrop-blur-lg border border-border rounded-2xl p-6 mb-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 bg-background/50 border-border/50 focus:border-accent smooth-transition"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => onSearchChange('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Quick Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 4).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className="rounded-full smooth-transition hover-scale"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Advanced Filters */}
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-6 bg-background/95 backdrop-blur-md">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Advanced Filters</h3>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                )}
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Price Range</label>
                <Slider
                  value={priceRange}
                  onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                  max={200}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Sort Options */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Sort By</label>
                <div className="grid grid-cols-1 gap-2">
                  {sortOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={sortBy === option.value ? "default" : "ghost"}
                      size="sm"
                      onClick={() => onSortChange(option.value)}
                      className="justify-start"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchTerm}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => onSearchChange('')}
              />
            </Badge>
          )}
          {selectedCategory !== 'All' && (
            <Badge variant="secondary" className="gap-1">
              Category: {selectedCategory}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => onCategoryChange('All')}
              />
            </Badge>
          )}
          {(priceRange[0] > 0 || priceRange[1] < 200) && (
            <Badge variant="secondary" className="gap-1">
              Price: ${priceRange[0]} - ${priceRange[1]}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => onPriceRangeChange([0, 200])}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;