// store/useInventoryStore.ts
import { create } from 'zustand'
import { Product } from '../model/Product';
import { useToastStore } from "./useToastStore";
type State = {
  product: Product[];
  showProduct: Product;

  setProduct: (data: Product[]) => void;
  showInventory: (data: Product) => void;
  clearShowProduct: () => void;

  fetchProduct: () => Promise<void>;
  saveProduct: (data: Product) => Promise<void>;
  deleteProduct: (data: Product) => Promise<void>;
};

const currentProduct: Product = {
  id: 0,
  name: "",
  brand: "",
  model: ""
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const userProductStore = create<State>((set, get) => ({
  product: [],
  showProduct: currentProduct,

  setProduct: (data) => set({ product: data }),

  showInventory: (data) => set({ showProduct: data }),

  clearShowProduct: () => set({ showProduct: currentProduct }),

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

  saveProduct: async (data) => {
    try {
      /* Salvado objeto "data"*/
      await fetch(`${API_BASE_URL}/product/dto`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // ✅ Actualizado Store
      await get().fetchProduct();
      get().clearShowProduct();
      useToastStore.getState().showToast( "Producto guardado correctamente", "success" );
    } catch (error) {
      console.error('Save product error:', error);
      useToastStore.getState().showToast( "Se presento un error al momento de almacenar el Producto: "+error, "error" );
    }
  },

  deleteProduct: async (data) => {
    try {
      await fetch(`${API_BASE_URL}/product/${data.id}`, {
        method: 'DELETE',
      });
      get().fetchProduct();
    } catch (error) {
      console.error('Delete product error:', error);
    }
  },
}));
