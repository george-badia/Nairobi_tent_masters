
import React from 'react';
import { View, CartItem } from '../types';
import { ShoppingCartIcon, LogoIcon } from './icons';

interface HeaderProps {
  setView: (view: View) => void;
  cart: CartItem[];
  cartTotal: number;
}

const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button onClick={onClick} className="text-brand-light hover:text-brand-accent transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
    {children}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ setView, cart, cartTotal }) => {
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-brand-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-3" onClick={() => setView('home')}>
            <LogoIcon className="h-10 w-auto" />
            <span className="text-xl font-bold text-white hidden sm:inline">Nairobi Tent Masters</span>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink onClick={() => setView('home')}>Home</NavLink>
              <NavLink onClick={() => setView('shop')}>Shop</NavLink>
              <NavLink onClick={() => setView('custom')}>Custom Orders</NavLink>
              <NavLink onClick={() => setView('gallery')}>Gallery</NavLink>
              <NavLink onClick={() => setView('admin')}>Admin Panel</NavLink>
            </div>
          </nav>
          <div className="flex items-center">
             <div className="relative group">
                <button className="flex items-center text-brand-light hover:text-white">
                    <ShoppingCartIcon className="h-6 w-6" />
                    {cartItemCount > 0 && <span className="ml-2 bg-brand-accent text-brand-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>}
                </button>
                {cart.length > 0 && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Cart</h3>
                            <div className="max-h-64 overflow-y-auto">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center py-2 border-b">
                                        <div>
                                            <p className="font-medium text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.quantity} x KES {item.price.toLocaleString()}</p>
                                        </div>
                                        <p className="font-semibold text-gray-800">KES {(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                             <div className="mt-4 pt-4 border-t">
                                <div className="flex justify-between font-bold text-lg text-gray-900">
                                    <span>Total:</span>
                                    <span>KES {cartTotal.toLocaleString()}</span>
                                </div>
                                <button onClick={() => setView('shop')} className="w-full mt-4 bg-brand-secondary text-white py-2 rounded-md hover:bg-brand-primary transition-colors">
                                    View Cart & Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};