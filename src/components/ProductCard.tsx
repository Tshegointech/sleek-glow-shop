import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onWhatsAppInquiry: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onWhatsAppInquiry }) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-lg smooth-transition">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 elegant-transition"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 smooth-transition" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 smooth-transition">
          <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Sale Badge */}
        {product.originalPrice && (
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
            SALE
          </Badge>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            FEATURED
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        {/* Category */}
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        
        {/* Product Name */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-accent fill-current'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        
        {/* Size */}
        <p className="text-sm text-muted-foreground mb-4">Size: {product.size}</p>
        
        {/* Actions */}
        <div className="flex flex-col space-y-2">
          <Button 
            variant="hero" 
            className="w-full"
            onClick={() => onWhatsAppInquiry(product)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.inStock ? 'Buy via WhatsApp' : 'Out of Stock'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;