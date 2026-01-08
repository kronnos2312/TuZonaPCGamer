'use client';

import { useEffect, useState } from 'react';
import { useInventoryStore } from '@/app/store/useInventoryStore';
import InventoryEditor from '../inventory/editor/Inventory';
import Modal from '../base/context/Modal';
import { InventoryItem } from '@/app/model/InventoryItem';
import { Product } from '@/app/model/Product';

type EditorType =  'inventory' | null;
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
   // MODAL EDITOR
  const [open, setOpen] = useState(false);
  const [editor, setEditor] = useState<EditorType>(null);
  const formatDateForInput = (date: string) => {
    return date ? date.split('T')[0] : '';
  };
  const openEditor = (item:any) => {
    currentItem.id = item.id;
    currentItem.arrivalDate = formatDateForInput(item.arrivalDate);
    currentItem.barcode = item.barcode;
    currentItem.description = item.description;
    currentItem.price = item.price;
    currentItem.quantity = item.quantity;
    
    currentItem.product.id = item.product.id;
    currentItem.product.brand = item.product.brand;
    currentItem.product.model = item.product.model;
    currentItem.product.name = item.product.name;
    setEditor('inventory');
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setEditor(null);
  };
  // Component Funtions
  const { inventory, fetchInventory, deleteInventory } = useInventoryStore();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

   // Filtrar productos por búsqueda
  const filteredProducts = inventory.filter((item) =>
    `${item.barcode} ${item.price} ${item.product.model}`
      .toLowerCase()
      .includes(search.toLowerCase())
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
      <h1 className="text-2xl font-bold mb-4 text-black">Inventario</h1>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por (Codigo de Barras) (Precio), (Nombre Modelo)..."
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
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Estado</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Precio</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Marca</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Fecha Ingreso</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Fecha Salida</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Codigo Barras</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Descripcion</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Modficar Registro</th>
              {/* <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Remover</th>*/}
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-black">{item.id}</td>
                  <td className="px-6 py-4 text-black">{item.quantity}</td>
                  <td className="px-6 py-4 text-black">{item.price}</td>
                  <td className="px-6 py-4 text-black">{item.product.model}</td>
                  <td className="px-6 py-4 text-black">{formatDateForInput(item.arrivalDate)}</td>
                  <td className="px-6 py-4 text-black">{formatDateForInput(item.outDate)}</td>
                  <td className="px-6 py-4 text-black">{item.barcode}</td>
                  <td className="px-6 py-4 text-black">{item.description}</td>
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
          Página {currentPage} de {totalPages}
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
            disabled={currentPage === totalPages}
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
      title='Editar Inventario'           
    >
      {editor === 'inventory' && (
        <InventoryEditor
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
