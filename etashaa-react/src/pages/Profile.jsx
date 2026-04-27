import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const orders = [
    { id: '#ET-9021', date: 'Oct 12, 2025', status: 'Delivered', amount: '₹1,25,000', image: '/images/bridal_new_1.png' },
    { id: '#ET-8845', date: 'Sep 05, 2025', status: 'Processing', amount: '₹45,999', image: '/images/non_bridal_3.png' }
  ];

  return (
    <main className="min-h-screen bg-surface pt-32 pb-24">
      <div className="max-w-custom">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 space-y-12">
            <div className="flex items-center gap-5 px-4 lg:px-0">
              <div className="w-16 h-16 bg-primary-container flex items-center justify-center rounded-full">
                <span className="text-2xl font-noto-serif text-on-primary-container">E</span>
              </div>
              <div>
                <h2 className="font-noto-serif text-xl">Etashaa Bride</h2>
                <p className="text-[10px] uppercase tracking-widest text-outline">Platinum Member</p>
              </div>
            </div>

            <nav className="flex flex-col space-y-1">
              {['My Dashboard', 'Order History', 'Wishlist', 'Custom Measurements', 'Shipping Addresses', 'Account Settings'].map((item, idx) => (
                <button 
                  key={item} 
                  className={`text-left px-6 py-4 text-[11px] uppercase tracking-widest font-jakarta-sans transition-all ${idx === 0 ? 'bg-white text-primary border-l-2 border-primary font-bold' : 'text-on-surface/60 hover:text-primary hover:bg-white/50'}`}
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => navigate('/login')}
                className="text-left px-6 py-6 text-[11px] uppercase tracking-widest font-jakarta-sans text-secondary font-bold mt-8 border-t border-outline/10"
              >
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <section className="flex-1 space-y-12 px-6 lg:px-0">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Orders Placed', val: '04' },
                { label: 'Wishlist Items', val: '12' },
                { label: 'Loyalty Points', val: '2,450' }
              ].map(stat => (
                <div key={stat.label} className="bg-white p-8 editorial-shadow text-center space-y-2">
                  <p className="font-noto-serif text-3xl text-primary">{stat.val}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-10 editorial-shadow">
              <div className="flex justify-between items-end mb-10 border-b border-outline/10 pb-6">
                <h3 className="font-noto-serif text-2xl">Recent Orders</h3>
                <button className="text-[10px] uppercase tracking-widest text-primary font-bold border-b border-primary/30 pb-1">View All Orders</button>
              </div>

              <div className="space-y-8">
                {orders.map(order => (
                  <div key={order.id} className="flex flex-col md:flex-row items-center gap-8 group">
                    <div className="w-24 h-32 overflow-hidden bg-surface-container">
                      <img src={order.image} alt={order.id} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left items-center">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-outline mb-1">Order ID</p>
                        <p className="font-jakarta-sans text-xs font-bold">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-outline mb-1">Placed On</p>
                        <p className="font-jakarta-sans text-xs">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-outline mb-1">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-tighter ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-primary/10 text-primary'}`}>
                          {order.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-outline mb-1">Total</p>
                        <p className="font-jakarta-sans text-sm font-bold text-primary">{order.amount}</p>
                      </div>
                    </div>
                    <button className="w-full md:w-auto px-8 py-3 border border-outline/20 text-[10px] uppercase tracking-widest hover:bg-[#1c1c1a] hover:text-white transition-all duration-300">
                      Track Order
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Concierge Banner */}
            <div className="bg-[#1c1c1a] text-white p-12 relative overflow-hidden group">
              <div className="relative z-10 max-w-lg">
                <span className="text-primary text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold">Personal Atelier</span>
                <h3 className="text-3xl font-noto-serif mb-6 leading-tight">Need a custom fitting or design modification?</h3>
                <p className="text-white/60 text-sm mb-8 leading-relaxed font-jakarta-sans">Your personal concierge is available for virtual consultations. Let us perfect your silhouette from the comfort of your home.</p>
                <button className="bg-primary hover:bg-[#5a430e] text-white px-10 py-4 text-[10px] uppercase tracking-widest font-bold transition-all duration-500 shadow-xl">Start Conversation</button>
              </div>
              <div className="absolute right-[-10%] top-[-20%] opacity-20 scale-150 pointer-events-none group-hover:rotate-12 transition-transform duration-[3s]">
                <span className="material-symbols-outlined text-[300px] text-white">straighten</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;
