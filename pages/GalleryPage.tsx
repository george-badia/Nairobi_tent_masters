import React, { useState, useMemo } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { GalleryCategory, GalleryItem } from '../types';
import { XIcon } from '../components/icons';

const categories: GalleryCategory[] = ['Weddings', 'Safari', 'Corporate', 'Festivals'];

const GalleryModal: React.FC<{ item: GalleryItem; onClose: () => void }> = ({ item, onClose }) => (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex justify-center items-center p-4 animate-fade-in"
        onClick={onClose}
    >
        <style>{`
          .animate-fade-in { 
            animation: fadeIn 0.3s ease-in-out; 
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
        <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="w-full md:w-3/5">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-2/5 p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className="inline-block bg-brand-accent/20 text-brand-primary text-xs font-semibold px-2 py-1 rounded-full">{item.category}</span>
                        <h2 className="text-2xl font-bold text-brand-dark mt-2">{item.title}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto pr-2">
                    <p className="text-gray-600">{item.story}</p>
                </div>
            </div>
        </div>
    </div>
);

export const GalleryPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'All'>('All');
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    const filteredItems = useMemo(() => {
        if (activeCategory === 'All') return GALLERY_ITEMS;
        return GALLERY_ITEMS.filter(item => item.category === activeCategory);
    }, [activeCategory]);
    
    const filterCategories: (GalleryCategory | 'All')[] = ['All', ...categories];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-brand-dark">Our Portfolio</h1>
                <p className="mt-3 max-w-3xl mx-auto text-xl text-gray-500">
                    A glimpse into the memorable spaces we've crafted across Kenya.
                </p>
            </div>

            <div className="mb-10 flex justify-center">
                <div className="bg-white p-2 rounded-lg shadow-sm flex flex-wrap gap-2">
                    {filterCategories.map(category => (
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

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {filteredItems.map(item => (
                    <div 
                        key={item.id} 
                        className="break-inside-avoid rounded-lg overflow-hidden shadow-lg cursor-pointer group relative"
                        onClick={() => setSelectedItem(item)}
                    >
                        <img src={item.imageUrl} alt={item.title} className="w-full h-auto object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                            <p className="text-brand-light text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.category}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedItem && <GalleryModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </div>
    );
};
