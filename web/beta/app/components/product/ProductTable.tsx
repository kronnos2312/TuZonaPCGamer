'use client';

import { useEffect, useState } from 'react';
import { userProductStore } from '@/app/store/userProductStore';

import Modal from '../base/context/Modal';
import ProductEditor from './editor/Product';
import { Product } from '@/app/model/Product';
/*interface Product {
  id: number | string;
  name: string;
  model: string;
  brand: string;
}*/
type EditorType = 'product' | null;
const currentItem: Product = {
  id:0,
  name:'',
  model:'',
  brand:''
};

export default function ProductTable() {
  // MODAL EDITOR
  const [open, setOpen] = useState(false);
  const [editor, setEditor] = useState<EditorType>(null);
  const openEditor = (item:any) => {
    currentItem.id = item.id;
    currentItem.name = item.name;
    currentItem.model = item.model;
    currentItem.brand = item.brand;
    setEditor('product');
    setOpen(true);
  }
  const closeModal = () => {
    setOpen(false);
    setEditor(null);
  };
  // Component Functions
  const { product, fetchProduct } = userProductStore();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetchProduct();
  }, []); // si fetchProduct es estable, está bien poner un arreglo vacío

  // Filtrar productos por búsqueda
  const filteredProducts = product.filter((item: Product) =>
    `${item.name} ${item.model} ${item.brand}`.toLowerCase().includes(search.toLowerCase())
  );

  // Calcular paginación
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reiniciar a página 1 al buscar o cambiar items por página
  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Productos</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, modelo o marca..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-600">Mostrar:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Id</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Nombre</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Modelo</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Marca</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Modficar Registro</th>
             {/* <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Remover</th>*/}
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-black">{item.id}</td>
                  <td className="px-6 py-4 text-black">{item.name}</td>
                  <td className="px-6 py-4 text-black">{item.model}</td>
                  <td className="px-6 py-4 text-black">{item.brand}</td>
                  <td className="px-6 py-4 text-black"><button 
                  className="px-3 py-1 bg-yellow-200 text-black-700 rounded"
                  onClick={()=>openEditor(item)}
                  >Editar</button></td>
                 {/*  <td className="px-6 py-4 text-black"><button className="px-3 py-1 bg-red-200 text-black-700 rounded">Remover</button></td>*/}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Página {currentPage} de {totalPages || 1}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>

       {/* ===========================
              Modal de editores
              =========================== */
            }
          <Modal
            isOpen={open}
            onClose={closeModal}
            title='Editar Producto'           
          >
            {editor === 'product' && (
              <ProductEditor
                initialData={currentItem}
                onSave={(data) => {
                  closeModal();
                }}
              />
            )}
          </Modal>
    </div>
  );
}