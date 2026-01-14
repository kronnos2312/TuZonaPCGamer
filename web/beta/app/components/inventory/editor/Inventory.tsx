'use client';

import React, { useState,useEffect  } from "react";
import { InventoryItem } from "@/app/model/InventoryItem";
import { useInventoryStore } from '@/app/store/useInventoryStore';
import { userProductStore } from '@/app/store/userProductStore';
//, fetchProduct
import { Product } from "@/app/model/Product";
type Props = {
  initialData: InventoryItem;
   onSave?: (data: InventoryItem) => void;
};

export default function InventoryEditor({ initialData, onSave  }: Props) {
  const [item, setItem] = useState<InventoryItem>(initialData);

  // ✅ seleccionar solo lo que se usa del store
  const saveInventory = useInventoryStore(
    (state) => state.saveInventory
  );
  const { product, fetchProduct } = userProductStore();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setItem((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "price"
          ? Number(value)
          : value,
    }));
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setItem((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        [name]: value,
      },
    }));
  };
  
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleSelectProduct = (
  e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const productId = Number(e.target.value);

    const selectedProduct = product.find(
      (p) => p.id === productId
    );

    if (!selectedProduct) return;

    setItem((prev) => ({
      ...prev,
      product: selectedProduct,
    }));
  };

  return (
    <main className="bg-white text-gray-900 p-6 rounded-lg max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Editor Inventario/Existencia
      </h2>

      {/* Inventory fields */}
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-bold">Estado</span>
        <input
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
          className="w-full border p-2"
        placeholder="Estado"
        />
        </label>
        <label className="block">
          <span className="text-sm font-bold">Precio</span>
        <input
          type="number"
          name="price"
          value={item.price}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Precio"
        />
        </label>
        <textarea
          name="description"
          value={item.description}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Descripción"
        />
        <input
          type="date"
          name="arrivalDate"
          value={item.arrivalDate}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Fecha Ingreso"
        />
        <input
          type="text"
          name="barcode"
          value={item.barcode}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Código Barras"
        />
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">
        Producto
      </h3>
      <label className="block">
        <span className="text-sm font-bold">Producto</span>
        <select
          value={item.product.id}
          onChange={handleSelectProduct}
          className="w-full border p-2"
        >
          <option value={0}>Seleccione un producto</option>

          {product.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - {p.brand}
            </option>
          ))}
        </select>
      </label>

      {/* Product fields */}
      <div className="space-y-3">
        <input
          type="text"
          name="name"
          value={item.product.name}
          onChange={handleProductChange}
          className="w-full border p-2"
          placeholder="Nombre"
        />
        <input
          type="text"
          name="brand"
          value={item.product.brand}
          onChange={handleProductChange}
          className="w-full border p-2"
          placeholder="Marca"
        />
        <input
          type="text"
          name="model"
          value={item.product.model}
          onChange={handleProductChange}
          className="w-full border p-2"
          placeholder="Modelo"
          />
      </div>

      <button
        onClick={() => saveInventory(item)}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md"
      >
        Guardar Cambios
      </button>
    </main>
  );
}