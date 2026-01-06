// store/useInventoryStore.ts
import { create } from 'zustand'
import {InventoryItem} from '../model/InventoryItem'

import { useToastStore } from "./useToastStore";
type State = {
  inventory: InventoryItem[];
  inventoryShow: InventoryItem;
  setInventory: (data: InventoryItem[]) => void;
  fetchInventory: () => Promise<void>;
  clearShowInventory: () => void;
  saveInventory:(data: InventoryItem) => void;
  deleteInventory:(data: InventoryItem) => void;
};

const  currentValue:InventoryItem = {
    id: 0,
    quantity: 0,
    price: 0,
    description: "",
    product: {
      id: 0,
      name: "",
      brand: "",
      model: ""
    },
    arrivalDate:"",
    barcode:""
  };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useInventoryStore = create<State>((set,get) => ({
  inventory: [],
  inventoryShow: currentValue,
  setInventory: (data) => set({ inventory: data }),
  
  showInventory: ( data: InventoryItem) => {
    set({ inventoryShow: data })
  },
  clearShowInventory: ( ) => {
    set({ inventoryShow: currentValue })
  },
  saveInventory: async ( data: InventoryItem) => {
    try {
      console.log(JSON.stringify(data))
       /* Salvado objeto "data"*/
      await fetch(`${API_BASE_URL}/inventory/dto`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // ✅ Actualizado Store
      await get().fetchInventory();
      get().clearShowInventory();
      useToastStore.getState().showToast( "Inventario guardado correctamente", "success" );
    } catch (error) {
      console.error('Fetch inventory error:', error);
      useToastStore.getState().showToast( "Error al guardar inventario: "+error, "error" );
    }
  },
  deleteInventory: async ( data: InventoryItem) => {
    try {
    } catch (error) {
      console.error('Fetch inventory error:', error);
    }
  },
  findInventoryByCodeBar: async (code:string) => {
    try {
    } catch (error) {
      console.error('Fetch inventory error:', error);
    }
  },
  findInventoryBySerialCode: async (code:string) => {
    try {
    } catch (error) {
      console.error('Fetch inventory error:', error);
    }
  },

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
