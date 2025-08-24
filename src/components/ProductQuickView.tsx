import React from 'react';
import { X, Star, Heart, Share2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppInquiry: (product: Product) => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
  onWhatsAppInquiry,
}) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
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
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative group bg-secondary/30">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 md:h-full object-cover group-hover:scale-105 smooth-transition"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="bg-background/80 backdrop-blur-md hover:bg-background"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-background/80 backdrop-blur-md hover:bg-background"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            {product.originalPrice && (
              <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="p-8 flex flex-col">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-accent">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </DialogHeader>

            <div className="flex-1 space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {product.longDescription}
              </p>

              {/* Key Benefits */}
              <div>
                <h4 className="font-semibold mb-3">Key Benefits</h4>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Ingredients */}
              <div>
                <h4 className="font-semibold mb-3">Key Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Usage Instructions */}
              <div>
                <h4 className="font-semibold mb-2">How to Use</h4>
                <p className="text-sm text-muted-foreground">{product.usage}</p>
              </div>

              {/* Size */}
              <div>
                <span className="font-semibold">Size: </span>
                <span className="text-muted-foreground">{product.size}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-border">
              <Button
                onClick={handleAddToCart}
                className="flex-1 group"
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 smooth-transition" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => onWhatsAppInquiry(product)}
                className="flex-1"
              >
                Buy via WhatsApp
              </Button>
            </div>

            {!product.inStock && (
              <p className="text-destructive text-sm text-center mt-2">Currently out of stock</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;