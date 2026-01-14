'use client'; // Este archivo usa useState, debe ser client

import { useEffect,useState } from 'react';
import ProductsPage from "./components/product/ProductsPage";
import InventoryPage from "./components/inventory/InventoryPage";
import Layout from "./components/base/Layout";
import Wellcome from "./components/base/Wellcome";


export default function Home() {
  const [activeTab, setActiveTab] = useState<'bienvenida' | 'productos' | 'inventarios'>('bienvenida');

  const renderContent = () => {
    switch (activeTab) {
      case 'bienvenida':
        return <Wellcome />;
      case 'productos':
        return <ProductsPage />;
      case 'inventarios':
        return <InventoryPage />;
      default:
        return null;
    }
  };



  useEffect(() => {
    document.title = getTitle(activeTab);
  }, [activeTab]);

  const getTitle = (tab: string) => {
    const appTitle = process.env.NEXT_PUBLIC_SITE_TITLE || 'Sistema';
    let tabTitle = '';

    switch (tab) {
      case 'bienvenida':
        tabTitle = 'Bienvenido';
        break;
      case 'productos':
        tabTitle = 'Productos';
        break;
      case 'inventarios':
        tabTitle = 'Inventarios';
        break;
    }

    return `${tabTitle} | ${appTitle}`;
  };
  
  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
