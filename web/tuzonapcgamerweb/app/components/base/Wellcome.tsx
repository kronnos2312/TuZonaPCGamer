'use client';

import React, { useState } from 'react';

import Modal from '../base/context/Modal';

import InventoryEditor from '../inventory/editor/Inventory';
import ProductEditor from '../product/editor/Product';

import { Product } from '@/app/model/Product';
import { InventoryItem } from '@/app/model/InventoryItem';
import { WInventory } from '@/app/model/WithdrawInventory';
import ManualInventory from '../sales/ManualInventory';

type EditorType = 'product' | 'inventory' |'Winventory'| null;

/* ===========================
   Datos iniciales (create)
   =========================== */

const emptyProduct: Product = {
  id: 0,
  name: '',
  brand: '',
  model: '',
};

const emptyInventory: InventoryItem = {
  id: 0,
  quantity: 0,
  price: 0,
  description: '',
  arrivalDate: '',
  outDate: '',
  barcode: '',
  product: emptyProduct,
};
const emptyWInventory: WInventory = {
  barCode: '',
  dateOut: ''
};

export default function Welcome() {
  const [open, setOpen] = useState(false);
  const [editor, setEditor] = useState<EditorType>(null);

  /* ===========================
     Handlers de modal
     =========================== */

  const openProductEditor = () => {
    setEditor('product');
    setOpen(true);
  };

  const openInventoryEditor = () => {
    setEditor('inventory');
    setOpen(true);
  };

  const openWInventoryEditor = () => {
    setEditor('Winventory');
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditor(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
        Bienvenido al Sistema de Inventarios
      </h1>

      <h2 className="text-2xl md:text-3xl font-semibold text-indigo-400 mb-8">
        Tuzona PC Gamer
      </h2>

      {/* Ejemplo botón para avanzar o navegar */}
      <div className="max-w-xs mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* Grid vertical */}
        <div className="flex flex-col gap-4">

          {/* Registrar Producto */}
          <button
            className="flex flex-row items-center gap-3 p-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition"
            onClick={openProductEditor}
            aria-label="Registrar producto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Registrar Producto
          </button>

          {/* Registrar Inventario */}
          <button
            className="flex flex-row items-center gap-3 p-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition"
            onClick={openInventoryEditor}
            aria-label="Registrar inventario"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
            </svg>
            Registrar Inventario
          </button>

          {/* Acción futura */}
          <button
            className="flex flex-row items-center gap-3 p-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition"
            onClick={openWInventoryEditor}
            aria-label="Retirar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
            </svg>
            Retirar
          </button>
        </div>
      </div>

      {/* ===========================
          Modal de editores
          =========================== */}
      <Modal
        isOpen={open}
        onClose={closeModal}
        title={
          editor === 'product'
            ? 'Registrar Producto'
            : editor === 'inventory'
            ? 'Registrar Inventario'
            : ''
        }
      >
        {editor === 'product' && (
          <ProductEditor
            initialData={emptyProduct}
            onSave={(data) => {
              closeModal();
            }}
          />
        )}

        {editor === 'inventory' && (
          <InventoryEditor
            initialData={emptyInventory}
            onSave={(data) => {
              closeModal();
            }}
          />
        )}

        {editor === 'Winventory' && (
          <ManualInventory
            initialData={emptyWInventory}
            
          />
        )}
      </Modal>
    </div>
  );
}