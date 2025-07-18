
import React, { useContext, useState, useEffect } from 'react';
import { Product, View, Testimonial, FAQ } from '../types';
import { ProductContext } from '../App';
import { TESTIMONIALS, FAQS } from '../constants';
import { ChevronDownIcon, CampingIcon, EventsIcon, AccessoriesIcon, QuoteIcon } from '../components/icons';

interface HomePageProps {
  setView: (view: View) => void;
}

const ProductCard: React.FC<{ product: Product, onAddToCart: (product: Product) => void, setView: (view: View) => void }> = ({ product, onAddToCart, setView }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="font-bold text-lg text-brand-dark">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.category}</p>
            <p className="text-brand-primary font-semibold mt-2">KES {product.price.toLocaleString()}</p>
            <button
                onClick={() => { onAddToCart(product); }}
                className="w-full mt-4 bg-brand-secondary text-white py-2 rounded-md hover:bg-brand-primary transition-colors"
            >
                Add to Cart
            </button>
        </div>
    </div>
);

const FaqItem: React.FC<{ faq: FAQ, onToggle: () => void, isOpen: boolean }> = ({ faq, onToggle, isOpen }) => (
    <div className="border-b border-gray-200 py-4">
        <style>{`
          .animate-fade-in-down {
            animation: fadeInDown 0.5s ease-in-out;
          }
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        <button
            onClick={onToggle}
            className="w-full flex justify-between items-center text-left text-lg font-medium text-brand-dark focus:outline-none"
        >
            <span>{faq.question}</span>
            <ChevronDownIcon className={`w-6 h-6 transform transition-transform duration-300 text-brand-secondary ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
            <div className="mt-4 text-gray-600 animate-fade-in-down">
                <p>{faq.answer}</p>
            </div>
        )}
    </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-white rounded-xl shadow-2xl p-8 relative overflow-hidden w-full h-full flex flex-col border-t-4 border-brand-accent">
    <QuoteIcon className="absolute top-4 right-4 text-gray-100 w-24 h-24 z-0" />
    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 h-full">
      <img src={testimonial.imageUrl} alt={testimonial.name} className="w-24 h-24 rounded-full object-cover flex-shrink-0 border-4 border-white shadow-lg" />
      <div className="text-center md:text-left flex-grow">
        <p className="text-gray-700 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
        <div className="mt-4">
          <p className="font-bold text-lg text-brand-primary">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.event}</p>
        </div>
      </div>
    </div>
  </div>
);


export const HomePage: React.FC<HomePageProps> = ({ setView }) => {
    const store = useContext(ProductContext);
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(timer);
    }, []);

    if(!store) return null;
    const { products, addToCart } = store;
    
    const featuredProducts = products.slice(0, 4);

    const handleFaqToggle = (id: string) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };
    
    const goToTestimonial = (index: number) => {
        setCurrentTestimonial(index);
    };

    return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-brand-primary h-[60vh] flex items-center justify-center text-white text-center">
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/hero/1600/900" alt="Expansive event tent" className="w-full h-full object-cover opacity-30"/>
        </div>
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Quality Tents for Every Occasion</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">From the peaks of Mount Kenya to corporate events in the heart of Nairobi, we've got you covered.</p>
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={() => setView('shop')} className="bg-brand-accent text-brand-dark font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all">Shop Now</button>
            <button onClick={() => setView('custom')} className="bg-transparent border-2 border-brand-accent text-brand-accent font-bold py-3 px-8 rounded-lg hover:bg-brand-accent hover:text-brand-dark transition-all">Request Custom Tent</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-dark">Our Specialties</h2>
            <p className="mt-2 text-lg text-gray-600">Solutions for adventure, business, and celebration.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <CampingIcon className="w-16 h-16 mx-auto mb-4 text-brand-secondary" />
                <h3 className="text-xl font-semibold text-brand-primary">Camping Tents</h3>
                <p className="mt-2 text-gray-600">Durable, weather-resistant tents for the avid explorer and casual camper alike.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <EventsIcon className="w-16 h-16 mx-auto mb-4 text-brand-secondary" />
                <h3 className="text-xl font-semibold text-brand-primary">Corporate & Event Tents</h3>
                <p className="mt-2 text-gray-600">Elegant and scalable structures for professional gatherings and memorable celebrations.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <AccessoriesIcon className="w-16 h-16 mx-auto mb-4 text-brand-secondary" />
                <h3 className="text-xl font-semibold text-brand-primary">Tent Accessories</h3>
                <p className="mt-2 text-gray-600">Everything you need to complete your setup, from flooring to lighting.</p>
            </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-dark">Featured Products</h2>
            <p className="mt-2 text-lg text-gray-600">Check out some of our best-sellers.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {featuredProducts.map(product => (
               <ProductCard key={product.id} product={product} onAddToCart={addToCart} setView={setView} />
           ))}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-dark">What Our Clients Say</h2>
            <p className="mt-2 text-lg text-gray-600">Trust earned through quality and service.</p>
          </div>

          <div className="mt-12 relative">
             <div className="relative overflow-hidden w-full min-h-[26rem] lg:min-h-[22rem]">
              {TESTIMONIALS.map((testimonial, index) => {
                const isActive = index === currentTestimonial;
                const firstTestimonial = testimonial;
                const secondTestimonial = TESTIMONIALS[(index + 1) % TESTIMONIALS.length];

                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={!isActive}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                      <TestimonialCard testimonial={firstTestimonial} />
                      <div className="hidden lg:block">
                        <TestimonialCard testimonial={secondTestimonial} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mt-8 space-x-3">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentTestimonial === index ? 'bg-brand-primary' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
              <h2 className="text-3xl font-bold text-brand-dark">Frequently Asked Questions</h2>
              <p className="mt-2 text-lg text-gray-600">Your questions, answered.</p>
          </div>
          <div className="mt-10 max-w-3xl mx-auto">
              {FAQS.map(faq => (
                  <FaqItem
                      key={faq.id}
                      faq={faq}
                      isOpen={openFaqId === faq.id}
                      onToggle={() => handleFaqToggle(faq.id)}
                  />
              ))}
          </div>
      </section>
    </div>
  );
};
