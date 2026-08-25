import { create } from "zustand";
import { CartItem, Product } from "../types";
interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product) => {
    const existing = get().items.find((i) => i._id === product._id);
    if (existing) {
      set({ items: get().items.map((i) => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ items: [...get().items, { ...product, quantity: 1 }] });
    }
  },
  removeItem: (id) => set({ items: get().items.filter((i) => i._id !== id) }),
  updateQuantity: (id, quantity) => set({ items: get().items.map((i) => i._id === id ? { ...i, quantity } : i) }),
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
