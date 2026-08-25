export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  isFeatured: boolean;
  ratings: number;
  numReviews: number;
}
export interface CartItem extends Product { quantity: number; }
export interface Order {
  _id: string; items: CartItem[]; totalAmount: number;
  paymentMethod: string; paymentStatus: string;
  status: string; createdAt: string;
}
