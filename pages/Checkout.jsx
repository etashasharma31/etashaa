import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Information, 2: Shipping & Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const tax = subtotal * 0.12;
  const total = subtotal + shipping + tax;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value || value.trim() === '') {
      error = 'Required';
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Invalid email';
    } else if (name === 'phone' && !/^\d{10}$/.test(value.replace(/[\s-]/g, ''))) {
      error = 'Invalid phone';
    } else if (name === 'pincode' && !/^\d{6}$/.test(value)) {
      error = 'Invalid PIN';
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      if (!formData[key] || formData[key].trim() === '') {
        newErrors[key] = 'Required';
        isValid = false;
      } else {
        // Specific validations
        if (key === 'email' && !/\S+@\S+\.\S+/.test(formData[key])) {
          newErrors[key] = 'Invalid email';
          isValid = false;
        }
        if (key === 'phone' && !/^\d{10}$/.test(formData[key].replace(/[\s-]/g, ''))) {
          newErrors[key] = 'Invalid phone';
          isValid = false;
        }
        if (key === 'pincode' && !/^\d{6}$/.test(formData[key])) {
          newErrors[key] = 'Invalid PIN';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!isValid) {
      // Scroll to first error
      const firstError = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return isValid;
  };

  const handleContinueToPayment = () => {
    if (validateForm()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate luxury processing
    setTimeout(() => {
      setStep(3);
      clearCart();
      setIsProcessing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  if (step === 3) {
    return (
      <main className="min-h-screen pt-40 pb-24 bg-surface px-6">
        <div className="max-w-xl mx-auto text-center reveal">
          <div className="relative inline-block mb-12">
            <div className="w-24 h-24 border border-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <span className="material-symbols-outlined text-5xl text-primary font-light">verified</span>
            </div>
            <div className="absolute -inset-4 border border-primary/10 rounded-full animate-ping opacity-20"></div>
          </div>

          <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.5em] text-primary font-bold mb-4 block">Gratitude</span>
          <h1 className="text-4xl md:text-5xl font-noto-serif italic mb-6">Your Order is Placed</h1>
          <p className="font-jakarta-sans text-on-surface-variant text-sm md:text-base leading-relaxed mb-12 max-w-md mx-auto font-light">
            Thank you for choosing Etashaa. Your order <span className="font-bold text-on-surface">#ET-8181</span> is now being curated by our master artisans in the atelier.
          </p>

          <div className="space-y-4 max-w-xs mx-auto">
            <button
              onClick={() => navigate('/order-tracking')}
              className="w-full btn-premium"
            >
              <span>Track Masterpiece</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full btn-premium-outline"
            >
              <span>Return to Atelier</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-surface px-4 md:px-12">
      <div className="max-w-custom grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

        {/* Left Side: Checkout Flow */}
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-12">

            {/* Header */}
            <div>
              <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-3 block">Secure Gateway</span>
              <h1 className="text-4xl md:text-5xl font-noto-serif italic">Checkout</h1>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center gap-6 border-b border-outline-variant/20 pb-8">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? 'bg-on-surface text-white' : 'bg-outline-variant/30 text-outline'}`}>1</div>
                <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= 1 ? 'text-on-surface' : 'text-outline'}`}>Information</span>
              </div>
              <div className="w-8 h-px bg-outline-variant/30"></div>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? 'bg-on-surface text-white' : 'bg-outline-variant/30 text-outline'}`}>2</div>
                <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= 2 ? 'text-on-surface' : 'text-outline'}`}>Payment</span>
              </div>
            </div>

            {step === 1 ? (
              <div className="reveal space-y-12">
                <section>
                  <h2 className="text-xl font-noto-serif mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Contact Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        required
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('firstName')}
                        className={`peer w-full bg-transparent border-b ${errors.firstName && touched.firstName ? 'border-secondary/60' : 'border-outline-variant/30'} py-3 focus:border-primary outline-none text-sm transition-colors`}
                        placeholder=" "
                      />
                      <label className={`absolute left-0 top-3 text-[10px] uppercase tracking-widest ${errors.firstName && touched.firstName ? 'text-secondary' : 'text-outline'} transition-all peer-focus:-top-4 peer-focus:text-primary peer-placeholder-shown:top-3 peer-not-placeholder-shown:-top-4`}>First Name *</label>
                      {errors.firstName && touched.firstName && <span className="absolute right-0 top-3 text-[8px] text-secondary uppercase font-bold tracking-widest">{errors.firstName}</span>}
                    </div>
                    <div className="relative group">
                      <input
                        required
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('lastName')}
                        className={`peer w-full bg-transparent border-b ${errors.lastName && touched.lastName ? 'border-secondary/60' : 'border-outline-variant/30'} py-3 focus:border-primary outline-none text-sm transition-colors`}
                        placeholder=" "
                      />
                      <label className={`absolute left-0 top-3 text-[10px] uppercase tracking-widest ${errors.lastName && touched.lastName ? 'text-secondary' : 'text-outline'} transition-all peer-focus:-top-4 peer-focus:text-primary peer-placeholder-shown:top-3 peer-not-placeholder-shown:-top-4`}>Last Name *</label>
                      {errors.lastName && touched.lastName && <span className="absolute right-0 top-3 text-[8px] text-secondary uppercase font-bold tracking-widest">{errors.lastName}</span>}
                    </div>
                    <div className="relative group">
                      <input
                        required
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        className={`peer w-full bg-transparent border-b ${errors.email && touched.email ? 'border-secondary/60' : 'border-outline-variant/30'} py-3 focus:border-primary outline-none text-sm transition-colors`}
                        placeholder=" "
                      />
                      <label className={`absolute left-0 top-3 text-[10px] uppercase tracking-widest ${errors.email && touched.email ? 'text-secondary' : 'text-outline'} transition-all peer-focus:-top-4 peer-focus:text-primary peer-placeholder-shown:top-3 peer-not-placeholder-shown:-top-4`}>Email Address *</label>
                      {errors.email && touched.email && <span className="absolute right-0 top-3 text-[8px] text-secondary uppercase font-bold tracking-widest">{errors.email}</span>}
                    </div>
                    <div className="relative group">
                      <input
                        required
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur('phone')}
                        className={`peer w-full bg-transparent border-b ${errors.phone && touched.phone ? 'border-secondary/60' : 'border-outline-variant/30'} py-3 focus:border-primary outline-none text-sm transition-colors`}
                        placeholder=" "
                      />
                      <label className={`absolute left-0 top-3 text-[10px] uppercase tracking-widest ${errors.phone && touched.phone ? 'text-secondary' : 'text-outline'} transition-all peer-focus:-top-4 peer-focus:text-primary peer-placeholder-shown:top-3 peer-not-placeholder-shown:-top-4`}>Phone Number *</label>
                      {errors.phone && touched.phone && <span className="absolute right-0 top-3 text-[8px] text-secondary uppercase font-bold tracking-widest">{errors.phone}</span>}
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-noto-serif mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Shipping Destination
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 relative group">
                      <input
                        required
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        onBlur={() => handleBlur('address')}
                        className={`peer w-full bg-transparent border-b ${errors.address && touched.address ? 'border-secondary/60' : 'border-outline-variant/30'} py-3 focus:border-primary outline-none text-sm transition-colors`}
                        placeholder=" "
                      />
                      <label className={`absolute left-0 top-3 text-[10px] uppercase tracking-widest ${errors.address && touched.address ? 'text-secondary' : 'text-outline'} transition-all peer-focus:-top-4 peer-focus:text-primary peer-placeholder-shown:top-3 peer-not-placeholder-shown:-top-4`}>Street Address & Landmark *</label>
                      {errors.address && touched.address && <span className="absolute right-0 top-3 text-[8px] text-secondary uppercase font-bold tracking-widest">{errors.address}</span>}
                    </div>
                    <div className="relative group">
                      <input
                        required
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={() => handleBlur('city')}
                        className={`peer w-full bg-transparent border-b ${errors.city && touched.city ? 'border-secondary/60' : 'border-outline-variant/30'} py-3 focus:border-primary outline-none text-sm transition-colors`}
                        placeholder=" "
                      />
                      <label className={`absolute left-0 top-3 text-[10px] uppercase tracking-widest ${errors.city && touched.city ? 'text-secondary' : 'text-outline'} transition-all peer-focus:-top-4 peer-focus:text-primary peer-placeholder-shown:top-3 peer-not-placeholder-shown:-top-4`}>City / Region *</label>
                      {errors.city && touched.city && <span className="absolute right-0 top-3 text-[8px] text-secondary uppercase font-bold tracking-widest">{errors.city}</span>}
                    </div>
                    <div className="relative group">
                      <input
                        required
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        onBlur={() => handleBlur('state')}
                        className={`peer w-full bg-transparent border-b ${errors.state && touched.state ? 'border-secondary/60' : 'border-outline-variant/30'} py-3 focus:border-primary outline-none text-sm transition-colors`}
                        placeholder=" "
                      />
                      <label className={`absolute left-0 top-3 text-[10px] uppercase tracking-widest ${errors.state && touched.state ? 'text-secondary' : 'text-outline'} transition-all peer-focus:-top-4 peer-focus:text-primary peer-placeholder-shown:top-3 peer-not-placeholder-shown:-top-4`}>State *</label>
                      {errors.state && touched.state && <span className="absolute right-0 top-3 text-[8px] text-secondary uppercase font-bold tracking-widest">{errors.state}</span>}
                    </div>
                    <div className="relative group">
                      <input
                        required
                        name="pincode"
                        type="text"
                        value={formData.pincode}
                        onChange={handleChange}
                        onBlur={() => handleBlur('pincode')}
                        className={`peer w-full bg-transparent border-b ${errors.pincode && touched.pincode ? 'border-secondary/60' : 'border-outline-variant/30'} py-3 focus:border-primary outline-none text-sm transition-colors`}
                        placeholder=" "
                      />
                      <label className={`absolute left-0 top-3 text-[10px] uppercase tracking-widest ${errors.pincode && touched.pincode ? 'text-secondary' : 'text-outline'} transition-all peer-focus:-top-4 peer-focus:text-primary peer-placeholder-shown:top-3 peer-not-placeholder-shown:-top-4`}>Pincode *</label>
                      {errors.pincode && touched.pincode && <span className="absolute right-0 top-3 text-[8px] text-secondary uppercase font-bold tracking-widest">{errors.pincode}</span>}
                    </div>
                  </div>
                </section>

                <div className="pt-8">
                  <button onClick={handleContinueToPayment} className="btn-premium w-full md:w-fit min-w-[240px]">
                    <span>Continue to Payment</span>
                    <span className="material-symbols-outlined arrow">arrow_forward</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="reveal space-y-12">
                <section>
                  <h2 className="text-xl font-noto-serif mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Payment Selection
                  </h2>
                  <div className="space-y-4">
                    {[
                      { id: 'upi', label: 'UPI / Instant Transfer', icon: 'account_balance_wallet' },
                      { id: 'card', label: 'Credit or Debit Card', icon: 'credit_card' },
                      { id: 'net', label: 'Net Banking', icon: 'account_balance' },
                      { id: 'cod', label: 'Cash on Delivery', icon: 'payments' }
                    ].map((method) => (
                      <label key={method.id} className="flex items-center justify-between p-6 border border-outline-variant/30 cursor-pointer hover:border-primary/40 transition-all group relative bg-white overflow-hidden">
                        <div className="flex items-center gap-5 relative z-10">
                          <input type="radio" name="payment" defaultChecked={method.id === 'upi'} className="peer appearance-none w-4 h-4 border border-outline-variant rounded-full checked:border-primary checked:border-[5px] transition-all" />
                          <span className="font-jakarta-sans text-xs uppercase tracking-[0.2em] font-bold">{method.label}</span>
                        </div>
                        <span className="material-symbols-outlined text-outline/20 group-hover:text-primary/40 transition-colors relative z-10">{method.icon}</span>
                      </label>
                    ))}
                  </div>
                </section>

                <div className="pt-8 flex flex-col md:flex-row gap-6 items-center">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="btn-premium w-full md:w-fit min-w-[280px]"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-3">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Processing...
                      </span>
                    ) : (
                      <span>Place Secure Order • {formatPrice(total)}</span>
                    )}
                  </button>
                  <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest text-outline font-bold hover:text-primary transition-colors">Return to shipping</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Order Recap - Refined */}
        <div className="lg:col-span-5 lg:sticky lg:top-36">
          <div className="bg-surface-container-lowest/50 p-8 md:p-10 border border-outline-variant/10 relative">
            <h3 className="text-sm font-jakarta-sans uppercase tracking-[0.3em] mb-10 text-on-surface font-bold">Order Selection</h3>

            <div className="space-y-8 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 group">
                  <div className="w-20 h-24 bg-surface-container overflow-hidden shrink-0 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-0 right-0 bg-primary text-white w-5 h-5 flex items-center justify-center text-[9px] font-bold font-jakarta-sans">{item.quantity}</div>
                  </div>
                  <div className="flex-1">
                    <span className="text-[8px] uppercase tracking-widest text-primary font-bold mb-1 block">{item.category || 'Atelier'} Collection</span>
                    <h4 className="text-[11px] font-noto-serif uppercase tracking-tighter leading-relaxed line-clamp-2 text-on-surface">{item.name}</h4>
                    <p className="text-xs font-bold mt-2 font-jakarta-sans">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-10 border-t border-outline-variant/20">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                <span>Subtotal</span>
                <span className="text-on-surface text-xs">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                <span>Heritage Shipping</span>
                <span className="text-primary text-[10px]">{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                <span>GST (12%)</span>
                <span className="text-on-surface text-xs">{formatPrice(tax)}</span>
              </div>

              <div className="flex justify-between items-baseline pt-10 border-t border-outline-variant/20">
                <span className="font-noto-serif text-xl italic text-on-surface">Total</span>
                <span className="text-2xl font-bold font-jakarta-sans text-on-surface">{formatPrice(total)}</span>
              </div>
              <p className="text-[9px] text-outline uppercase tracking-[0.15em] font-bold">Secure Global Transaction</p>
            </div>

            {/* Support - Integrated */}
            <div className="mt-12 flex items-center gap-4 p-4 bg-primary/5 border border-primary/10">
              <span className="material-symbols-outlined text-primary text-xl">verified</span>
              <p className="text-[9px] text-on-surface-variant leading-relaxed">
                Your order is protected by our <span className="font-bold">Heritage Guarantee</span>. For assistance, contact our concierge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
