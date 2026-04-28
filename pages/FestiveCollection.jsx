import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import PageHero from '../components/PageHero';
import FilterSidebar from '../components/FilterSidebar';
import { festiveProducts } from '../data';

const FestiveCollection = () => {
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

  const festivePriceRanges = ['Under ₹ 80,000', '₹ 80,000 - ₹ 1,20,000', '₹ 1,20,000+'];

  const filteredProducts = festiveProducts.filter(product => {
    if (selectedPriceRanges.length > 0) {
      const priceMatch = selectedPriceRanges.some(range => {
        if (range === 'Under ₹ 80,000') return product.price < 80000;
        if (range === '₹ 80,000 - ₹ 1,20,000') return product.price >= 80000 && product.price <= 120000;
        if (range === '₹ 1,20,000+') return product.price > 120000;
        return false;
      });
      if (!priceMatch) return false;
    }
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    if (selectedAvailability.length > 0 && !selectedAvailability.includes(product.availability)) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    return true;
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Lock scroll when mobile filter is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isFilterOpen]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      <PageHero 
        title="Festive"
        tagline="Timeless Elegance"
        subtitle="Tradition. Grace. You."
        footerText="Grace in every thread. Beauty in every drape."
      />

      {/* Mobile Filter Toggle & Sort - Refined Sticky */}
      <div className="sticky top-[64px] z-40 bg-surface border-b border-outline-variant/10 md:hidden">
        <div className="flex divide-x divide-outline-variant/10 h-14">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-3 font-jakarta-sans text-[9px] uppercase tracking-[0.3em] font-bold text-on-surface hover:bg-primary/5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
            Filter
          </button>
          <button 
            onClick={() => setIsSortOpen(true)}
            className="flex-1 flex items-center justify-center gap-3 font-jakarta-sans text-[9px] uppercase tracking-[0.3em] font-bold text-on-surface hover:bg-primary/5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">sort</span>
            Sort
          </button>
        </div>
      </div>

      <div className="max-w-custom py-12 flex flex-col md:flex-row gap-10 relative">
        {/* Desktop Sidebar */}
        <FilterSidebar 
          className="hidden md:block w-64 sticky top-36 h-fit"
          selectedPriceRanges={selectedPriceRanges}
          setSelectedPriceRanges={setSelectedPriceRanges}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          clearAllFilters={clearAllFilters}
          priceRanges={festivePriceRanges}
        />

        {/* Mobile Filter Drawer */}
        <div className={`filter-overlay ${isFilterOpen ? 'open' : ''}`} onClick={() => setIsFilterOpen(false)}></div>
        <div className={`filter-drawer ${isFilterOpen ? 'open' : ''}`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl">Refine</h2>
            <button onClick={() => setIsFilterOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
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
            priceRanges={festivePriceRanges}
          />
          <div className="absolute bottom-0 left-0 w-full p-6 bg-surface border-t border-outline-variant/20">
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="btn-premium w-full"
            >
              <span>Show Results</span>
            </button>
          </div>
        </div>

        {/* Mobile Sort Dropdown - Refined Floating Style */}
        {isSortOpen && (
          <>
            <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsSortOpen(false)}></div>
            <div className="fixed top-[113px] left-0 w-full bg-surface border-b border-outline-variant/10 shadow-2xl z-50 md:hidden reveal-down overflow-hidden">
              <div className="flex flex-col">
                {['Newest Arrivals', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                  <button
                    key={option}
                    className={`w-full text-center py-5 text-[10px] uppercase tracking-[0.3em] transition-colors border-b border-outline-variant/5 last:border-none ${selectedSort === option ? 'text-primary font-bold bg-primary-container/5' : 'text-on-surface/80'}`}
                    onClick={() => {
                      setSelectedSort(option);
                      setIsSortOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <section className="flex-1 px-4 md:px-0">
          <div className="hidden md:flex justify-between items-center mb-12 border-b border-outline-variant/10 pb-6">
            <p className="font-jakarta-sans text-[10px] tracking-[0.3em] uppercase text-outline font-bold">Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} Artisan Designs</p>
            <div className="flex items-center gap-6 relative">
              <span className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold">Sort By:</span>
              <div className="relative">
                <button 
                   onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface hover:text-primary transition-colors py-1"
                >
                  {selectedSort}
                  <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                
                {isSortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)}></div>
                    <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-outline-variant/20 shadow-2xl z-20 overflow-hidden reveal">
                      {['Newest Arrivals', 'Price: Low to High', 'Price: High to Low'].map((option) => (
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
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-20">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-24 flex justify-center items-center gap-4">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center font-jakarta-sans text-[10px] transition-all border ${currentPage === i + 1 ? 'bg-primary text-white border-primary' : 'border-outline-variant/30 text-on-surface hover:border-primary'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default FestiveCollection;
