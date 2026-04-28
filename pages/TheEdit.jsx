import React from 'react';
import ProductCard from '../components/ProductCard';
import PageHero from '../components/PageHero';
import { editProducts } from '../data';

const TheEdit = () => {
  return (
    <main className="min-h-screen">
      <PageHero 
        title="The Red & Pastel Edit"
        tagline="Curated Collection"
        subtitle="A stunning dichotomy of tradition and modernity. 10 exclusive silhouettes."
        image="/images/hero_bridal_elegance.png"
      />

      <div className="max-w-custom py-16">
        <div className="flex justify-between items-center mb-12 border-b border-outline/10 pb-4">
          <p className="font-jakarta-sans text-xs tracking-widest text-outline uppercase">Showing 10 exclusive designs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {editProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default TheEdit;
