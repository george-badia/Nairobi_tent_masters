
import React, { useState, useMemo, useContext } from 'react';
import { Product, CartItem } from '../types';
import { ProductContext } from '../App';
import { TrashIcon } from '../components/icons';

type Category = 'All' | 'Camping' | 'Corporate' | 'Events' | 'Accessories';

const ProductCard: React.FC<{ product: Product, onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
        <div className="relative">
            <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => onAddToCart(product)}
                    className="bg-brand-accent text-brand-dark font-bold py-2 px-6 rounded-lg transform scale-90 group-hover:scale-100 transition-transform"
                >
                    Add to Cart
                </button>
            </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-bold text-lg text-brand-dark">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.category}</p>
            <p className="mt-2 text-gray-800 text-sm flex-grow">{product.description}</p>
            <p className="text-brand-primary font-bold text-xl mt-4">KES {product.price.toLocaleString()}</p>
        </div>
    </div>
);

const CartView: React.FC<{
    cart: CartItem[];
    cartTotal: number;
    onUpdateQuantity: (id: string, qty: number) => void;
    onRemove: (id: string) => void;
    onClearCart: () => void;
}> = ({ cart, cartTotal, onUpdateQuantity, onRemove, onClearCart }) => (
    <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-brand-dark mb-4">Your Shopping Cart</h2>
        {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
        ) : (
            <div>
                <div className="space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-4">
                            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md"/>
                            <div className="flex-grow mx-4">
                                <p className="font-semibold text-gray-800">{item.name}</p>
                                <p className="text-sm text-gray-500">KES {item.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                                    className="w-16 p-1 border rounded-md text-center"
                                />
                                <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="w-24 text-right font-semibold text-gray-800">KES {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <div className="flex justify-between items-center text-xl font-bold text-brand-dark">
                        <span>Total:</span>
                        <span>KES {cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mt-6 gap-4">
                        <button onClick={onClearCart} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300">Clear Cart</button>
                        <button className="bg-brand-secondary text-white font-bold py-2 px-8 rounded-md hover:bg-brand-primary">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        )}
    </div>
);


export const ShopPage: React.FC = () => {
    const store = useContext(ProductContext);
    if (!store) return null;
    const { products, cart, addToCart, updateCartQuantity, removeFromCart, clearCart, cartTotal } = store;

    const [activeCategory, setActiveCategory] = useState<Category>('All');

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'All') return products;
        return products.filter(p => p.category === activeCategory);
    }, [products, activeCategory]);

    const categories: Category[] = ['All', 'Camping', 'Corporate', 'Events', 'Accessories'];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-brand-dark">Our Collection</h1>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">Find the perfect gear for your next adventure or event.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Product Grid */}
                <div className="lg:col-span-3">
                    <div className="mb-6 flex justify-center lg:justify-start">
                        <div className="bg-white p-2 rounded-lg shadow-sm flex gap-2">
                             {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeCategory === category ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                        ))}
                    </div>
                </div>

                {/* Shopping Cart */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                       <CartView
                           cart={cart}
                           cartTotal={cartTotal}
                           onUpdateQuantity={updateCartQuantity}
                           onRemove={removeFromCart}
                           onClearCart={clearCart}
                       />
                    </div>
                </div>
            </div>
        </div>
    );
};
