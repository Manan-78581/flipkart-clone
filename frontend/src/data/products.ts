export interface Product {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  stock: number;
}
