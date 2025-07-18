
import React, { useState, useContext, useEffect } from 'react';
import { Product, CustomOrderSubmission } from '../types';
import { ProductContext } from '../App';
import { Modal } from '../components/ui/Modal';
import { TrashIcon, PencilIcon, PlusIcon } from '../components/icons';
import { Pagination } from '../components/ui/Pagination';

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  category: 'Camping',
  price: 0,
  description: '',
  imageUrl: 'https://picsum.photos/seed/new/600/400',
};

const ProductForm: React.FC<{
    initialProduct: Omit<Product, 'id'> | Product;
    onSave: (product: Omit<Product, 'id'> | Product) => void;
    onCancel: () => void;
}> = ({ initialProduct, onSave, onCancel }) => {
    const [product, setProduct] = useState(initialProduct);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(product);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                <input type="text" name="name" id="name" value={product.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" required />
            </div>
             <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" id="category" value={product.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" required>
                    <option>Camping</option>
                    <option>Corporate</option>
                    <option>Events</option>
                    <option>Accessories</option>
                </select>
            </div>
             <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (KES)</label>
                <input type="number" name="price" id="price" value={product.price} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" required />
            </div>
             <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" id="description" rows={4} value={product.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" required></textarea>
            </div>
             <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="text" name="imageUrl" id="imageUrl" value={product.imageUrl} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" required />
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="bg-brand-secondary text-white py-2 px-4 rounded-md hover:bg-brand-primary">Save Product</button>
            </div>
        </form>
    );
};

const CustomOrderCard: React.FC<{ order: CustomOrderSubmission }> = ({ order }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-brand-accent">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-bold text-brand-dark">{order.customer.name}</h3>
                <p className="text-sm text-gray-600">{order.customer.email} | {order.customer.phone}</p>
                <p className="text-xs text-gray-400 mt-1">Submitted: {new Date(order.submittedAt).toLocaleString()}</p>
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${order.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{order.status}</span>
        </div>
        <div className="mt-4 pt-4 border-t">
             <h4 className="font-semibold text-brand-primary">AI Proposal Summary</h4>
             <p className="mt-1 text-gray-700 text-sm">{order.proposal.summary}</p>
        </div>
        <div className="mt-4">
             <h4 className="font-semibold text-brand-primary">Recommended Materials</h4>
             <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                 {order.proposal.materials.map((m, i) => <li key={i}>{m}</li>)}
             </ul>
        </div>
        <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
                <span className="font-semibold text-brand-primary">Estimated Price:</span>
                <span className="text-xl font-bold text-brand-dark">KES {order.proposal.estimatedPriceKES.toLocaleString()}</span>
            </div>
        </div>
    </div>
);

interface AdminPageProps {
  onLogout: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onLogout }) => {
    const store = useContext(ProductContext);
    if (!store) return null;
    const { products, addProduct, updateProduct, deleteProduct, customOrders } = store;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const [productsPage, setProductsPage] = useState(1);
    const [ordersPage, setOrdersPage] = useState(1);

    const PRODUCTS_PER_PAGE = 5;
    const ORDERS_PER_PAGE = 4;

    const handleOpenModalForNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleOpenModalForEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = (productData: Omit<Product, 'id'> | Product) => {
        if ('id' in productData) {
            updateProduct(productData);
        } else {
            addProduct(productData);
        }
        handleCloseModal();
    };

    const totalProductPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = products.slice((productsPage - 1) * PRODUCTS_PER_PAGE, productsPage * PRODUCTS_PER_PAGE);

    const totalOrderPages = Math.ceil(customOrders.length / ORDERS_PER_PAGE);
    const paginatedOrders = customOrders.slice((ordersPage - 1) * ORDERS_PER_PAGE, ordersPage * ORDERS_PER_PAGE);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            {/* Product Management Section */}
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-brand-dark">Product Management</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={handleOpenModalForNew} className="flex items-center gap-2 bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors">
                            <PlusIcon className="w-5 h-5"/>
                            Add New Product
                        </button>
                        <button onClick={onLogout} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedProducts.map(product => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full object-cover" src={product.imageUrl} alt={product.name} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KES {product.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                        <button onClick={() => handleOpenModalForEdit(product)} className="text-brand-secondary hover:text-brand-primary"><PencilIcon className="w-5 h-5" /></button>
                                        <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900"><TrashIcon className="w-5 h-5" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     <Pagination
                        currentPage={productsPage}
                        totalPages={totalProductPages}
                        onPageChange={setProductsPage}
                    />
                </div>
            </div>

             {/* Custom Order Submissions Section */}
            <div>
                 <h1 className="text-3xl font-bold text-brand-dark mb-8">Custom Order Submissions</h1>
                 {customOrders.length > 0 ? (
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                            {paginatedOrders.map(order => <CustomOrderCard key={order.id} order={order} />)}
                        </div>
                        <Pagination 
                            currentPage={ordersPage}
                            totalPages={totalOrderPages}
                            onPageChange={setOrdersPage}
                        />
                    </div>
                 ) : (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                        <p>No custom order proposals have been submitted yet.</p>
                    </div>
                 )}
            </div>
            
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
                <ProductForm 
                    initialProduct={editingProduct || emptyProduct}
                    onSave={handleSaveProduct}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};
