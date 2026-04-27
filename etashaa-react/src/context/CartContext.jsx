import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('etashaa_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('etashaa_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showToast(`${product.name} added to bag`);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const showToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount }}>
      {children}
      {/* Toast UI */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-[#1c1c1a] text-[#fcf9f6] px-8 py-4 font-jakarta-sans text-xs uppercase tracking-widest shadow-2xl transition-all duration-500 animate-fadeUp">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#c8a96a]">check_circle</span>
              {toast.message}
            </div>
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
};
