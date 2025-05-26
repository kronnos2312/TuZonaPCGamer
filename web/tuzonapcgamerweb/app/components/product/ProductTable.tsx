'use client';

import { useEffect } from 'react';
import {userProductStore} from '@/app/store/userProductStore';

export default function ProductTable() {
  const {product, fetchProduct} = userProductStore();
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  
  return (
    <div>
      <h1>Productos Global (Zustand)</h1>    
      <ul>
        {product.map((item) => (
          <li key={item.id}>
            Nombre Producto {item.name} - {item.model} Unidades - {item.brand} 
          </li>
        ))}
      </ul>
    
    </div>
  );
}
