'use client';

import { useEffect } from 'react';
import { useInventoryStore } from '@/app/store/useInventoryStore';

export default function InventoryTable() {
  const { inventory, fetchInventory } = useInventoryStore();

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  return (
    <div>
      <h1>Inventario Global (Zustand)</h1>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            Nombre Producto {item.product.name} - {item.quantity} Unidades - {item.price} Fecha Recepcion - {item.arrivalDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
