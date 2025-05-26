// store/useInventoryStore.ts
import { create } from 'zustand'

type Product = {
  id: number;
  name: string;
  brand: string;
  model: string;
};

type State = {
  product: Product[];
  setProduct: (data: Product[]) => void;
  fetchProduct: () => Promise<void>;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const userProductStore = create<State>((set) => ({
  product: [],
  setProduct: (data) => set({ product: data }),
  fetchProduct: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/product`);
      if (!res.ok) throw new Error('Error al obtener productos');
      const data = await res.json();
      set({ product: data });
    } catch (error) {
      console.error('Fetch product error:', error);
    }
  },
}));