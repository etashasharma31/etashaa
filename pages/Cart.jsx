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
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-2">Shopping Bag</h1>
        <p id="cart-summary-text" className="font-label uppercase tracking-widest text-outline text-xs">
          {cart.length} Item{cart.length !== 1 ? 's' : ''} in your curated selection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Side: Cart Items */}
        <div id="cart-items-container" className="lg:col-span-7 space-y-12">
          {cart.length === 0 ? (
            <div id="empty-cart" className="py-20 text-center border border-dashed border-outline/20">
              <p className="font-headline text-2xl text-outline mb-6">Your bag is empty</p>
              <button 
                onClick={() => navigate('/')} 
                className="px-8 py-3 bg-primary text-on-primary text-xs uppercase tracking-widest hover:bg-on-primary-fixed-variant transition-colors"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-8 pb-12 border-b border-outline/10 last:border-0 bg-surface">
                <div className="w-full md:w-48 aspect-3/4 bg-surface-container overflow-hidden group cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-headline text-xl text-on-surface cursor-pointer hover:text-primary transition-colors" onClick={() => navigate(`/product/${item.id}`)}>
                        {item.name}
                      </h3>
                      <p className="font-body font-semibold text-lg">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="font-label text-xs uppercase tracking-widest text-outline">Qty:</p>
                      <div className="flex items-center border border-outline/20">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-surface-container transition-colors">-</button>
                        <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-surface-container transition-colors">+</button>
                      </div>
                    </div>
                    <div className="pt-4 space-y-1">
                      <p className="text-sm text-on-surface-variant">Collection: <span className="text-on-surface font-medium">{item.category || 'Atelier'}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-8">
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-xs uppercase tracking-widest font-label border-b border-outline/30 pb-1 hover:border-secondary transition-colors text-secondary"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {/* Extras */}
          <div className="pt-8 border-t border-outline-variant/10">
            <button className="flex items-center gap-3 group">
              <span className="material-symbols-outlined text-primary">featured_seasonal_and_gifts</span>
              <span className="font-label text-xs uppercase tracking-widest group-hover:text-primary transition-colors">Add a personalized gift note</span>
            </button>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-surface-container p-8 md:p-12 editorial-shadow sticky top-32">
            <h2 className="font-headline text-2xl mb-8">Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Subtotal</span>
                <span id="subtotal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Shipping</span>
                {subtotal > 5000 ? (
                  <span className="text-primary uppercase tracking-tighter font-bold">Complimentary</span>
                ) : (
                  <span className="font-bold">{subtotal > 0 ? formatPrice(500) : '—'}</span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Tax (GST 12%)</span>
                <span id="tax">{formatPrice(tax)}</span>
              </div>
              <div className="pt-4 border-t border-outline/10 flex justify-between items-end">
                <span className="font-headline text-lg">Total</span>
                <div className="text-right">
                  <span id="total" className="font-body text-2xl font-bold">{formatPrice(total)}</span>
                  <p className="text-[10px] text-outline uppercase tracking-widest mt-1">Inclusive of all duties</p>
                </div>
              </div>
            </div>

            {/* Trust Marker Badge */}
            <div className="bg-surface-container-highest/30 p-4 mb-8 flex items-center gap-4">
              <div className="bg-primary-container p-2">
                <span className="material-symbols-outlined text-on-primary-container text-sm">payments</span>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest font-bold text-on-primary-container">COD Available</p>
                <p className="text-[10px] text-on-surface-variant mt-0.5">Pay on delivery for orders up to ₹50,000</p>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-on-surface text-primary-container py-5 font-label text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary hover:text-white transition-all duration-500 mb-6 group flex justify-center items-center gap-2"
            >
              Proceed to Secure Checkout
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>

            {/* Help & Trust */}
            <div className="space-y-6">
              <button className="w-full border border-outline/20 py-4 font-label text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-surface-container-lowest transition-colors">
                <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp for Help
              </button>
              <div className="flex justify-center items-center gap-8 opacity-40 grayscale text-on-surface">
                <span className="material-symbols-outlined" title="Secure Payment">verified_user</span>
                <span className="material-symbols-outlined" title="Global Shipping">public</span>
                <span className="material-symbols-outlined" title="Authenticity Guaranteed">workspace_premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
