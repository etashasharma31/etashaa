import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
    paymentMethod: 'upi'
  });

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const tax = subtotal * 0.12;
  const total = subtotal + shipping + tax;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) {
      // Simulate payment processing
      setTimeout(() => {
        setStep(3);
        clearCart();
      }, 1500);
    }
  };

  if (step === 3) {
    return (
      <main className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-surface px-6">
        <div className="max-w-lg w-full text-center space-y-8 reveal">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
          </div>
          <h1 className="text-4xl font-noto-serif">Order Confirmed</h1>
          <p className="font-jakarta-sans text-on-surface-variant leading-relaxed">
            Thank you for choosing Etashaa. Your order #ET-8181 has been successfully placed and is now being curated by our artisans.
          </p>
          <div className="pt-8 space-y-4">
            <button 
              onClick={() => navigate('/order-tracking')}
              className="w-full btn-premium"
            >
              <span>Track Your Order</span>
            </button>
            <button 
              onClick={() => navigate('/')}
              className="w-full btn-premium-outline"
            >
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-surface px-6 md:px-12">
      <div className="max-w-custom grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Forms */}
        <div className="lg:col-span-7 space-y-12">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-outline/20 text-outline'}`}>1</div>
            <div className="h-px w-12 bg-outline/20"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-outline/20 text-outline'}`}>2</div>
            <div className="h-px w-12 bg-outline/20"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-outline/20 text-outline'}`}>3</div>
          </div>

          {step === 1 ? (
            <div className="reveal">
              <h2 className="text-3xl font-noto-serif mb-8">Shipping Address</h2>
              <form onSubmit={handleNextStep} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline">First Name</label>
                  <input required type="text" placeholder="Janhavi" className="w-full bg-transparent border-b border-outline/20 py-3 focus:border-primary outline-none text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline">Last Name</label>
                  <input required type="text" placeholder="Sharma" className="w-full bg-transparent border-b border-outline/20 py-3 focus:border-primary outline-none text-sm" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline">Email Address</label>
                  <input required type="email" placeholder="janhavi@example.com" className="w-full bg-transparent border-b border-outline/20 py-3 focus:border-primary outline-none text-sm" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline">Street Address</label>
                  <input required type="text" placeholder="Apartment, suite, unit, etc." className="w-full bg-transparent border-b border-outline/20 py-3 focus:border-primary outline-none text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline">City</label>
                  <input required type="text" placeholder="New Delhi" className="w-full bg-transparent border-b border-outline/20 py-3 focus:border-primary outline-none text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline">Pincode</label>
                  <input required type="text" placeholder="110001" className="w-full bg-transparent border-b border-outline/20 py-3 focus:border-primary outline-none text-sm" />
                </div>
                <div className="md:col-span-2 pt-8">
                  <button type="submit" className="w-full btn-premium">
                    <span>Continue to Payment</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="reveal">
              <h2 className="text-3xl font-noto-serif mb-8">Payment Method</h2>
              <form onSubmit={handleNextStep} className="space-y-6">
                {['UPI (PhonePe, GPay)', 'Credit / Debit Card', 'Net Banking', 'Cash on Delivery'].map((method) => (
                  <label key={method} className="flex items-center justify-between p-6 border border-outline/20 cursor-pointer hover:bg-surface-container transition-all group">
                    <div className="flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="payment" 
                        defaultChecked={method.includes('UPI')}
                        className="w-4 h-4 text-primary focus:ring-0" 
                      />
                      <span className="font-jakarta-sans text-sm uppercase tracking-widest">{method}</span>
                    </div>
                    <span className="material-symbols-outlined text-outline/30 group-hover:text-primary transition-colors">
                      {method.includes('Card') ? 'credit_card' : method.includes('UPI') ? 'account_balance_wallet' : 'payments'}
                    </span>
                  </label>
                ))}
                <div className="pt-8">
                  <button type="submit" className="w-full btn-premium">
                    <span>Pay {formatPrice(total)}</span>
                  </button>
                  <button type="button" onClick={() => setStep(1)} className="w-full mt-4 text-[10px] uppercase tracking-widest text-outline hover:text-primary transition-colors">Return to Shipping</button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Side: Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 md:p-12 editorial-shadow sticky top-32 border border-outline-variant/10">
            <h3 className="font-noto-serif text-xl mb-8 border-b border-outline-variant/10 pb-4 uppercase tracking-widest">Order Summary</h3>
            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-surface-container overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-noto-serif uppercase tracking-tighter line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-outline mt-1 uppercase tracking-widest">Qty: {item.quantity}</p>
                    <p className="text-xs font-bold mt-2">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 pt-6 border-t border-outline-variant/10">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-on-surface-variant">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-on-surface-variant">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-on-surface-variant">
                <span>GST (12%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-outline/10">
                <span className="font-noto-serif text-lg font-bold">Total</span>
                <span className="text-xl font-bold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
