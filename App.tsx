import React, { useState, createContext } from 'react';
import { View } from './types';
import { useProductStore, ProductStore } from './hooks/useProductStore';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { GalleryPage } from './pages/GalleryPage';

export const ProductContext = createContext<ProductStore | null>(null);

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const productStore = useProductStore();

  const handleLogin = (password: string) => {
    // NOTE: This is a simple, hardcoded password for demonstration purposes.
    // In a real application, this would be a secure call to a backend service.
    if (password === 'admin123') {
      setIsAdminLoggedIn(true);
      setView('admin');
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setView('home');
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomePage setView={setView} />;
      case 'shop':
        return <ShopPage />;
      case 'custom':
        return <CustomOrderPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'admin':
        return isAdminLoggedIn 
            ? <AdminPage onLogout={handleLogout} /> 
            : <LoginPage onLogin={handleLogin} />;
      default:
        return <HomePage setView={setView} />;
    }
  };

  return (
    <ProductContext.Provider value={productStore}>
      <div className="min-h-screen flex flex-col font-sans bg-brand-light text-brand-dark">
        <Header setView={setView} cart={productStore.cart} cartTotal={productStore.cartTotal} />
        <main className="flex-grow">
          {renderView()}
        </main>
        <Footer />
      </div>
    </ProductContext.Provider>
  );
};

export default App;