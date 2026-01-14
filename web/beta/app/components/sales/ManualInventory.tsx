'use client';

import React, { useState } from 'react';
import { WInventory } from '@/app/model/WithdrawInventory';
import { useInventoryStore } from '@/app/store/useInventoryStore'; 

type Props = {
  initialData: WInventory;
  onSend?: (data:WInventory)=>void
};

export default function ManualInventory({ initialData }: Props) {
  const [product, setProduct] = useState<WInventory>(initialData);
  const getOutInventory = useInventoryStore(state => state.getOutInventory);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="bg-white text-gray-900 p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Retiro de Inventario</h2>

      <div className="space-y-3">
        <input
          type="date"
          name="dateOut"
          value={product.dateOut}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Fecha Salida"
        />

        <input
          name="barCode"
          value={product.barCode}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Codigo Barras"
        />
      </div>

      <button
        onClick={() => getOutInventory(product)}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
      >
        Retirar Producto
      </button>
    </main>
  );
}
