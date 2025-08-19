import { Product } from '@/types/product';
import serumImage from '@/assets/product-serum.jpg';
import creamImage from '@/assets/product-cream.jpg';
import cleanserImage from '@/assets/product-cleanser.jpg';
import moisturizerImage from '@/assets/product-moisturizer.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Advanced Vitamin C Serum',
    price: 89.99,
    originalPrice: 119.99,
    description: 'Powerful antioxidant serum that brightens and protects your skin.',
    longDescription: 'Our Advanced Vitamin C Serum is formulated with 20% L-Ascorbic Acid, the most potent form of Vitamin C. This medical-grade serum penetrates deep into the skin to stimulate collagen production, reduce fine lines, and provide powerful antioxidant protection against environmental damage.',
    image: serumImage,
    category: 'Serums',
    ingredients: ['20% L-Ascorbic Acid', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid'],
    benefits: ['Brightens skin tone', 'Reduces fine lines', 'Antioxidant protection', 'Stimulates collagen'],
    usage: 'Apply 2-3 drops to clean skin in the morning. Follow with moisturizer and SPF.',
    size: '30ml',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 342
  },
  {
    id: '2',
    name: 'Hydra-Repair Night Cream',
    price: 125.00,
    description: 'Intensive overnight treatment that repairs and regenerates your skin.',
    longDescription: 'Transform your skin while you sleep with our Hydra-Repair Night Cream. This luxurious formula combines peptides, ceramides, and botanical extracts to repair damage, boost hydration, and promote cellular renewal for visibly younger-looking skin.',
    image: creamImage,
    category: 'Moisturizers',
    ingredients: ['Peptide Complex', 'Ceramides', 'Retinol', 'Botanical Extracts'],
    benefits: ['Overnight repair', 'Deep hydration', 'Anti-aging', 'Skin renewal'],
    usage: 'Apply generously to face and neck before bedtime. Use as the last step in your nighttime routine.',
    size: '50ml',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 287
  },
  {
    id: '3',
    name: 'Gentle Purifying Cleanser',
    price: 45.00,
    description: 'pH-balanced cleanser that removes impurities without stripping your skin.',
    longDescription: 'Start your skincare routine with our Gentle Purifying Cleanser. This medical-grade formula effectively removes makeup, dirt, and pollutants while maintaining your skin\'s natural barrier. Suitable for all skin types, including sensitive skin.',
    image: cleanserImage,
    category: 'Cleansers',
    ingredients: ['Glycolic Acid', 'Niacinamide', 'Chamomile Extract', 'Aloe Vera'],
    benefits: ['Deep cleansing', 'Maintains pH balance', 'Gentle on skin', 'Removes makeup'],
    usage: 'Massage onto damp skin morning and evening. Rinse thoroughly with lukewarm water.',
    size: '150ml',
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 198
  },
  {
    id: '4',
    name: 'Daily Defense Moisturizer SPF 30',
    price: 65.00,
    description: 'Lightweight moisturizer with broad-spectrum sun protection.',
    longDescription: 'Protect and nourish your skin daily with our Defense Moisturizer SPF 30. This lightweight, non-greasy formula provides broad-spectrum UV protection while delivering essential hydration and antioxidants for healthy, protected skin.',
    image: moisturizerImage,
    category: 'Moisturizers',
    ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Hyaluronic Acid', 'Vitamin E'],
    benefits: ['SPF 30 protection', 'Daily hydration', 'Antioxidant defense', 'Non-greasy formula'],
    usage: 'Apply generously to face and neck 15 minutes before sun exposure. Reapply every 2 hours.',
    size: '75ml',
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 156
  }
];