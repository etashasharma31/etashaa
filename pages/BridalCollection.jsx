import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { bridalProducts } from '../data';

const BridalCollection = () => {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [activeWorkTypes, setActiveWorkTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Scroll to top when filters or page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedPriceRanges, selectedFabrics, activeWorkTypes]);

  const toggleFilter = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const clearAllFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedFabrics([]);
    setActiveWorkTypes([]);
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

    // 2. Fabric Filtering
    if (selectedFabrics.length > 0) {
      if (!product.fabric || !selectedFabrics.includes(product.fabric)) return false;
    }

    // 3. Work Type Filtering
    if (activeWorkTypes.length > 0) {
      if (!product.workType || !activeWorkTypes.includes(product.workType)) return false;
    }

    // 4. Pagination (Simplified for demo)
    return product.page === currentPage || (currentPage === 1 && !product.page);
  });

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Newest Arrivals');

  const sortOptions = [
    'Newest Arrivals',
    'Price: Low to High',
    'Price: High to Low',
    'Most Popular'
  ];

  const totalPages = 4; // As per the design (1, 2, 3, 4)

  return (
    <main className="min-h-screen">
      {/* ... Hero Header ... */}
      <section className="relative h-[380px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img id="hero-bg" className="w-full h-full object-cover opacity-30 grayscale-[20%] scale-110" alt="Bridal Collection Hero" src="/images/hero_bridal_elegance.png"/>
          <div className="absolute inset-0 bg-gradient-to-b from-surface/20 to-surface"></div>
        </div>
        <div className="relative z-10 text-center space-y-3 px-4">
          <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.3em] text-primary opacity-80 animate-fadeUp">The Heritage of Matrimony</p>
          <h1 className="animate-fadeUp" style={{ animationDelay: '0.2s' }}>Bridal Collection</h1>
          <p className="font-jakarta-sans text-xs text-on-surface-variant mt-1 animate-fadeUp" style={{ animationDelay: '0.4s' }}>48 exclusive designs — crafted with heritage & heart</p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-custom py-12 flex flex-col md:flex-row gap-12">
        {/* ... Sidebar Filters ... */}
        <aside className="w-full md:w-60 self-start sticky top-24">
          <div className="space-y-8">
            <h3 className="font-noto-serif text-lg mb-6 border-b border-outline-variant/20 pb-2 flex items-center justify-between">
              Refine Search 
              <span 
                className="text-[10px] uppercase tracking-widest text-primary cursor-pointer hover:text-secondary transition-colors"
                onClick={clearAllFilters}
              >
                Clear All
              </span>
            </h3>
            
            {/* Price Filter */}
            <div className="mb-6">
              <p className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline mb-4">Price Range</p>
              <div className="space-y-2">
                {['Under ₹ 1,50,000', '₹ 1,50,000 - ₹ 2,00,000', '₹ 2,00,000+'].map((range) => (
                  <label key={range} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      className="w-4 h-4 border-outline text-primary focus:ring-0 rounded-none bg-transparent" 
                      type="checkbox"
                      checked={selectedPriceRanges.includes(range)}
                      onChange={() => toggleFilter(selectedPriceRanges, setSelectedPriceRanges, range)}
                    />
                    <span className={`text-sm font-light transition-colors ${selectedPriceRanges.includes(range) ? 'text-primary' : 'text-on-surface/80 group-hover:text-primary'}`}>{range}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fabric Filter */}
            <div className="mb-6">
              <p className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline mb-4">Fabric</p>
              <div className="space-y-2">
                {['Raw Silk', 'Velvet', 'Organza'].map((fabric) => (
                  <label key={fabric} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      className="w-4 h-4 border-outline text-primary focus:ring-0 rounded-none bg-transparent" 
                      type="checkbox"
                      checked={selectedFabrics.includes(fabric)}
                      onChange={() => toggleFilter(selectedFabrics, setSelectedFabrics, fabric)}
                    />
                    <span className={`text-sm font-light transition-colors ${selectedFabrics.includes(fabric) ? 'text-primary' : 'text-on-surface/80 group-hover:text-primary'}`}>{fabric}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Work Type */}
            <div className="mb-6">
              <p className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline mb-4">Work Type</p>
              <div className="flex flex-wrap gap-2">
                {['Zardosi', 'Gota Patti', 'Mirror Work'].map((work) => (
                  <button 
                    key={work}
                    className={`filter-chip px-4 py-1.5 text-[10px] uppercase tracking-tighter rounded-full transition-colors ${activeWorkTypes.includes(work) ? 'bg-[#735b24] text-white' : 'bg-tertiary-container/30 text-on-tertiary-container hover:bg-tertiary-container/50'}`}
                    onClick={() => toggleFilter(activeWorkTypes, setActiveWorkTypes, work)}
                  >
                    {work}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-8 border-b border-outline-variant/10 pb-4">
            <p className="font-jakarta-sans text-xs tracking-widest text-outline">SHOWING {filteredProducts.length} OF 48 DESIGNS</p>
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
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-24 flex justify-center">
            <nav className="flex items-center gap-4">
              <button 
                className={`w-12 h-12 flex items-center justify-center ${currentPage === 1 ? 'text-outline/30 cursor-not-allowed' : 'text-outline hover:text-on-surface'}`}
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {[1, 2, 3, 4].map((page) => (
                <button 
                  key={page}
                  className={`w-12 h-12 flex items-center justify-center ${currentPage === page ? 'text-on-surface font-semibold border-b-2 border-primary' : 'text-outline hover:text-on-surface transition-colors'}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <span className="text-outline mx-2">...</span>
              <button 
                className={`w-12 h-12 flex items-center justify-center ${currentPage === totalPages ? 'text-outline/30 cursor-not-allowed' : 'text-outline hover:text-primary'}`}
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </nav>
          </div>
        </section>
      </div>
    </main>
  );
};

export default BridalCollection;
