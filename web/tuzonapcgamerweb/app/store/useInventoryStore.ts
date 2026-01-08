// store/useInventoryStore.ts
import { create } from 'zustand'
import {InventoryItem} from '../model/InventoryItem'

import { useToastStore } from "./useToastStore";
import { useLoaderStore } from '@/app/store/useLoaderStore';
import { WInventory } from '../model/WithdrawInventory';
type State = {
  inventory: InventoryItem[];
  inventoryShow: InventoryItem;
  setInventory: (data: InventoryItem[]) => void;
  fetchInventory: () => Promise<void>;
  clearShowInventory: () => void;
  saveInventory:(data: InventoryItem) => void;
  getOutInventory:(data: WInventory) => void;
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
    outDate: '',
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
  getOutInventory: async ( data: WInventory) => {
    try {
       /* Salvado objeto "data"*/
      let result: any;

      const response = await fetch(`${API_BASE_URL}/inventory/out`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      result = await response.json();
      console.log(result)
      if(result.codeName != "error"){
        await get().fetchInventory();
        get().clearShowInventory();
        useToastStore.getState().showToast( "Inventario Retirado correctamente", "success" );
      }else{
        useToastStore.getState().showToast( "Se presento un eror con el Retiro de inventario:"+result.messageName, result.codeName );
      }
      // ✅ Actualizado Store
      
    } catch (error) {
      console.error('Fetch inventory error:', error);
      useToastStore.getState().showToast( "Error al Retirar inventario: "+error, "error" );
    }
  },
  saveInventory: async ( data: InventoryItem) => {
    try {
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
    const { showLoader, hideLoader } = useLoaderStore.getState();
    showLoader();
    try {
      const res = await fetch(`${API_BASE_URL}/inventory`);
      if (!res.ok) throw new Error('Error al obtener inventario');
      const data = await res.json();
      set({ inventory: data });
      hideLoader();
    } catch (error) {
      console.error('Fetch inventory error:', error);
    }
  },
}));
