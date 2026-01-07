import { create } from 'zustand';

type LoaderState = {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

export const useLoaderStore = create<LoaderState>((set) => ({
  loading: false,

  // Muestra el loader
  showLoader: () => set({ loading: true }),

  // Oculta el loader
  hideLoader: () => set({ loading: false }),
}));