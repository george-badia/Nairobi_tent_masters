import { useState, useCallback } from 'react';
import { Product, CartItem, CustomOrderSubmission, CustomerInfo, CustomOrderResponse } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

export const useProductStore = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customOrders, setCustomOrders] = useState<CustomOrderSubmission[]>([]);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...product, id: `prod_${Date.now()}` }]);
  }, []);

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item => (item.id === productId ? { ...item, quantity } : item))
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const addCustomOrder = useCallback((customer: CustomerInfo, proposal: CustomOrderResponse) => {
    const newOrder: CustomOrderSubmission = {
      id: `order_${Date.now()}`,
      customer,
      proposal,
      submittedAt: new Date().toISOString(),
      status: 'New',
    };
    setCustomOrders(prev => [newOrder, ...prev]);
  }, []);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    customOrders,
    addCustomOrder,
  };
};

export type ProductStore = ReturnType<typeof useProductStore>;