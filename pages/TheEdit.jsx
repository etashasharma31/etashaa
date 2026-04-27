import React from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { editProducts } from '../data';

const TheEdit = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex">
          <div className="w-1/2 h-full">
            <img src="/images/hero_bridal_elegance.png" alt="Red" className="w-full h-full object-cover opacity-40" />
          </div>
          <div className="w-1/2 h-full">
            <img src="/images/prod_ivory_glow_lehenga.png" alt="Pastel" className="w-full h-full object-cover opacity-40" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-surface/60 to-surface"></div>
        </div>
        <div className="relative z-10 text-center space-y-4 px-4">
          <p className="font-jakarta-sans text-xs uppercase tracking-[0.3em] text-secondary opacity-90 font-bold animate-fade-up">Curated Collection</p>
          <h1 className="font-noto-serif text-5xl md:text-7xl tracking-tighter text-on-surface animate-fade-up" style={{ animationDelay: '0.2s' }}>The Red & Pastel Edit</h1>
          <p className="font-jakarta-sans text-sm text-on-surface-variant mt-4 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>A stunning dichotomy of tradition and modernity. 10 exclusive silhouettes celebrating the quintessential crimson and the ethereal pastel.</p>
        </div>
      </section>

      {/* Product Grid */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-16">
        <div className="flex justify-between items-center mb-12 border-b border-outline/10 pb-4">
          <p className="font-jakarta-sans text-xs tracking-widest text-outline uppercase">Showing 10 exclusive designs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-16">
          {editProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default TheEdit;
