export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  ingredients: string[];
  benefits: string[];
  usage: string;
  size: string;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}