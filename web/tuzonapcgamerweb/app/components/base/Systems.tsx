'use client';

import React from 'react';

interface SystemsProps {
  imagePreview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export default function Systems({ imagePreview, onFileChange, onClose }: SystemsProps) {
  return (
    <div>
      {/* Imagen y selector */}
      <div className="flex flex-col items-center gap-4">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Vista previa"
            className="w-24 h-24 rounded-full object-cover border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border">
            Sin imagen
          </div>
        )}
        <input type="file" accept="image/*" onChange={onFileChange} />
      </div>

      {/* Cierre */}
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        aria-label="Cerrar configuración"
      >
        &times;
      </button>
    </div>
  );
}
