// store/useInventoryStore.ts
import { create } from 'zustand'

type Product = {
  id: number;
  name: string;
  brand: string;
  model: string;
};

type InventoryItem = {
  id: number;
  quantity: number;
  price: number;
  description: string;
  product: Product;
  arrivalDate:string;
  barcode:string;
};

type State = {
  inventory: InventoryItem[];
  setInventory: (data: InventoryItem[]) => void;
  fetchInventory: () => Promise<void>;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useInventoryStore = create<State>((set) => ({
  inventory: [],
  setInventory: (data) => set({ inventory: data }),
  fetchInventory: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/inventory`);
      if (!res.ok) throw new Error('Error al obtener inventario');
      const data = await res.json();
      set({ inventory: data });
    } catch (error) {
      console.error('Fetch inventory error:', error);
    }
  },
}));
