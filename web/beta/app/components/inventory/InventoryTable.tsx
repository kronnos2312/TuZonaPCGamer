'use client';

import { useEffect, useState } from 'react';
import { useInventoryStore } from '@/app/store/useInventoryStore';
import InventoryEditor from '../inventory/editor/Inventory';
import Modal from '../base/context/Modal';
import { InventoryItem } from '@/app/model/InventoryItem';
import { Product } from '@/app/model/Product';

/* =========================
   TIPOS
========================= */
type EditorType = 'inventory' | null;

type SortDirection = 'asc' | 'desc';
type SortKey =
  | 'id'
  | 'quantity'
  | 'price'
  | 'arrivalDate'
  | 'outDate'
  | 'barcode'
  | 'description'
  | 'model';

/* =========================
   CONSTANTES
========================= */
const emptyProduct: Product = {
  id: 0,
  name: '',
  brand: '',
  model: '',
};

const currentItem: InventoryItem = {
  id: 0,
  quantity: 0,
  price: 0,
  description: '',
  arrivalDate: '',
  outDate: '',
  barcode: '',
  product: emptyProduct,
};

export default function InventoryTable() {
  /* =========================
     STATE
  ========================= */
  const [open, setOpen] = useState(false);
  const [editor, setEditor] = useState<EditorType>(null);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const { inventory, fetchInventory } = useInventoryStore();

  /* =========================
     EFFECTS
  ========================= */
  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  /* =========================
     HELPERS
  ========================= */
  const formatDateForInput = (date: string) =>
    date ? date.split('T')[0] : '';

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const openEditor = (item: InventoryItem) => {
    Object.assign(currentItem, {
      ...item,
      arrivalDate: formatDateForInput(item.arrivalDate),
      outDate: formatDateForInput(item.outDate),
    });
    setEditor('inventory');
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditor(null);
  };

  /* =========================
     DATA PIPELINE
  ========================= */
  const filteredProducts = inventory.filter(item =>
    `${item.barcode} ${item.price} ${item.product.model}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortKey) return 0;

    let aValue: any;
    let bValue: any;

    switch (sortKey) {
      case 'model':
        aValue = a.product.model;
        bValue = b.product.model;
        break;
      default:
        aValue = (a as any)[sortKey];
        bValue = (b as any)[sortKey];
    }

    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (typeof aValue === 'number') {
      return sortDirection === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }

    return sortDirection === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">
        Inventario
      </h1>

      {/* CONTROLES */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por código, precio o modelo..."
          className="
            w-full sm:w-1/2 px-4 py-2
            border border-slate-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500
            bg-white text-slate-800
          "
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={itemsPerPage}
          onChange={e => setItemsPerPage(Number(e.target.value))}
          className="
            px-3 py-2 border border-slate-300 rounded-md
            bg-white text-slate-800
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          <option value={5}>5 registros</option>
          <option value={10}>10 registros</option>
          <option value={20}>20 registros</option>
        </select>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto rounded-lg shadow-sm border border-slate-200 bg-white">
        <table className="min-w-full">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              {[
                ['id', 'ID'],
                ['quantity', 'Estado'],
                ['price', 'Precio'],
                ['model', 'Marca'],
                ['arrivalDate', 'Ingreso'],
                ['outDate', 'Salida'],
                ['barcode', 'Código'],
                ['description', 'Descripción'],
              ].map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as SortKey)}
                  className="
                    cursor-pointer px-6 py-3 text-left text-sm
                    font-semibold text-slate-700
                    hover:bg-slate-200 select-none
                  "
                >
                  {label}{' '}
                  {sortKey === key && (
                    <span className="text-blue-600">
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
              <th className="px-6 py-3 text-sm font-semibold text-slate-700">
                Acción
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.map(item => (
              <tr
                key={item.id}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="px-6 py-4 text-slate-800">{item.id}</td>
                <td className="px-6 py-4 text-slate-800">{item.quantity}</td>
                <td className="px-6 py-4 text-slate-800">{item.price}</td>
                <td className="px-6 py-4 text-slate-800">{item.product.model}</td>
                <td className="px-6 py-4 text-slate-800">
                  {formatDateForInput(item.arrivalDate)}
                </td>
                <td className="px-6 py-4 text-slate-800">
                  {formatDateForInput(item.outDate)}
                </td>
                <td className="px-6 py-4 text-slate-800">{item.barcode}</td>
                <td className="px-6 py-4 text-slate-800">{item.description}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openEditor(item)}
                    className="
                      px-4 py-1.5 rounded-md
                      bg-amber-400 text-amber-900
                      hover:bg-amber-500 transition
                      font-medium
                    "
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-slate-600">
          Página {currentPage} de {totalPages}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="
              px-4 py-1.5 rounded-md
              bg-slate-200 text-slate-700
              hover:bg-slate-300
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="
              px-4 py-1.5 rounded-md
              bg-slate-200 text-slate-700
              hover:bg-slate-300
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* MODAL */}
      <Modal isOpen={open} onClose={closeModal} title="Editar Inventario">
        {editor === 'inventory' && (
          <InventoryEditor initialData={currentItem} onSave={closeModal} />
        )}
      </Modal>
    </div>
  );
}
