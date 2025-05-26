import { ReactNode } from 'react';

import UserDropdown from './UserDropdown'; 

interface LayoutProps {
  children: ReactNode;
  activeTab: 'bienvenida' | 'productos' | 'inventarios';
  onTabChange: (tab: 'bienvenida' | 'productos' | 'inventarios') => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-16 bg-white border-r flex flex-col items-center py-4 space-y-6">
        <div className="w-8 h-8 bg-black rounded-full" />
        <div className="flex flex-col gap-6"></div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            Dashboard /
            <span className="text-gray-700 font-medium ml-1 capitalize">{activeTab}</span>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-lg">
            <UserDropdown />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => onTabChange('bienvenida')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'bienvenida' ? 'bg-white border shadow-sm text-gray-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Bienvenida
          </button>
          <button
            onClick={() => onTabChange('productos')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'productos' ? 'bg-white border shadow-sm text-gray-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Productos
          </button>
          <button
            onClick={() => onTabChange('inventarios')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'inventarios' ? 'bg-white border shadow-sm text-gray-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Inventarios
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white p-6 rounded-md min-h-[60vh] shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
