import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bridalProducts, editProducts, sareeProducts, festiveProducts } from '../data';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const allProducts = [...bridalProducts, ...editProducts, ...sareeProducts, ...festiveProducts];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      ></div>

      {/* Search Panel */}
      <div className="absolute top-0 left-0 right-0 bg-[#fcf9f6] border-b border-outline-variant/10 shadow-2xl reveal-down">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <span className="font-jakarta-sans text-[9px] uppercase tracking-[0.4em] text-primary font-bold">Search Atelier</span>
            <button onClick={onClose} className="text-on-surface hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Silhouettes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-b border-outline-variant/20 focus:border-primary py-3 text-xl md:text-2xl font-noto-serif outline-none transition-colors placeholder:text-outline/30 text-on-surface"
            />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-2xl text-outline/30">search</span>
          </div>

          {/* Results Area */}
          <div className="mt-8 min-h-[200px]">
            {query.length > 1 ? (
              results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.map(product => (
                    <Link 
                      key={product.id} 
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 group hover:bg-surface-container-low p-2 transition-all"
                    >
                      <div className="w-20 h-24 overflow-hidden bg-surface-container-lowest">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div>
                        <h4 className="font-noto-serif text-sm group-hover:text-primary transition-colors">{product.name}</h4>
                        <p className="font-jakarta-sans text-[10px] text-outline uppercase tracking-widest mt-1">{product.category}</p>
                        <p className="font-jakarta-sans text-xs text-on-surface mt-2">₹{product.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="font-jakarta-sans text-xs text-outline tracking-widest uppercase italic">No silhouettes found for "{query}"</p>
                </div>
              )
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <p className="col-span-full font-jakarta-sans text-[10px] uppercase tracking-widest text-outline mb-2">Trending Searches</p>
                {['Zardosi Lehenga', 'Heritage Saree', 'Velvet Couture', 'Pastel Edit'].map(term => (
                  <button 
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-left px-4 py-3 bg-surface-container-low hover:bg-primary hover:text-white transition-all text-xs font-jakarta-sans tracking-wide"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
