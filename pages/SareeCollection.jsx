import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import PageHero from '../components/PageHero';
import FilterSidebar from '../components/FilterSidebar';
import { sareeProducts } from '../data';

const SareeCollection = () => {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Newest Arrivals');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPriceRanges, selectedCategories, selectedAvailability, selectedBrands]);

  const clearAllFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedCategories([]);
    setSelectedAvailability([]);
    setSelectedBrands([]);
  };

  const filteredProducts = sareeProducts.filter(product => {
    if (selectedPriceRanges.length > 0) {
      const priceMatch = selectedPriceRanges.some(range => {
        if (range === 'Under ₹ 1,50,000') return product.price < 150000;
        if (range === '₹ 1,50,000 - ₹ 2,00,000') return product.price >= 150000 && product.price <= 200000;
        if (range === '₹ 2,00,000+') return product.price > 200000;
        return false;
      });
      if (!priceMatch) return false;
    }
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    if (selectedAvailability.length > 0 && !selectedAvailability.includes(product.availability)) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    return true;
  });

  return (
    <main className="min-h-screen">
      <PageHero 
        title="Heritage Sarees"
        tagline="The Heritage Edit"
        subtitle="Six yards of pure grace. Hand-woven tales of tradition."
        image="/images/cat_designer_saree_main.png"
      />

      <div className="max-w-custom py-12 flex flex-col md:flex-row gap-12">
        <FilterSidebar 
          selectedPriceRanges={selectedPriceRanges}
          setSelectedPriceRanges={setSelectedPriceRanges}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          clearAllFilters={clearAllFilters}
        />

        <section className="flex-1">
          <div className="flex justify-between items-center mb-8 border-b border-outline-variant/10 pb-4">
            <p className="font-jakarta-sans text-xs tracking-widest text-outline">SHOWING {filteredProducts.length} DESIGNS</p>
            <div className="flex items-center gap-4 relative">
              <span className="text-xs uppercase tracking-widest text-outline">Sort By:</span>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-on-surface hover:text-primary transition-colors py-1"
              >
                {selectedSort}
                <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>

      {/* Featured Quote */}
      <section className="py-24 px-12 bg-surface-container-low text-center">
        <div className="max-w-3xl mx-auto">
            <span className="material-symbols-outlined text-4xl text-primary mb-8 opacity-30 italic">format_quote</span>
            <p className="font-noto-serif text-2xl md:text-3xl italic text-on-surface leading-relaxed">"The saree is not just an attire; it is a movement, a legacy, and a piece of art that breathes with you."</p>
            <p className="mt-8 font-jakarta-sans text-[10px] tracking-[0.3em] uppercase text-outline">— ETASHAA ATELIER</p>
        </div>
      </section>
    </main>
  );
};

export default SareeCollection;
