'use client';

import React, { useState } from 'react';
import { Product } from '@/app/model/Product';
import { userProductStore } from '@/app/store/userProductStore';

type Props = {
  initialData: Product;
  onSave?: (data:Product)=>void
};

export default function ProductEditor({ initialData, onSave }: Props) {
  const [product, setProduct] = useState<Product>(initialData);
  const saveProduct = userProductStore(state => state.saveProduct);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="bg-white text-gray-900 p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Editor Producto</h2>

      <div className="space-y-3">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Nombre"
        />

        <input
          name="brand"
          value={product.brand}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Marca"
        />

        <input
          name="model"
          value={product.model}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Modelo"
        />
      </div>

      <button
        onClick={() => saveProduct(product)}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
      >
        Guardar Cambios
      </button>
    </main>
  );
}
