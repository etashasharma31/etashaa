import React from 'react';
import ProductCard from '../components/ProductCard';
import { sareeProducts } from '../data';

const SareeCollection = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[500px] w-full flex items-center justify-center overflow-hidden bg-surface-container">
        <div className="absolute inset-0 z-0 opacity-40">
            <img src="/images/cat_designer_saree_main.png" alt="Sarees" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center space-y-4 px-4">
          <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary opacity-90 font-bold animate-fade-up">The Heritage Edit</p>
          <h1 className="animate-fade-up" style={{ animationDelay: '0.2s' }}>Heritage Sarees</h1>
          <p className="font-jakarta-sans text-xs text-on-surface-variant mt-2 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>Six yards of pure grace. Hand-woven tales of tradition, reimagined for the modern aesthetic.</p>
        </div>
      </section>

      {/* Product Grid */}
      <div className="max-w-custom py-24 bg-surface">
        <div className="flex justify-between items-center mb-16 px-4">
          <h2 className="font-noto-serif text-3xl italic">The Saree Gallery</h2>
          <p className="font-jakarta-sans text-xs tracking-widest text-outline uppercase">{sareeProducts.length} MASTERPIECES</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {sareeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Featured Quote */}
      <section className="py-32 px-12 bg-surface-container-low text-center">
        <div className="max-w-3xl mx-auto">
            <span className="material-symbols-outlined text-4xl text-primary mb-8 opacity-30 italic">format_quote</span>
            <p className="font-noto-serif text-3xl md:text-4xl italic text-on-surface leading-relaxed">"The saree is not just an attire; it is a movement, a legacy, and a piece of art that breathes with you."</p>
            <p className="mt-12 font-jakarta-sans text-xs tracking-[0.3em] uppercase text-outline">— ETASHAA ATELIER</p>
        </div>
      </section>
    </main>
  );
};

export default SareeCollection;
