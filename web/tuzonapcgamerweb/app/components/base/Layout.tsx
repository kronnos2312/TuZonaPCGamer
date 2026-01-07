import { ReactNode } from 'react';
import UserDropdown from './UserDropdown';

interface LayoutProps {
  children: ReactNode;
  activeTab: 'bienvenida' | 'productos' | 'inventarios';
  onTabChange: (tab: 'bienvenida' | 'productos' | 'inventarios') => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      
      {/* Sidebar (solo visible en md en adelante) */}
      <aside className="hidden md:flex md:w-16 bg-white border-r flex-col items-center py-4 space-y-6">
        <div className="w-8 h-8 bg-black rounded-full" />
        <div className="flex flex-col gap-6" />
      </aside>

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center mb-4">
            <div className="text-sm text-gray-500 flex items-center">
              Usted Esta en:/
              <span className="text-gray-700 font-medium ml-1 capitalize">{activeTab}</span>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-lg ml-2">
              <UserDropdown />
            </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['bienvenida', 'productos', 'inventarios'].map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab as LayoutProps['activeTab'])}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === tab
                  ? 'bg-white border shadow-sm text-gray-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white p-4 sm:p-6 rounded-md min-h-[60vh] shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}