import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const MyOrders = () => {
  const navigate = useNavigate();
  
  const mockOrders = [
    {
      id: 'ET-8181',
      date: 'April 24, 2026',
      amount: 185000,
      status: 'Shipped',
      items: 1,
      image: '/images/bridal_01.jpg'
    },
    {
      id: 'ET-7920',
      date: 'March 12, 2026',
      amount: 45000,
      status: 'Delivered',
      items: 2,
      image: '/images/cat_designer_saree_main.png'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-surface px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-3 block">Account Atelier</span>
            <h1 className="text-4xl font-noto-serif">My Orders</h1>
          </div>
          <Link to="/profile" className="text-[10px] uppercase tracking-widest text-outline hover:text-primary transition-colors border-b border-outline/20 pb-1">Back to Profile</Link>
        </div>

        <div className="space-y-8">
          {mockOrders.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-outline-variant/30">
              <p className="font-noto-serif text-xl text-outline mb-6">No orders found yet</p>
              <button onClick={() => navigate('/')} className="btn-premium"><span>Start Shopping</span></button>
            </div>
          ) : (
            mockOrders.map((order) => (
              <div 
                key={order.id}
                onClick={() => navigate(`/order-detail/${order.id}`)}
                className="group bg-white p-6 md:p-8 border border-outline-variant/10 hover:border-primary/30 transition-all duration-500 cursor-pointer editorial-shadow reveal"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-24 h-32 bg-surface-container overflow-hidden">
                    <img src={order.image} alt={order.id} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-outline">Order ID</p>
                      <p className="text-sm font-bold">{order.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-outline">Date</p>
                      <p className="text-sm">{order.date}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-outline">Total Amount</p>
                      <p className="text-sm font-bold">{formatPrice(order.amount)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-outline">Status</p>
                      <span className={`inline-block px-3 py-1 text-[9px] uppercase tracking-tighter font-bold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-primary-container/20 text-primary'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary group-hover:translate-x-2 transition-all">chevron_right</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default MyOrders;
