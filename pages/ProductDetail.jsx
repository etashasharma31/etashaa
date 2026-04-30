import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { bridalProducts, editProducts, sareeProducts, festiveProducts } from '../data';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('About Product');

  // ... (Found product logic remains)

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      // Auto scroll to size selection
      document.getElementById('size-selection')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSizeError(false);
    addToCart({ ...product, size: selectedSize });
  };

  // ... (Scroll effect and main image logic remain)

  return (
    <main className="pb-24 max-w-custom pt-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* ... (Left Side Gallery remains) */}

        {/* Right Side: Product Details */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          {/* ... (Header, Price, Trust Highlights remain) */}

          {/* Selection Blocks */}
          <div className="space-y-6">
            <div className="space-y-4" id="size-selection">
              <div className="flex justify-between items-center">
                <label className={`text-[10px] tracking-widest uppercase font-bold ${sizeError ? 'text-secondary' : 'text-outline'}`}>
                  Select Size * {sizeError && <span className="ml-2 normal-case italic">(Selection Required)</span>}
                </label>
                <button onClick={() => setIsModalOpen(true)} className="text-[10px] tracking-widest uppercase underline hover:text-primary transition-colors">Size Guide</button>
              </div>
              
              <div className="flex flex-wrap gap-2 md:gap-3">
                {['S', 'M', 'L', 'XL', 'Custom Size'].map((size) => (
                  <button 
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`px-4 py-2.5 md:px-5 md:py-3 border text-[10px] uppercase tracking-widest font-bold transition-all ${selectedSize === size ? 'border-primary bg-primary text-on-primary shadow-lg' : 'border-outline-variant/30 hover:border-primary hover:bg-primary-container/10'} ${sizeError && !selectedSize ? 'border-secondary/50 animate-pulse' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <label className="text-[10px] tracking-widest uppercase text-outline font-bold block mb-4">Quantity *</label>
                <div className="flex items-center border border-outline-variant/30 w-fit">
                  <button className="px-4 py-2.5 md:px-5 md:py-3 hover:bg-surface-container transition-colors">—</button>
                  <span className="px-6 py-2.5 md:px-8 md:py-3 text-xs md:text-sm font-bold border-x border-outline-variant/30">1</span>
                  <button className="px-4 py-2.5 md:px-5 md:py-3 hover:bg-surface-container transition-colors">+</button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-3">
              <button 
                id="buy-btn" 
                onClick={handleAddToCart} 
                className="btn-premium-outline group w-full !py-4 md:!py-5"
              >
                <span>Add to Cart</span>
              </button>
              <button onClick={handleAddToCart} className="btn-premium group w-full !py-4 md:!py-5 !bg-[#c8a96a] !border-[#c8a96a]">
                <span>Buy It Now</span>
              </button>
            </div>

            {/* Accordions */}
            <div className="space-y-1 pt-6">
                {[
                    { title: 'About Product', content: 'Exquisitely handcrafted with the finest fabrics and intricate embroidery. A masterpiece from the Etashaa atelier.' },
                    { title: 'Shipping Policy', content: 'Complimentary shipping on all bridal orders. Dispatched with secure luxury packaging within 24-48 hours.' },
                    { title: 'Personalized Recommendations', content: 'Our designers can suggest matching jewelry and accessories to complete your ensemble.' }
                ].map(acc => {
                    const isOpen = openAccordion === acc.title;
                    return (
                        <div key={acc.title} className="border-b border-outline-variant/10">
                            <button 
                                onClick={() => setOpenAccordion(isOpen ? null : acc.title)}
                                className="w-full py-5 flex justify-between items-center group cursor-pointer"
                            >
                                <span className="font-noto-serif text-sm tracking-tight text-on-surface group-hover:text-primary transition-colors">{acc.title}</span>
                                <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>add</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-xs font-jakarta-sans text-on-surface-variant leading-relaxed tracking-wide">
                                    {acc.content}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div className="bg-surface max-w-lg w-full mx-4 p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 hover:bg-surface-container transition-colors p-1">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-headline text-2xl italic mb-6">Size Guide</h3>
            <table className="w-full text-xs font-body border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest text-outline">Size</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest text-outline">Waist (in)</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest text-outline">Hip (in)</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest text-outline">Length (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <tr key={size} className={`py-3 ${selectedSize === size ? 'bg-primary-container/10' : ''}`}>
                    <td className={`py-3 font-semibold ${selectedSize === size ? 'text-primary' : ''}`}>{size} {selectedSize === size ? '✓' : ''}</td>
                    <td className="py-3">{size === 'S' ? '26-28' : size === 'M' ? '28-30' : size === 'L' ? '30-32' : '32-34'}</td>
                    <td className="py-3">{size === 'S' ? '36-38' : size === 'M' ? '38-40' : size === 'L' ? '40-42' : '42-44'}</td>
                    <td className="py-3">{size === 'S' || size === 'M' ? '42' : '43'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="font-body text-xs text-outline mt-6">All measurements in inches. For custom sizing, chat with our team.</p>
          </div>
        </div>
      )}

    </main>
  );
};

export default ProductDetail;
