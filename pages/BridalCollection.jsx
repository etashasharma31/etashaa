import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { bridalProducts } from '../data';

const BridalCollection = () => {
  const [activeFilters, setActiveFilters] = useState(['Zardosi']);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const filteredProducts = bridalProducts.filter(product => {
    // Basic pagination filter for demonstration
    // In a real app, you'd filter by category/type first, then paginate
    return product.page === currentPage || (currentPage === 1 && !product.page);
  });

  const totalPages = 4; // As per the design (1, 2, 3, 4)

  return (
    <main className="min-h-screen">
      {/* Hero Header */}
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
        {/* Sidebar Filters */}
        <aside className="w-full md:w-60 self-start sticky top-24">
          <div className="space-y-8">
            <h3 className="font-noto-serif text-lg mb-6 border-b border-outline-variant/20 pb-2 flex items-center justify-between">
              Refine Search 
              <span 
                className="text-[10px] uppercase tracking-widest text-primary cursor-pointer hover:text-secondary transition-colors"
                onClick={() => setActiveFilters([])}
              >
                Clear All
              </span>
            </h3>
            
            {/* Price Filter */}
            <div className="mb-6">
              <p className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline mb-4">Price Range</p>
              <div className="space-y-2">
                {['Under ₹25,000', '₹25,000 - ₹50,000', '₹50,000+'].map((range) => (
                  <label key={range} className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-4 h-4 border-outline text-primary focus:ring-0 rounded-none bg-transparent" type="checkbox"/>
                    <span className="text-sm font-light text-on-surface/80 group-hover:text-primary transition-colors">{range}</span>
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
                    <input className="w-4 h-4 border-outline text-primary focus:ring-0 rounded-none bg-transparent" type="checkbox"/>
                    <span className="text-sm font-light text-on-surface/80 group-hover:text-primary transition-colors">{fabric}</span>
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
                    className={`filter-chip px-4 py-1.5 text-[10px] uppercase tracking-tighter rounded-full transition-colors ${activeFilters.includes(work) ? 'bg-[#735b24] text-white' : 'bg-tertiary-container/30 text-on-tertiary-container hover:bg-tertiary-container/50'}`}
                    onClick={() => toggleFilter(work)}
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
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-outline">Sort By:</span>
              <select className="bg-transparent border-none text-xs uppercase tracking-widest font-medium focus:ring-0 py-0 cursor-pointer text-on-surface">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
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
