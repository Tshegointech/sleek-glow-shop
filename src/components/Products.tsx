import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from './ProductCard';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();

  const categories = ['All', 'Serums', 'Moisturizers', 'Cleansers'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);


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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "hero" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Products Banner */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter(p => p.featured).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onWhatsAppInquiry={handleWhatsAppInquiry}
              />
            ))}
          </div>
        </div>

        {/* All Products */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onWhatsAppInquiry={handleWhatsAppInquiry}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Not Sure Which Product Is Right for You?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Get personalized recommendations from our skincare experts
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
              Get Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;