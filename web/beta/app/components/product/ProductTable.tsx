'use client';

import { useEffect, useState } from 'react';
import { userProductStore } from '@/app/store/userProductStore';
import Modal from '../base/context/Modal';
import ProductEditor from './editor/Product';
import { Product } from '@/app/model/Product';

type EditorType = 'product' | null;

const currentItem: Product = {
  id: 0,
  name: '',
  model: '',
  brand: '',
};

export default function ProductTable() {
  /* =========================
     STATE
  ========================= */
  const [open, setOpen] = useState(false);
  const [editor, setEditor] = useState<EditorType>(null);

  const { product, fetchProduct } = userProductStore();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [filters, setFilters] = useState({
    name: '',
    model: '',
    brand: '',
  });

  /* =========================
     EFFECTS
  ========================= */
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters, itemsPerPage]);

  /* =========================
     HANDLERS
  ========================= */
  const openEditor = (item: Product) => {
    Object.assign(currentItem, item);
    setEditor('product');
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditor(null);
  };

  const handleFilterChange = (
    field: keyof typeof filters,
    value: string
  ) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  /* =========================
     DATA
  ========================= */
  const filteredProducts = product.filter(item => {
    const globalMatch =
      `${item.name} ${item.model} ${item.brand}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const columnMatch =
      item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      item.model.toLowerCase().includes(filters.model.toLowerCase()) &&
      item.brand.toLowerCase().includes(filters.brand.toLowerCase());

    return globalMatch && columnMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">
        Productos
      </h1>

      {/* CONTROLES */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Búsqueda global..."
          className="w-full sm:w-1/2 px-4 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-400 focus:outline-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={itemsPerPage}
          onChange={e => setItemsPerPage(Number(e.target.value))}
          className="px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-400 focus:outline-none"
        >
          <option value={5}>5 registros</option>
          <option value={10}>10 registros</option>
          <option value={20}>20 registros</option>
        </select>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-slate-700">ID</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-700">Nombre</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-700">Modelo</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-700">Marca</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-700">Acción</th>
            </tr>

            {/* FILTROS */}
            <tr className="bg-slate-50 border-t border-slate-200">
              <th />
              <th className="px-4 py-2">
                <input
                  placeholder="Filtrar nombre"
                  value={filters.name}
                  onChange={e => handleFilterChange('name', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  placeholder="Filtrar modelo"
                  value={filters.model}
                  onChange={e => handleFilterChange('model', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  placeholder="Filtrar marca"
                  value={filters.brand}
                  onChange={e => handleFilterChange('brand', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
              </th>
              <th />
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.length ? (
              paginatedProducts.map(item => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-6 py-4 text-slate-700">{item.id}</td>
                  <td className="px-6 py-4 text-slate-700">{item.name}</td>
                  <td className="px-6 py-4 text-slate-700">{item.model}</td>
                  <td className="px-6 py-4 text-slate-700">{item.brand}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openEditor(item)}
                      className="px-4 py-1.5 text-sm font-medium rounded-md bg-amber-400 hover:bg-amber-500 text-amber-900"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-sm text-slate-500">
                  No se encontraron productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-xs text-slate-600">
          Página {currentPage} de {totalPages || 1}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1.5 text-sm font-medium bg-slate-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-4 py-1.5 text-sm font-medium bg-slate-200 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* MODAL */}
      <Modal isOpen={open} onClose={closeModal} title="Editar Producto">
        {editor === 'product' && (
          <ProductEditor initialData={currentItem} onSave={closeModal} />
        )}
      </Modal>
    </div>
  );
}