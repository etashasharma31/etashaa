import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { bridalProducts, editProducts, sareeProducts, festiveProducts } from '../data';

const allProducts = [...bridalProducts, ...festiveProducts, ...sareeProducts, ...editProducts];

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('About Product');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = allProducts.find(p => p.id === id);

  useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedSize(null);
    setSizeError(false);
    setAddedToCart(false);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center pt-32 pb-24">
        <span className="material-symbols-outlined text-6xl text-outline/30 mb-6">search_off</span>
        <h2 className="font-noto-serif text-3xl italic mb-4 text-on-surface/60">Product Not Found</h2>
        <p className="text-sm text-on-surface-variant mb-8">The piece you're looking for may no longer be available.</p>
        <Link to="/bridal-collection" className="btn-premium">Explore Collections</Link>
      </main>
    );
  }

  // Build image gallery
  const images = product.images
    ? product.images
    : product.image
    ? [product.image]
    : [];

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      document.getElementById('size-selection')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSizeError(false);
    addToCart({ ...product, size: selectedSize, quantity });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      document.getElementById('size-selection')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSizeError(false);
    addToCart({ ...product, size: selectedSize, quantity });
    navigate('/checkout');
  };

  return (
    <main className="pb-24 max-w-custom pt-5 px-4 md:px-12 mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-outline/50 mb-8 font-jakarta-sans">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/bridal-collection" className="hover:text-primary transition-colors">Collections</Link>
        <span>/</span>
        <span className="text-on-surface">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

        {/* Left Side: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[700px] pr-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`flex-shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden border-2 transition-all duration-300 ${
                    selectedImageIndex === i
                      ? 'border-primary shadow-lg scale-105'
                      : 'border-outline-variant/20 hover:border-primary/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="flex-1 relative overflow-hidden bg-surface-container-lowest group aspect-[3/4]">
            {images.length > 0 ? (
              <>
                <img
                  key={selectedImageIndex}
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                {/* Navigation arrows if multiple images */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(i => (i - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white shadow-md"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(i => (i + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white shadow-md"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </>
                )}
                {/* Discount badge */}
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 font-jakarta-sans">
                    {product.discount}% Off
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-outline/30">
                <span className="material-symbols-outlined text-6xl">image</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="lg:col-span-5 flex flex-col space-y-8">

          {/* Header */}
          <div>
            {product.category && (
              <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-3 block">
                {product.category}
              </span>
            )}
            <h1 className="font-noto-serif text-3xl md:text-4xl italic tracking-tight text-on-surface leading-tight mb-4">
              {product.name}
            </h1>
            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="font-jakarta-sans text-2xl font-bold text-on-surface">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-outline line-through text-sm font-jakarta-sans">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            <p className="text-[10px] font-jakarta-sans text-outline/60 mt-1 uppercase tracking-widest">
              Inclusive of all taxes
            </p>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-outline-variant/10">
            {[
              { icon: 'local_shipping', label: 'Free Shipping' },
              { icon: 'verified', label: 'Authenticity Guaranteed' },
              { icon: 'support_agent', label: 'Concierge Support' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <span className="material-symbols-outlined text-primary text-[22px]">{icon}</span>
                <span className="font-jakarta-sans text-[9px] uppercase tracking-widest text-on-surface-variant font-bold leading-tight">{label}</span>
              </div>
            ))}
          </div>

          {/* Product Meta */}
          {(product.fabric || product.workType || product.availability) && (
            <div className="space-y-2">
              {product.fabric && (
                <div className="flex gap-3 text-xs font-jakarta-sans">
                  <span className="text-outline w-20 flex-shrink-0 uppercase tracking-widest text-[10px] font-bold">Fabric</span>
                  <span className="text-on-surface">{product.fabric}</span>
                </div>
              )}
              {product.workType && (
                <div className="flex gap-3 text-xs font-jakarta-sans">
                  <span className="text-outline w-20 flex-shrink-0 uppercase tracking-widest text-[10px] font-bold">Work</span>
                  <span className="text-on-surface">{product.workType}</span>
                </div>
              )}
              {product.availability && (
                <div className="flex gap-3 text-xs font-jakarta-sans">
                  <span className="text-outline w-20 flex-shrink-0 uppercase tracking-widest text-[10px] font-bold">Status</span>
                  <span className="text-green-700 font-bold">{product.availability}</span>
                </div>
              )}
            </div>
          )}

          {/* Selection Blocks */}
          <div className="space-y-6">
            <div className="space-y-4" id="size-selection">
              <div className="flex justify-between items-center">
                <label className={`text-[10px] tracking-widest uppercase font-bold ${sizeError ? 'text-secondary' : 'text-outline'}`}>
                  Select Size * {sizeError && <span className="ml-2 normal-case italic">(Selection Required)</span>}
                </label>
                <button onClick={() => setIsModalOpen(true)} className="text-[10px] tracking-widest uppercase underline hover:text-primary transition-colors">
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3">
                {['S', 'M', 'L', 'XL', 'Custom Size'].map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`px-4 py-2.5 md:px-5 md:py-3 border text-[10px] uppercase tracking-widest font-bold transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-on-primary shadow-lg'
                        : 'border-outline-variant/30 hover:border-primary hover:bg-primary-container/10'
                    } ${sizeError && !selectedSize ? 'border-secondary/50 animate-pulse' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <label className="text-[10px] tracking-widest uppercase text-outline font-bold block mb-4">Quantity *</label>
                <div className="flex items-center border border-outline-variant/30 w-fit">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-2.5 md:px-5 md:py-3 hover:bg-surface-container transition-colors"
                  >
                    —
                  </button>
                  <span className="px-6 py-2.5 md:px-8 md:py-3 text-xs md:text-sm font-bold border-x border-outline-variant/30">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-2.5 md:px-5 md:py-3 hover:bg-surface-container transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-3">
              <button
                id="buy-btn"
                onClick={handleAddToCart}
                className={`btn-premium-outline group w-full !py-4 md:!py-5 transition-all ${addedToCart ? '!border-green-600 !text-green-600' : ''}`}
              >
                <span>{addedToCart ? '✓ Added to Cart' : 'Add to Cart'}</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-premium group w-full !py-4 md:!py-5 !bg-[#c8a96a] !border-[#c8a96a]"
              >
                <span>Buy It Now</span>
              </button>
            </div>

            {/* Accordions */}
            <div className="space-y-1 pt-6">
              {[
                { title: 'About Product', content: 'Exquisitely handcrafted with the finest fabrics and intricate embroidery. A masterpiece from the Etashaa atelier.' },
                { title: 'Shipping Policy', content: 'Complimentary shipping on all bridal orders. Dispatched with secure luxury packaging within 24-48 hours.' },
                { title: 'Personalized Recommendations', content: 'Our designers can suggest matching jewelry and accessories to complete your ensemble.' }
              ].map(acc => {
                const isOpen = openAccordion === acc.title;
                return (
                  <div key={acc.title} className="border-b border-outline-variant/10">
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : acc.title)}
                      className="w-full py-5 flex justify-between items-center group cursor-pointer"
                    >
                      <span className="font-noto-serif text-sm tracking-tight text-on-surface group-hover:text-primary transition-colors">{acc.title}</span>
                      <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>add</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-xs font-jakarta-sans text-on-surface-variant leading-relaxed tracking-wide">{acc.content}</p>
                    </div>
                  </div>
                );
              })}
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
            <h3 className="font-noto-serif text-2xl italic mb-6">Size Guide</h3>
            <table className="w-full text-xs font-jakarta-sans border-collapse">
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
            <p className="font-jakarta-sans text-xs text-outline mt-6">All measurements in inches. For custom sizing, chat with our team.</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
