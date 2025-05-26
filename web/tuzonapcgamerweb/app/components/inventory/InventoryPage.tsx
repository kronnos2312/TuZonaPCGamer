import React from 'react';
import InventoryTable from './InventoryTable';

export default function InventoryPage() {
  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-md p-6">
        <InventoryTable />
      </div>
    </main>
  );
}
