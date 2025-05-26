'use client';

import { useState, useRef, useEffect } from 'react';
import Systems from './Systems';

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center focus:outline-none"
      >
        ⚙️
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md border rounded-md text-sm z-50">
          <div className="px-4 py-2 text-gray-700 font-semibold border-b">Preferencias</div>
          <button
            onClick={() => {
              setShowSettings(true);
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
          >
            Configuración
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-gray-400 cursor-not-allowed"
            disabled
          >
            Próximamente
          </button>
        </div>
      )}

      {/* Modal de Configuración */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-md p-6 w-96 relative">
            <h2 className="text-lg font-semibold mb-4">Configuración de Usuario</h2>
             <Systems
              imagePreview={imagePreview}
              onFileChange={handleFileChange}
              onClose={() => setShowSettings(false)}
            />
            
          </div>
        </div>
      )}
    </div>
  );
}