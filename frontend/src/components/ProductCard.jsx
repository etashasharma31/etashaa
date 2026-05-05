import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col product-card cursor-pointer transition-all duration-500">
      <div className="aspect-[3/4] overflow-hidden bg-surface-container mb-4 relative product-card-inner">
        <img 
          onClick={() => navigate(`/product/${product.id}`)} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 will-change-transform" 
          alt={product.name} 
          src={product.image}
          loading="lazy"
        />
        
        {/* Wishlist Button - Top Right */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-transparent transition-all z-20 group/heart"
        >
          <span 
            className={`material-symbols-outlined text-[18px] md:text-xl transition-all duration-300 ${isFavorited ? 'text-[#842029] fill-1 scale-110' : 'text-on-surface/60 hover:text-primary group-hover/heart:scale-110'}`} 
            style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Badge - Top Left */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col gap-1 z-10">
          {product.discount && (
            <span className="bg-[#a13c46] text-white text-[7px] md:text-[8px] tracking-widest uppercase px-2 py-0.5 font-jakarta-sans font-bold w-fit">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Quick Add - Desktop Only Hover */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }} 
          className="absolute bottom-0 left-0 w-full bg-on-surface/90 text-white py-3 translate-y-full group-hover:translate-y-0 transition-all duration-500 hidden md:flex justify-center items-center gap-3 z-20 font-jakarta-sans uppercase tracking-[0.2em] text-[9px] font-bold backdrop-blur-sm"
        >
          <span className="material-symbols-outlined text-sm">shopping_bag</span>
          <span>Add Piece to Bag</span>
        </div>
      </div>

      {/* Product Info - Refined Typography */}
      <div onClick={() => navigate(`/product/${product.id}`)} className="space-y-1.5 px-1">
        <h3 className="font-jakarta-sans text-[10px] md:text-xs tracking-wide uppercase text-outline/80 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="flex items-center gap-3">
          <span className="text-on-surface font-bold text-xs md:text-sm font-jakarta-sans">₹ {product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="text-outline/40 line-through text-[10px] md:text-xs">₹ {product.oldPrice.toLocaleString()}</span>
          )}
        </div>
        
        {/* Stars - Mini */}
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5 text-[#c8a96a] text-[8px] md:text-[10px]">★★★★★</div>
          <span className="text-[8px] text-outline/40 uppercase tracking-tighter">(4.8)</span>
        </div>

        {/* Color Swatches - Miniature */}
        <div className="flex gap-1.5 pt-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#842029] border border-outline-variant/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1a] border border-outline-variant/20"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
