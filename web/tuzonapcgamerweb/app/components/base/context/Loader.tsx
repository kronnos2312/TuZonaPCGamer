'use client';
import Image from 'next/image';
import { ENV } from '../constants/env'; 
import { useLoaderStore } from '@/app/store/useLoaderStore';

export default function Loader() {
  const loading = useLoaderStore((state) => state.loading);

  // Si no está cargando, no renderiza nada
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/40">  
        {/* Imagen arriba */}
        <Image
            src={ENV.BaseLogo}
            alt="Cargando..."
            width={80}
            height={80}
            priority
        />
        {/* Spinner abajo */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
    </div>

  );
}