import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for a single order
  const order = {
    id: id || 'ET-8181',
    date: 'April 24, 2026',
    status: 'Shipped',
    estimatedDelivery: 'April 30, 2026',
    items: [
      {
        id: 1,
        name: 'Heritage Zardosi Bridal Lehenga',
        price: 185000,
        image: '/images/bridal_01.jpg',
        category: 'Bridal Collection'
      }
    ],
    shippingAddress: {
      name: 'Janhavi Sharma',
      address: 'A-42, Hemkunt Tower, Nehru Place',
      city: 'New Delhi',
      pincode: '110019',
      phone: '+91 99999 88888'
    },
    payment: {
      method: 'UPI (PhonePe)',
      subtotal: 185000,
      shipping: 0,
      tax: 22200,
      total: 207200
    },
    timeline: [
      { status: 'Order Placed', date: 'April 24, 10:30 AM', active: true },
      { status: 'Packed', date: 'April 25, 02:15 PM', active: true },
      { status: 'Shipped', date: 'April 26, 09:00 AM', active: true },
      { status: 'Out for Delivery', date: 'Expected April 30', active: false },
      { status: 'Delivered', date: 'Expected April 30', active: false }
    ]
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-surface px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <Link to="/my-orders" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-outline hover:text-primary transition-colors mb-4">
              <span className="material-symbols-outlined text-xs">arrow_back</span> Back to Orders
            </Link>
            <h1 className="text-4xl font-noto-serif">Order Details</h1>
            <p className="text-xs text-outline tracking-widest uppercase mt-2">Order ID: {order.id} • {order.date}</p>
          </div>
          <div className="flex gap-4">
            <button className="btn-premium-outline py-3! px-6!">
              <span>Download Invoice</span>
            </button>
            <button 
              onClick={() => navigate('/order-tracking')}
              className="btn-premium py-3! px-6!"
            >
              <span>Track Live</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Products */}
            <div className="bg-white p-8 border border-outline-variant/10 shadow-sm reveal">
              <h3 className="text-lg font-noto-serif mb-8 border-b border-outline-variant/10 pb-4">Items Curated</h3>
              <div className="space-y-8">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-8">
                    <div className="w-32 h-40 bg-surface-container overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="text-xl font-noto-serif">{item.name}</h4>
                      <p className="text-[10px] text-primary uppercase tracking-widest font-bold">{item.category}</p>
                      <p className="text-sm text-on-surface-variant pt-2">Quantity: 1</p>
                      <p className="text-lg font-bold pt-2">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white p-8 border border-outline-variant/10 shadow-sm reveal">
              <h3 className="text-lg font-noto-serif mb-8 border-b border-outline-variant/10 pb-4">Journey Timeline</h3>
              <div className="relative space-y-10 pl-8">
                <div className="absolute left-[3px] top-2 bottom-2 w-px bg-outline/20"></div>
                {order.timeline.map((step, idx) => (
                  <div key={step.status} className="relative">
                    <div className={`absolute left-[-33px] top-1 w-2 h-2 rounded-full border-4 border-white ${step.active ? 'bg-primary ring-2 ring-primary/20' : 'bg-outline/20'}`}></div>
                    <div className={step.active ? 'opacity-100' : 'opacity-40'}>
                      <h5 className="text-sm font-bold uppercase tracking-widest">{step.status}</h5>
                      <p className="text-[10px] text-outline mt-1">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-12">
            {/* Shipping & Payment */}
            <div className="bg-surface-container-low p-8 border border-outline-variant/10 shadow-sm reveal">
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold mb-4">Shipping To</h4>
                  <p className="text-sm font-bold">{order.shippingAddress.name}</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-2">
                    {order.shippingAddress.address}<br/>
                    {order.shippingAddress.city} - {order.shippingAddress.pincode}
                  </p>
                  <p className="text-xs mt-2">{order.shippingAddress.phone}</p>
                </div>
                
                <div className="pt-8 border-t border-outline/10">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold mb-4">Payment Method</h4>
                  <p className="text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                    {order.payment.method}
                  </p>
                </div>

                <div className="pt-8 border-t border-outline/10">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold mb-6">Price Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">Subtotal</span>
                      <span>{formatPrice(order.payment.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">Shipping</span>
                      <span className="text-primary">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">GST (12%)</span>
                      <span>{formatPrice(order.payment.tax)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-4 border-t border-outline/10">
                      <span>Total</span>
                      <span>{formatPrice(order.payment.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-[#1c1c1a] p-8 text-white text-center">
              <h4 className="text-sm font-noto-serif mb-4">Need Assistance?</h4>
              <p className="text-[10px] opacity-60 uppercase tracking-widest leading-relaxed mb-6">Our concierge is available for any questions regarding your curation.</p>
              <a href="https://wa.me/919999999999" className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] hover:text-white transition-colors">Chat with Atelier</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetail;
