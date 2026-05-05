import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <main className="pt-32 pb-24 px-4 md:px-12 max-w-custom min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-3 block">Your Curation</span>
          <h1 className="text-4xl md:text-6xl font-noto-serif italic">My Wishlist</h1>
        </div>
        <p className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline font-bold border-b border-outline-variant/30 pb-2">
          {wishlist.length} Piece{wishlist.length !== 1 ? 's' : ''} Saved
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="py-32 text-center border-y border-outline-variant/20 bg-surface-container-lowest/30">
          <span className="material-symbols-outlined text-6xl text-outline/20 mb-6 font-light">favorite</span>
          <h2 className="text-3xl font-noto-serif italic mb-4">Your heart is still searching</h2>
          <p className="text-on-surface-variant max-w-md mx-auto mb-10 font-jakarta-sans text-sm font-light leading-relaxed">
            Begin your journey through our collections and save the designs that capture your imagination.
          </p>
          <button 
            onClick={() => navigate('/bridal-collection')} 
            className="btn-premium"
          >
            <span>Explore Collections</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Wishlist;
