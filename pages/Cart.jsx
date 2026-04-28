import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  return (
    <main className="pt-32 pb-24 px-4 md:px-12 max-w-custom min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-3 block">Your Selection</span>
          <h1 className="text-4xl md:text-6xl font-noto-serif italic">Shopping Bag</h1>
        </div>
        <p className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline font-bold border-b border-outline-variant/30 pb-2">
          {cart.length} Masterpiece{cart.length !== 1 ? 's' : ''} Reserved
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        {/* Left Side: Cart Items */}
        <div className="lg:col-span-8">
          {cart.length === 0 ? (
            <div className="py-32 text-center border-y border-outline-variant/20 bg-surface-container-lowest/30">
              <span className="material-symbols-outlined text-6xl text-outline/20 mb-6 font-light">shopping_bag</span>
              <h2 className="text-3xl font-noto-serif italic mb-4">Your bag awaits its first treasure</h2>
              <p className="text-on-surface-variant max-w-md mx-auto mb-10 font-jakarta-sans text-sm font-light leading-relaxed">
                Explore our heritage collections and find the silhouette that speaks to your soul.
              </p>
              <button 
                onClick={() => navigate('/bridal-collection')} 
                className="btn-premium"
              >
                <span>Discover Collections</span>
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {cart.map((item) => (
                <div key={item.id} className="group relative flex flex-col md:flex-row gap-10 reveal">
                  <div 
                    className="w-full md:w-56 aspect-[3/4] overflow-hidden bg-surface-container cursor-pointer relative"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  
                  <div className="flex-1 flex flex-col py-2">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="font-jakarta-sans text-[9px] uppercase tracking-widest text-primary font-bold mb-2 block">{item.category || 'Atelier Collection'}</span>
                        <h3 
                          className="text-2xl font-noto-serif hover:text-primary transition-colors cursor-pointer"
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-xl font-medium font-jakarta-sans">{formatPrice(item.price)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-10">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-3">Quantity</p>
                        <div className="flex items-center w-fit border border-outline-variant/30 px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)} 
                            className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="w-10 text-center text-sm font-bold font-jakarta-sans">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-3">Customization</p>
                        <p className="text-xs text-on-surface-variant font-light italic">Standard Sizing</p>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center gap-8">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="link-premium text-secondary border-secondary/20"
                      >
                        Remove Piece
                      </button>
                      <button className="link-premium text-outline/60 border-outline/10">
                        Move to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Complimentary Services */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-outline-variant/20">
            <div className="flex gap-5 p-6 bg-surface-container-lowest/50 border border-outline-variant/10 group hover:border-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl font-light">auto_fix_high</span>
              <div>
                <h4 className="font-noto-serif text-sm mb-2">Complimentary Tailoring</h4>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">Our master tailors ensure every silhouette is perfectly draped to your unique measurements.</p>
              </div>
            </div>
            <div className="flex gap-5 p-6 bg-surface-container-lowest/50 border border-outline-variant/10 group hover:border-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl font-light">card_giftcard</span>
              <div>
                <h4 className="font-noto-serif text-sm mb-2">Gift Presentation</h4>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">Each piece arrives in our signature heritage packaging, suitable for the most precious occasions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Side - Refined & Integrated */}
        <div className="lg:col-span-4 lg:sticky lg:top-36">
          <div className="space-y-12">
            <div className="bg-surface-container-lowest/50 p-8 md:p-10 border border-outline-variant/10 relative">
              <h2 className="text-sm font-jakarta-sans uppercase tracking-[0.3em] mb-10 text-on-surface font-bold">Bag Summary</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                  <span>Subtotal</span>
                  <span className="text-on-surface text-xs">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                  <span>Shipping</span>
                  {subtotal >= 5000 ? (
                    <span className="text-primary text-[10px]">Complimentary</span>
                  ) : (
                    <span className="text-on-surface text-xs">{subtotal > 0 ? formatPrice(500) : '—'}</span>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                  <span>Estimated Tax</span>
                  <span className="text-on-surface text-xs">{formatPrice(tax)}</span>
                </div>

                <div className="pt-10 border-t border-outline-variant/20">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-noto-serif text-lg italic text-on-surface">Total</span>
                    <span className="text-2xl font-bold font-jakarta-sans text-on-surface">{formatPrice(total)}</span>
                  </div>
                  <p className="text-[9px] text-outline uppercase tracking-[0.15em] font-bold">Taxes & Duties Included</p>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  disabled={cart.length === 0}
                  className="w-full btn-premium !py-5 mt-4 group"
                >
                  <span>Checkout Securely</span>
                  <span className="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100 transition-opacity">lock_open</span>
                </button>
              </div>

              {/* Trust Indicators - Integrated */}
              <div className="mt-12 flex justify-between items-center px-4 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                <span className="material-symbols-outlined text-xl" title="Secure Payment">verified_user</span>
                <span className="material-symbols-outlined text-xl" title="Global Shipping">public</span>
                <span className="material-symbols-outlined text-xl" title="COD Available">payments</span>
              </div>
            </div>

            {/* Assistance - Less Boxy */}
            <div className="group cursor-pointer">
              <div className="flex items-center gap-4 p-5 border border-outline-variant/10 hover:border-primary/20 transition-all bg-white/50">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-primary text-xl">support_agent</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface">Concierge Help</p>
                  <p className="text-[9px] text-on-surface-variant font-medium mt-0.5">Speak with a consultant</p>
                </div>
                <span className="material-symbols-outlined text-outline/30 text-sm ml-auto group-hover:translate-x-1 transition-transform">chevron_right</span>
              </div>
            </div>

            <div className="mt-8 p-6 bg-surface-container-low/50 border border-dashed border-outline-variant/30 text-center">
              <p className="font-noto-serif text-xs italic text-on-surface-variant">
                "Every stitch is a promise of heritage, every drape a celebration of your story."
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
