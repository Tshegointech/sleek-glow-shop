import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import ProductQuickView from './ProductQuickView';
import LoadingSpinner, { ProductGridSkeleton } from './LoadingSpinner';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState('name');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Simulate loading for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.featured ? 1 : -1);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [selectedCategory, searchTerm, priceRange, sortBy]);


  const handleWhatsAppInquiry = (product: Product) => {
    const message = `Hi! I'm interested in purchasing the ${product.name} (${product.size}) for $${product.price}. Could you please provide more information?`;
    const phoneNumber = "+1234567890"; // Dummy number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp",
      description: "Opening WhatsApp with your product inquiry...",
    });
  };

  return (
    <section id="products" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent text-accent-foreground">OUR PRODUCTS</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Medical-Grade <span className="text-accent">Skincare</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our scientifically-formulated skincare products designed by 
            dermatologists for exceptional results and skin health.
          </p>
        </div>

        {/* Advanced Search & Filter */}
        <ProductSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-muted-foreground">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                <span>Loading products...</span>
              </div>
            ) : (
              <span>
                Showing {filteredAndSortedProducts.length} of {products.length} products
                {searchTerm && ` for "${searchTerm}"`}
              </span>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  product={product}
                  onWhatsAppInquiry={handleWhatsAppInquiry}
                  onQuickView={() => setQuickViewProduct(product)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse our featured products instead.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setPriceRange([0, 200]);
                setSortBy('name');
              }}
              variant="outline"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Not Sure Which Product Is Right for You?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Get personalized recommendations from our skincare experts
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90 hover-scale">
                Get Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onWhatsAppInquiry={handleWhatsAppInquiry}
      />
    </section>
  );
};

export default Products;