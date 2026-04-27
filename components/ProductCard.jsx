import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col product-card cursor-pointer transition-all duration-500 hover:z-30">
      <div className="aspect-[3/4] overflow-hidden bg-surface-container mb-6 relative">
        <img 
          onClick={() => navigate(`/product/${product.id}`)} 
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 will-change-transform" 
          alt={product.name} 
          src={product.image}
        />
        <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-surface/80 backdrop-blur-sm hover:bg-surface transition-colors">
          <span className="material-symbols-outlined text-on-surface text-xl">favorite</span>
        </button>
        {product.discount && (
          <div className="absolute top-4 left-4">
            <span className="bg-[#a13c46] text-white text-[9px] tracking-widest uppercase px-3 py-1 font-jakarta-sans">{product.discount}% OFF</span>
          </div>
        )}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }} 
          className="absolute bottom-0 left-0 w-full bg-[#735b24] text-white py-4 translate-y-full group-hover:translate-y-0 transition-all duration-500 flex justify-center items-center gap-3 z-20 font-jakarta-sans uppercase tracking-[0.2em] text-[9px] font-bold"
        >
          <span className="material-symbols-outlined text-sm">shopping_cart</span>
          <span>Add to Cart</span>
        </div>
      </div>
      <div onClick={() => navigate(`/product/${product.id}`)} className="text-center space-y-2">
        <h3 className="font-noto-serif text-lg tracking-tight group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="flex items-center justify-center gap-3">
          <span className="text-primary font-medium">₹{product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="text-outline/60 line-through text-xs">₹{product.oldPrice.toLocaleString()}</span>
          )}
          {product.discount && (
            <span className="text-secondary text-[10px] font-bold uppercase tracking-tighter">{product.discount}% OFF</span>
          )}
        </div>
        <div className="flex justify-center gap-0.5 text-[#c8a96a] text-xs">★★★★★</div>
      </div>
    </div>
  );
};

export default ProductCard;
