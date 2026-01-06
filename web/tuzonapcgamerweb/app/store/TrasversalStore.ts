import { create } from 'zustand'
import { BaseParams } from "../model/AppAtribute";

type State = {
  currentParams: BaseParams;
  setParams: (data: BaseParams) => void;
  fetchInventory: () => Promise<void>;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useInventoryStore = create<State>((set) => ({
  currentParams: {
   logo: "",
   theme: ""
  },
  setParams: (data) => set({ currentParams: data }),
  fetchInventory: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/sysparams`);
      if (!res.ok) throw new Error('Error al obtener parametros de sistema');
      const data = await res.json();
      set({ currentParams: data });
    } catch (error) {
      set({ currentParams: {
          logo: "",
          theme: ""
        } 
      });
      console.error('Fetch parametros de sistema error:', error);
    }
  },
}));
