import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Eye, Heart, Share2 } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  onWhatsAppInquiry: (product: Product) => void;
  onQuickView?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onWhatsAppInquiry, onQuickView }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard.",
      });
    }
  };

  return (
    <div 
      className="group bg-card rounded-2xl overflow-hidden elegant-shadow hover:shadow-2xl smooth-transition border border-border/50 hover-scale"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 smooth-transition"
        />
        
        {/* Hover Actions */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {onQuickView && (
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 hover:bg-white text-foreground"
              onClick={onQuickView}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="secondary"
            size="icon"
            className={`${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 hover:bg-white text-foreground'}`}
            onClick={handleWishlist}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 hover:bg-white text-foreground"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-accent text-accent-foreground animate-pulse">
              Featured
            </Badge>
          )}
          {product.originalPrice && (
            <Badge className="bg-destructive text-destructive-foreground">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary">
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        </div>
        
        {/* Product Name */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-accent smooth-transition">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-accent">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        
        {/* Size */}
        <p className="text-xs text-muted-foreground mb-6">Size: {product.size}</p>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            onClick={handleAddToCart}
            className="flex-1 group"
            disabled={!product.inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 smooth-transition" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onWhatsAppInquiry(product)}
            disabled={!product.inStock}
            className="px-3"
          >
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;