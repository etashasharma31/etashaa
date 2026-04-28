import React, { useState } from 'react';
import PageHero from '../components/PageHero';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        id: orderId,
        status: 'In Transit',
        lastLocation: 'New Delhi Sorting Center',
        estimatedDelivery: 'April 30, 2026',
        timeline: [
          { status: 'Order Placed', date: 'April 24, 10:30 AM', completed: true },
          { status: 'Quality Check', date: 'April 25, 11:00 AM', completed: true },
          { status: 'Dispatched', date: 'April 26, 09:00 AM', completed: true },
          { status: 'In Transit', date: 'April 28, 05:30 PM', completed: true, current: true },
          { status: 'Out for Delivery', date: 'Expected April 30', completed: false },
          { status: 'Delivered', date: 'Expected April 30', completed: false }
        ]
      });
      setLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen pb-24 bg-surface">
      <PageHero 
        title="Track Your Order"
        tagline="Atelier Journey"
        subtitle="Follow your masterpiece from our hands to yours."
        image="/images/banners_02_ready_to_ship.jpg"
      />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white p-8 md:p-12 editorial-shadow reveal">
          <form onSubmit={handleTrack} className="space-y-8">
            <div className="text-center space-y-3 mb-10">
              <h2 className="text-2xl font-noto-serif">Locate Your Selection</h2>
              <p className="text-xs text-outline uppercase tracking-widest">Enter your Order ID (e.g., ET-8181)</p>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="ET-XXXX" 
                className="w-full bg-transparent border-b-2 border-outline/10 py-5 text-2xl font-noto-serif text-center focus:border-primary outline-none transition-all placeholder:opacity-20"
                required
              />
            </div>

            <button type="submit" className="w-full btn-premium" disabled={loading}>
              <span>{loading ? 'Searching Atelier...' : 'Track Live Status'}</span>
            </button>
          </form>

          {trackingData && (
            <div className="mt-20 space-y-12 animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-surface-container-low rounded-lg gap-6">
                <div className="text-center md:text-left">
                  <p className="text-[10px] uppercase tracking-widest text-outline">Current Status</p>
                  <p className="text-lg font-bold text-primary mt-1">{trackingData.status}</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-[10px] uppercase tracking-widest text-outline">Expected By</p>
                  <p className="text-lg font-bold mt-1">{trackingData.estimatedDelivery}</p>
                </div>
              </div>

              <div className="space-y-8 pl-8 relative">
                <div className="absolute left-[3px] top-2 bottom-2 w-px bg-outline/20"></div>
                {trackingData.timeline.map((step, idx) => (
                  <div key={step.status} className="relative">
                    <div className={`absolute left-[-33px] top-1 w-2 h-2 rounded-full border-4 border-white ${step.completed ? (step.current ? 'bg-primary ring-4 ring-primary/20 scale-125' : 'bg-primary') : 'bg-outline/20'}`}></div>
                    <div className={step.completed ? 'opacity-100' : 'opacity-40'}>
                      <h4 className={`text-sm uppercase tracking-widest ${step.current ? 'font-bold text-on-surface' : 'font-medium text-outline'}`}>{step.status}</h4>
                      <p className="text-[10px] mt-1">{step.date}</p>
                      {step.current && <p className="text-[10px] text-primary italic mt-2">— {trackingData.lastLocation}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
            <p className="text-xs text-outline italic">Need help? Our concierge is available 24/7. <br/> <span className="text-primary font-bold cursor-pointer hover:underline">Contact Support</span></p>
        </div>
      </div>
    </main>
  );
};

export default OrderTracking;
