import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { festiveProducts } from '../data';

const FestiveCollection = () => {
  const navigate = useNavigate();

  return (
    <main className="pt-24 bg-surface">

      {/* Filters Section */}
      <section className="bg-surface-container-low py-12 px-12">
        <div className="max-w-custom flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="text-3xl mb-2 font-noto-serif">Refine Elegance</h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {['Floral Prints', 'Gotta Patti', 'Jewel Tones', 'Mirror Work'].map(filter => (
                <span key={filter} className="bg-surface-container-highest text-on-surface-variant px-6 py-2 rounded-full text-xs uppercase tracking-widest cursor-pointer hover:bg-primary-container hover:text-white transition-colors">{filter}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-outline">
            <span>Sort By:</span>
            <button className="flex items-center gap-2 text-on-surface font-semibold">
              New Arrivals <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 px-12 bg-surface">
        <div className="max-w-custom grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
          {festiveProducts.map((product) => (
            <div key={product.id} className={product.mt12 ? 'md:mt-12' : ''}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className="py-24 flex justify-center bg-surface">
        <nav className="flex items-center gap-4">
          <button className="w-12 h-12 flex items-center justify-center text-outline hover:text-primary transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-12 h-12 flex items-center justify-center text-outline hover:text-on-surface transition-colors">1</button>
          <button className="w-12 h-12 flex items-center justify-center text-outline hover:text-on-surface transition-colors">2</button>
          <button className="w-12 h-12 flex items-center justify-center text-outline hover:text-on-surface transition-colors">3</button>
          <button className="w-12 h-12 flex items-center justify-center text-on-surface font-semibold border-b-2 border-primary">4</button>
          <span className="text-outline mx-2">...</span>
          <button className="w-12 h-12 flex items-center justify-center text-outline hover:text-primary transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </nav>
      </div>

      {/* Newsletter / Contact Split */}
      <section className="bg-surface-container py-24 px-12">
        <div className="max-w-custom grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl mb-6 font-noto-serif">Bespoke Fitting</h2>
            <p className="font-body text-on-surface-variant mb-8 leading-relaxed">Our festive collections offer complimentary virtual consultations for personalized sizing and fabric selection. Experience the atelier from your home.</p>
            <button className="border-b-2 border-primary text-primary px-2 py-4 text-xs uppercase tracking-widest hover:text-secondary hover:border-secondary transition-all">Book An Appointment</button>
          </div>
          <div className="bg-surface p-12 shadow-sm">
            <h3 className="text-2xl mb-4 font-noto-serif italic">The Digital Atelier</h3>
            <p className="font-body text-sm text-outline mb-8 uppercase tracking-widest">Receive early access to seasonal drops and exclusive festive curation.</p>
            <div className="relative">
              <input className="w-full bg-transparent border-none border-b border-outline/30 py-4 focus:ring-0 focus:border-primary text-xs tracking-widest outline-none placeholder:text-outline/40" placeholder="YOUR EMAIL" type="email"/>
              <button className="absolute right-0 bottom-4 text-primary uppercase text-[10px] tracking-widest font-semibold">Join</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FestiveCollection;
