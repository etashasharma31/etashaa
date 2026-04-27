import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { bridalProducts, editProducts, sareeProducts, festiveProducts } from '../data';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');

  // Combine all products to find the one we need
  const allProducts = [...bridalProducts, ...editProducts, ...sareeProducts, ...festiveProducts];
  const foundProduct = allProducts.find(p => p.id === id);

  const product = foundProduct || {
    id: id || 'PROD_001',
    name: 'Maroon Bridal Embroidered Lehenga Set',
    price: 12999,
    oldPrice: 18999,
    discount: 30,
    image: '/images/prod_royal_maharani_lehenga.png',
    category: 'Bridal Collection'
  };

  useEffect(() => {
    const handleScroll = () => {
      const buyBtn = document.getElementById('buy-btn');
      if (buyBtn) {
        const rect = buyBtn.getBoundingClientRect();
        setIsStickyVisible(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <main className="pb-24 max-w-custom pt-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Editorial Gallery */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="relative bg-surface-container aspect-[3/4] overflow-hidden group">
            <img 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              alt={product.name} 
              src={product.image} 
            />
            <div className="absolute bottom-6 right-6 bg-surface/80 backdrop-blur-sm px-4 py-2 text-xs font-label tracking-widest uppercase">Front View</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low aspect-[4/5] overflow-hidden">
              <img className="w-full h-full object-cover" alt="Detail 1" src="/images/social_embroidery.png" />
            </div>
            <div className="bg-surface-container-low aspect-[4/5] overflow-hidden">
              <img className="w-full h-full object-cover" alt="Detail 2" src="/images/prod_emerald_zardosi.png" />
            </div>
            <div className="relative bg-surface-container-low aspect-[4/5] overflow-hidden group cursor-pointer">
              <img className="w-full h-full object-cover opacity-80" alt="Video Preview" src="/images/hero_bridal_elegance.png" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-on-surface opacity-60 group-hover:opacity-100 transition-opacity">play_circle</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          <div className="space-y-3">
            <nav className="flex text-[10px] tracking-widest uppercase text-outline mb-4">
              <Link className="hover:text-primary" to="/">Home</Link>
              <span className="mx-2">/</span>
              <Link className="hover:text-primary" to="/bridal-collection">Bridal</Link>
              <span className="mx-2">/</span>
              <span className="text-on-surface">Lehenga Sets</span>
            </nav>
            <h1 className="font-headline text-4xl md:text-5xl leading-tight text-on-surface">{product.name}</h1>
            <div className="flex items-center gap-3">
              <span className="text-[#c8a96a] text-sm">★★★★★</span>
              <span className="font-body text-xs text-on-surface-variant">(127 reviews)</span>
              <span className="text-[10px] uppercase tracking-widest text-primary border-l border-outline-variant pl-3">Verified Purchases</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-headline text-primary">{formatPrice(product.price)}</span>
              <span className="text-outline/50 line-through text-lg font-body">{formatPrice(product.oldPrice)}</span>
              <span className="bg-secondary text-on-primary px-3 py-1 text-[10px] font-label tracking-widest uppercase">{product.discount}% OFF</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary">
              <span className="material-symbols-outlined text-lg">local_fire_department</span>
              <span className="text-xs font-label tracking-wide font-bold uppercase">Hurry Up! Only 3 left in stock</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[20%] transition-all duration-1000"></div>
            </div>
            <div className="flex items-center gap-2 text-outline/70 text-[11px] py-1 border-b border-outline-variant/10 pb-4">
                <span className="material-symbols-outlined text-sm">visibility</span>
                <span>54 people are watching this product right now</span>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-1 gap-3 border-b border-outline-variant/10 pb-6">
            {[
                { icon: 'verified', text: '100% Authentic Products' },
                { icon: 'inventory_2', text: 'Secure & Luxury Packaging' },
                { icon: 'local_shipping', text: 'Orders Dispatched within 24 hours' }
            ].map(item => (
                <div key={item.text} className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                    {item.text}
                </div>
            ))}
          </div>

          {/* Selection Blocks */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] tracking-widest uppercase text-outline font-bold">Quantity</label>
                <button onClick={() => setIsModalOpen(true)} className="text-[10px] tracking-widest uppercase underline hover:text-primary transition-colors">Size Guide</button>
              </div>
              <div className="flex items-center border border-outline-variant/30 w-fit">
                <button className="px-5 py-3 hover:bg-surface-container transition-colors">—</button>
                <span className="px-8 py-3 text-sm font-bold border-x border-outline-variant/30">1</span>
                <button className="px-5 py-3 hover:bg-surface-container transition-colors">+</button>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                {['S', 'M', 'L', 'XL', 'Custom Size'].map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-3 border text-[10px] uppercase tracking-widest font-bold transition-all ${selectedSize === size ? 'border-primary bg-primary text-on-primary' : 'border-outline-variant/30 hover:border-primary hover:bg-primary-container/10'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-3">
              <button 
                id="buy-btn" 
                onClick={() => addToCart(product)} 
                className="w-full bg-white border border-[#1c1c1a] text-[#1c1c1a] py-5 font-label tracking-widest uppercase transition-all duration-500 text-xs flex justify-center items-center group active:scale-[0.98] font-bold"
              >
                Add to Bag
              </button>
              <button className="w-full bg-[#c8a96a] hover:bg-[#b8995a] text-white py-5 font-label tracking-widest uppercase transition-all duration-500 text-xs flex justify-center items-center font-bold shadow-md">
                Buy It Now
              </button>
            </div>

            {/* Accordions */}
            <div className="space-y-1 pt-6">
                {[
                    { title: 'About Product', content: 'Exquisitely handcrafted with the finest fabrics and intricate embroidery. A masterpiece from the Etashaa atelier.' },
                    { title: 'Shipping Policy', content: 'Complimentary shipping on all bridal orders. Dispatched with secure luxury packaging within 24-48 hours.' },
                    { title: 'Personalized Recommendations', content: 'Our designers can suggest matching jewelry and accessories to complete your ensemble.' }
                ].map(acc => (
                    <div key={acc.title} className="border-b border-outline-variant/10">
                        <button className="w-full py-5 flex justify-between items-center group">
                            <span className="font-noto-serif text-sm tracking-tight text-on-surface group-hover:text-primary transition-colors">{acc.title}</span>
                            <span className="material-symbols-outlined text-primary">add</span>
                        </button>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div className="bg-surface max-w-lg w-full mx-4 p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 hover:bg-surface-container transition-colors p-1">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-headline text-2xl italic mb-6">Size Guide</h3>
            <table className="w-full text-xs font-body border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest text-outline">Size</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest text-outline">Waist (in)</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest text-outline">Hip (in)</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest text-outline">Length (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <tr key={size} className={`py-3 ${selectedSize === size ? 'bg-primary-container/10' : ''}`}>
                    <td className={`py-3 font-semibold ${selectedSize === size ? 'text-primary' : ''}`}>{size} {selectedSize === size ? '✓' : ''}</td>
                    <td className="py-3">{size === 'S' ? '26-28' : size === 'M' ? '28-30' : size === 'L' ? '30-32' : '32-34'}</td>
                    <td className="py-3">{size === 'S' ? '36-38' : size === 'M' ? '38-40' : size === 'L' ? '40-42' : '42-44'}</td>
                    <td className="py-3">{size === 'S' || size === 'M' ? '42' : '43'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="font-body text-xs text-outline mt-6">All measurements in inches. For custom sizing, chat with our team.</p>
          </div>
        </div>
      )}

      {/* Sticky Buy Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-[#1c1c1a] text-[#fcf9f6] px-6 py-4 flex items-center justify-between gap-4 transition-transform duration-400 ${isStickyVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div>
          <p className="font-headline text-sm">{product.name}</p>
          <p className="font-body text-xs text-[#fcf9f6]/60">Size: {selectedSize} &nbsp;·&nbsp; {formatPrice(product.price)}</p>
        </div>
        <button onClick={() => addToCart(product)} className="bg-primary text-on-primary px-8 py-3 text-xs uppercase tracking-widest font-label hover:bg-secondary transition-all duration-300">Add to Bag</button>
      </div>
    </main>
  );
};

export default ProductDetail;
