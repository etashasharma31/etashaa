import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import PageHero from '../components/PageHero';
import FilterSidebar from '../components/FilterSidebar';
import { bridalProducts } from '../data';

const BridalCollection = () => {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Scroll to top when filters or page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedPriceRanges, selectedCategories, selectedAvailability, selectedBrands]);

  const clearAllFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedCategories([]);
    setSelectedAvailability([]);
    setSelectedBrands([]);
    setCurrentPage(1);
  };

  const filteredProducts = bridalProducts.filter(product => {
    // 1. Price Filtering
    if (selectedPriceRanges.length > 0) {
      const priceMatch = selectedPriceRanges.some(range => {
        if (range === 'Under ₹ 1,50,000') return product.price < 150000;
        if (range === '₹ 1,50,000 - ₹ 2,00,000') return product.price >= 150000 && product.price <= 200000;
        if (range === '₹ 2,00,000+') return product.price > 200000;
        return false;
      });
      if (!priceMatch) return false;
    }

    // 2. Category Filtering (if applicable within bridal)
    if (selectedCategories.length > 0) {
      if (!product.category || !selectedCategories.includes(product.category)) return false;
    }

    // 3. Availability Filtering
    if (selectedAvailability.length > 0) {
      if (!product.availability || !selectedAvailability.includes(product.availability)) return false;
    }

    // 4. Brand Filtering
    if (selectedBrands.length > 0) {
      if (!product.brand || !selectedBrands.includes(product.brand)) return false;
    }

    return true;
  });

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Newest Arrivals');

  const sortOptions = [
    'Newest Arrivals',
    'Price: Low to High',
    'Price: High to Low',
    'Most Popular'
  ];

  return (
    <main className="min-h-screen">
      <PageHero 
        title="Bridal Collection"
        tagline="The Heritage of Matrimony"
        subtitle="48 exclusive designs — crafted with heritage & heart"
        image="/images/hero_bridal_elegance.png"
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
              <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-on-surface hover:text-primary transition-colors py-1"
                >
                  {selectedSort}
                  <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                
                {isSortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)}></div>
                    <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-outline-variant/20 shadow-2xl z-20 overflow-hidden reveal-down">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          className={`w-full text-left px-6 py-4 text-[10px] uppercase tracking-widest transition-colors ${selectedSort === option ? 'bg-primary-container/10 text-primary font-bold' : 'text-on-surface/70 hover:bg-surface-container hover:text-on-surface'}`}
                          onClick={() => {
                            setSelectedSort(option);
                            setIsSortOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.slice(0, 12).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length > 12 && (
            <div className="mt-24 flex justify-center">
              <button className="btn-premium-outline">
                <span>Load More Designs</span>
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default BridalCollection;
