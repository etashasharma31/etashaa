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
                  className={`shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden border-2 transition-all duration-300 ${
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
          <div className="flex-1 relative overflow-hidden bg-surface-container-lowest group aspect-3/4">
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
                  <span className="text-outline w-20 shrink-0 uppercase tracking-widest text-[10px] font-bold">Fabric</span>
                  <span className="text-on-surface">{product.fabric}</span>
                </div>
              )}
              {product.workType && (
                <div className="flex gap-3 text-xs font-jakarta-sans">
                  <span className="text-outline w-20 shrink-0 uppercase tracking-widest text-[10px] font-bold">Work</span>
                  <span className="text-on-surface">{product.workType}</span>
                </div>
              )}
              {product.availability && (
                <div className="flex gap-3 text-xs font-jakarta-sans">
                  <span className="text-outline w-20 shrink-0 uppercase tracking-widest text-[10px] font-bold">Status</span>
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
                className={`btn-premium-outline group w-full py-4! md:py-5! transition-all ${addedToCart ? 'border-green-600! text-green-600!' : ''}`}
              >
                <span>{addedToCart ? '✓ Added to Cart' : 'Add to Cart'}</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-premium group w-full py-4! md:py-5! bg-primary-container! border-primary-container!"
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
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
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

      {/* Customer Reviews Section */}
      <CustomerReviews productId={id} productName={product?.name} />
    </main>
  );
};

// Star Rating Component
const StarRating = ({ rating, size = 'sm' }) => {
  const sizeClass = size === 'sm' ? 'text-[14px]' : 'text-[18px]';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} className={`material-symbols-outlined ${sizeClass} ${star <= rating ? 'text-primary-container' : 'text-outline/20'}`}
          style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}>
          star
        </span>
      ))}
    </div>
  );
};

// Reviews Database (curated per product type)
const reviewsDB = [
  { id: 1, name: 'Priya Sharma', avatar: 'P', rating: 5, date: 'March 2025', title: 'A dream come true', body: 'I wore this for my wedding and received compliments all night. The craftsmanship is beyond words — every thread, every bead is placed with such intention. Etashaa truly creates heirlooms.', size: 'M', verified: true },
  { id: 2, name: 'Ananya R.', avatar: 'A', rating: 5, date: 'February 2025', title: 'Absolutely breathtaking', body: 'The quality is exceptional. The fabric feels incredibly luxurious and the embroidery is so detailed. Delivery was on time and the packaging was beautiful — felt like receiving a gift.', size: 'S', verified: true },
  { id: 3, name: 'Meera Kapoor', avatar: 'M', rating: 4, date: 'January 2025', title: 'Worth every penny', body: 'Stunning piece, exactly as shown. I had to make a minor alteration to the blouse but the team was incredibly helpful. The lehenga itself is perfection and I felt like royalty.', size: 'L', verified: true },
  { id: 4, name: 'Sonia V.', avatar: 'S', rating: 5, date: 'December 2024', title: 'My most treasured outfit', body: "I've attended three Etashaa weddings now and always admired the designs. Finally got my own and it's even more beautiful in person. The drape is perfect and falls exactly right.", size: 'M', verified: true },
  { id: 5, name: 'Kavya Reddy', avatar: 'K', rating: 5, date: 'November 2024', title: 'Exceptional quality', body: 'From the consultation to the final delivery, the experience was flawless. The team was so attentive and the lehenga was everything I envisioned. My photos are magazine-worthy!', size: 'XL', verified: true },
];

const CustomerReviews = ({ productId, productName }) => {
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, title: '', body: '', size: '' });
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);

  const avgRating = (reviewsDB.reduce((acc, r) => acc + r.rating, 0) / reviewsDB.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map(s => ({ star: s, count: reviewsDB.filter(r => r.rating === s).length }));

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setShowForm(false);
  };

  return (
    <section className="mt-20 pt-16 border-t border-outline-variant/10 px-4 md:px-12 max-w-custom mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-3 block">Verified Reviews</span>
          <h2 className="font-noto-serif text-3xl italic text-on-surface">What Brides Say</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-premium-outline flex items-center gap-2 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[16px]">edit</span>
          <span>Write a Review</span>
        </button>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14 p-8 bg-surface-container-lowest/50 border border-outline-variant/10">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-noto-serif text-7xl text-on-surface mb-2">{avgRating}</span>
          <StarRating rating={Math.round(Number(avgRating))} size="lg" />
          <span className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline mt-2">{reviewsDB.length} verified reviews</span>
        </div>
        <div className="md:col-span-2 flex flex-col justify-center gap-3">
          {dist.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-4">
              <span className="font-jakarta-sans text-[10px] text-outline w-4 font-bold">{star}</span>
              <span className="material-symbols-outlined text-primary-container text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <div className="flex-1 h-1.5 bg-outline-variant/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-700"
                  style={{ width: `${(count / reviewsDB.length) * 100}%` }}
                />
              </div>
              <span className="font-jakarta-sans text-[10px] text-outline w-4">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Form */}
      {showForm && (
        <div className="mb-14 p-8 border border-primary/20 bg-primary/5">
          <h3 className="font-noto-serif text-xl italic mb-8 text-on-surface">Share Your Experience</h3>
          {submitted ? (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-5xl text-primary mb-4 block">favorite</span>
              <p className="font-noto-serif text-xl italic text-on-surface">Thank you for your review!</p>
              <p className="font-jakarta-sans text-sm text-on-surface-variant mt-2">Your review is under moderation and will appear shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline font-bold block mb-3">Your Name *</label>
                  <input required type="text" value={newReview.name} onChange={e => setNewReview(p => ({ ...p, name: e.target.value }))}
                    className="w-full border border-outline-variant/30 bg-transparent px-5 py-4 font-jakarta-sans text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline font-bold block mb-3">Size Purchased</label>
                  <div className="relative group/dropdown">
                    <button 
                      type="button"
                      onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                      className="w-full border border-outline-variant/30 bg-transparent px-5 py-4 font-jakarta-sans text-sm flex justify-between items-center hover:border-primary transition-colors"
                    >
                      <span className={newReview.size ? 'text-on-surface' : 'text-outline/50'}>
                        {newReview.size || 'Select size'}
                      </span>
                      <span className={`material-symbols-outlined text-lg transition-transform duration-300 ${showSizeDropdown ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    
                    {showSizeDropdown && (
                      <div className="absolute top-full left-0 w-full z-20 bg-white border border-outline-variant/30 shadow-2xl mt-1 animate-in fade-in slide-in-from-top-2 duration-300">
                        {['S', 'M', 'L', 'XL', 'Custom Size'].map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => { setNewReview(p => ({ ...p, size: s })); setShowSizeDropdown(false); }}
                            className="w-full text-left px-5 py-3.5 hover:bg-primary/5 hover:text-primary transition-colors font-jakarta-sans text-sm border-b border-outline-variant/5 last:border-0"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline font-bold block mb-3">Your Rating *</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button"
                      onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewReview(p => ({ ...p, rating: star }))}>
                      <span className="material-symbols-outlined text-[28px] transition-colors"
                        style={{
                          color: star <= (hoverRating || newReview.rating) ? '#c8a96a' : '#d1d5db',
                          fontVariationSettings: star <= (hoverRating || newReview.rating) ? "'FILL' 1" : "'FILL' 0"
                        }}>star</span>
                    </button>
                  ))}
                  <span className="font-jakarta-sans text-sm text-outline ml-2">
                    {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][hoverRating || newReview.rating]}
                  </span>
                </div>
              </div>
              <div>
                <label className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline font-bold block mb-3">Review Title *</label>
                <input required type="text" value={newReview.title} onChange={e => setNewReview(p => ({ ...p, title: e.target.value }))}
                  className="w-full border border-outline-variant/30 bg-transparent px-5 py-4 font-jakarta-sans text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Summarize your experience" />
              </div>
              <div>
                <label className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline font-bold block mb-3">Your Review *</label>
                <textarea required rows={4} value={newReview.body} onChange={e => setNewReview(p => ({ ...p, body: e.target.value }))}
                  className="w-full border border-outline-variant/30 bg-transparent px-5 py-4 font-jakarta-sans text-sm focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tell other brides about your experience..." />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-premium"><span>Submit Review</span></button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-premium-outline"><span>Cancel</span></button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Review Cards */}
      <div className="space-y-8">
        {reviewsDB.map((review, i) => (
          <div key={review.id} className={`p-8 border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-lowest/30'}`}>
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-noto-serif text-xl text-primary font-bold">
                  {review.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-jakarta-sans text-sm font-bold text-on-surface">{review.name}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 font-jakarta-sans text-[9px] uppercase tracking-widest text-green-700 font-bold">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>Verified
                      </span>
                    )}
                  </div>
                  <span className="font-jakarta-sans text-[10px] text-outline">{review.date} · Size: {review.size}</span>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <h4 className="font-noto-serif text-base italic text-on-surface mb-2">{review.title}</h4>
            <p className="font-jakarta-sans text-sm text-on-surface-variant leading-relaxed">{review.body}</p>
          </div>
        ))}
      </div>

      {/* Book Appointment CTA */}
      <div className="mt-20 p-10 md:p-14 bg-[#1c1c1a] text-center">
        <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-4 block">Private Atelier</span>
        <h3 className="font-noto-serif text-3xl md:text-4xl italic text-white mb-4">Love This Piece?</h3>
        <p className="font-jakarta-sans text-sm text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
          Book a private consultation with our designers to customize this design for your special day.
        </p>
        <a href="/book-appointment" className="inline-flex items-center gap-3 border border-primary/60 text-white px-10 py-4 font-jakarta-sans text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary hover:border-primary transition-all duration-300 group">
          <span className="material-symbols-outlined text-primary text-[16px] group-hover:text-white transition-colors">calendar_month</span>
          Book Your Appointment
        </a>
      </div>
    </section>
  );
};

export default ProductDetail;
