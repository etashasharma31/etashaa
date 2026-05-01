import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { allProducts } from '../data';

const AdminDashboard = () => {
  const { admin, adminLogout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  
  // Persistence States
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('etashaa_inventory');
    return saved ? JSON.parse(saved) : allProducts;
  });
  
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('etashaa_appointments');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Aditi Singh', service: 'Bridal Consultation', date: '2024-05-05', time: '11:00 AM', status: 'Confirmed' },
      { id: 2, name: 'Riya Malhotra', service: 'Custom Fitting', date: '2024-05-06', time: '02:00 PM', status: 'Pending' },
      { id: 3, name: 'Sanya Gupta', service: 'Trousseau Planning', date: '2024-05-07', time: '04:00 PM', status: 'Confirmed' },
    ];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('etashaa_orders');
    return saved ? JSON.parse(saved) : [
      { id: '#ORD-9283', customer: 'Priya Sharma', product: 'Royal Zardosi Lehenga', status: 'In Production', amount: '₹1,85,000', date: '2024-04-28' },
      { id: '#ORD-9284', customer: 'Ananya Rao', product: 'Champagne Tissue Saree', status: 'Shipped', amount: '₹45,000', date: '2024-04-29' },
      { id: '#ORD-9285', customer: 'Meera Kapoor', product: 'Emerald Silk Anarkali', status: 'Processing', amount: '₹78,000', date: '2024-04-30' },
      { id: '#ORD-9286', customer: 'Sonia Varma', product: 'Heritage Gold Saree', status: 'Delivered', amount: '₹62,000', date: '2024-05-01' },
    ];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', price: '', image: '', id: '' });

  // Persistence Effects
  useEffect(() => localStorage.setItem('etashaa_inventory', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('etashaa_appointments', JSON.stringify(appointments)), [appointments]);
  useEffect(() => localStorage.setItem('etashaa_orders', JSON.stringify(orders)), [orders]);

  // Protect route
  useEffect(() => {
    if (!admin) navigate('/admin-login');
  }, [admin, navigate]);

  const stats = [
    { label: 'Total Revenue', value: '₹42,85,000', icon: 'payments', trend: '+12.5%' },
    { label: 'Total Orders', value: orders.length.toString(), icon: 'shopping_bag', trend: '+8.2%' },
    { label: 'Active Appointments', value: appointments.filter(a => a.status === 'Confirmed').length.toString(), icon: 'event', trend: '+15.3%' },
    { label: 'Inventory Pieces', value: products.length.toString(), icon: 'inventory_2', trend: 'Updated' },
  ];

  const handleLogout = () => {
    adminLogout();
    navigate('/admin-login');
  };

  // Product CRUD
  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ name: '', category: 'Bridal Collection', price: '', image: '/images/bridal_new_1.png', id: `PROD-${Date.now()}` });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingItem(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingItem) {
      setProducts(products.map(p => p.id === editingItem.id ? { ...formData, price: Number(formData.price) } : p));
    } else {
      setProducts([{ ...formData, price: Number(formData.price) }, ...products]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Appointment Handlers
  const handleAppointmentStatus = (id, status) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  // Order Handlers
  const handleOrderStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  if (!admin) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-8 border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">{stat.icon}</span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
                  </div>
                  <p className="font-jakarta-sans text-[10px] uppercase tracking-widest text-outline mb-2">{stat.label}</p>
                  <h3 className="font-noto-serif text-2xl font-bold text-on-surface">{stat.value}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="bg-white border border-outline-variant/10 shadow-sm">
                <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
                  <h3 className="font-noto-serif text-xl italic">Live Orders</h3>
                  <button onClick={() => setActiveTab('Orders')} className="text-[10px] uppercase tracking-widest font-bold text-primary hover:underline">Manage All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-jakarta-sans">
                    <tbody className="divide-y divide-outline-variant/5">
                      {orders.slice(0, 4).map((order) => (
                        <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors">
                          <td className="px-8 py-6">
                            <p className="font-bold text-xs">{order.id}</p>
                            <p className="text-[9px] text-outline uppercase">{order.customer}</p>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                              order.status === 'In Production' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-sm font-bold text-on-surface text-right">{order.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white border border-outline-variant/10 shadow-sm">
                <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
                  <h3 className="font-noto-serif text-xl italic">Today's Schedule</h3>
                  <button onClick={() => setActiveTab('Appointments')} className="text-[10px] uppercase tracking-widest font-bold text-primary hover:underline">View Calendar</button>
                </div>
                <div className="p-4 space-y-4">
                  {appointments.slice(0, 3).map(apt => (
                    <div key={apt.id} className="flex items-center gap-4 p-4 border border-outline-variant/5 hover:border-primary/20 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-xl">event</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold">{apt.name}</p>
                        <p className="text-[10px] text-outline uppercase">{apt.service} • {apt.time}</p>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${apt.status === 'Confirmed' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Products':
        const filteredProducts = products.filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-6 border border-outline-variant/10">
              <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/50">search</span>
                <input 
                  type="text" 
                  placeholder="Search inventory..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface border border-outline-variant/20 focus:border-primary outline-none text-sm font-jakarta-sans transition-all"
                />
              </div>
              <button onClick={openAddModal} className="btn-premium px-8 whitespace-nowrap">
                <span>Add New Piece</span>
              </button>
            </div>

            <div className="bg-white border border-outline-variant/10 shadow-sm overflow-hidden">
              <table className="w-full text-left font-jakarta-sans">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-outline bg-surface-container-lowest/50">
                    <th className="px-8 py-4">Image</th>
                    <th className="px-8 py-4">Product Name</th>
                    <th className="px-8 py-4">Category</th>
                    <th className="px-8 py-4">Price</th>
                    <th className="px-8 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {filteredProducts.slice(0, 10).map((product) => (
                    <tr key={product.id} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-8 py-4">
                        <img src={product.image} alt={product.name} className="w-12 h-16 object-cover border border-outline-variant/10 shadow-sm" />
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-bold text-xs">{product.name}</p>
                        <p className="text-[10px] text-outline/60 mt-1 uppercase tracking-widest">{product.id}</p>
                      </td>
                      <td className="px-8 py-6 text-sm text-on-surface-variant">{product.category}</td>
                      <td className="px-8 py-6 text-sm font-bold text-on-surface">₹{product.price?.toLocaleString()}</td>
                      <td className="px-8 py-6">
                        <div className="flex gap-4">
                          <button onClick={() => openEditModal(product)} className="material-symbols-outlined text-outline hover:text-primary transition-colors text-lg">edit</button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="material-symbols-outlined text-outline hover:text-secondary transition-colors text-lg">delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Appointments':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map((apt) => (
                <div key={apt.id} className="bg-white p-8 border border-outline-variant/10 shadow-sm relative group hover:shadow-md transition-all">
                  <div className={`absolute top-0 right-0 w-1 h-full ${apt.status === 'Confirmed' ? 'bg-green-500' : 'bg-amber-500'}`} />
                  <div className="flex justify-between items-start mb-6">
                    <span className="material-symbols-outlined text-primary/40 text-4xl">calendar_today</span>
                    <div className="flex gap-2">
                      {apt.status === 'Pending' && (
                        <button onClick={() => handleAppointmentStatus(apt.id, 'Confirmed')} className="text-[8px] bg-primary text-white px-3 py-1 font-bold uppercase tracking-widest hover:shadow-lg transition-all">Confirm</button>
                      )}
                      <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                        apt.status === 'Confirmed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-noto-serif text-xl italic mb-1">{apt.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-6">{apt.service}</p>
                  <div className="space-y-2 border-t border-outline-variant/5 pt-6">
                    <div className="flex items-center gap-3 text-[11px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">event</span>
                      {apt.date}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {apt.time}
                    </div>
                  </div>
                  <div className="mt-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex-1 py-2 bg-surface border border-outline-variant/20 text-on-surface text-[9px] uppercase tracking-widest font-bold hover:bg-primary hover:text-white hover:border-primary transition-all">Reschedule</button>
                    <button onClick={() => handleDeleteAppointment(apt.id)} className="px-3 py-2 border border-outline-variant/30 text-outline hover:text-secondary hover:border-secondary transition-all">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Orders':
        return (
          <div className="bg-white border border-outline-variant/10 shadow-sm animate-in fade-in duration-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-jakarta-sans">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-outline bg-surface-container-lowest/50">
                    <th className="px-8 py-4">Order ID</th>
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4">Quick Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-8 py-6 font-bold text-xs">{order.id}</td>
                      <td className="px-8 py-6 text-sm text-on-surface-variant">{order.customer}</td>
                      <td className="px-8 py-6">
                        <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                          order.status === 'In Production' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-on-surface">{order.amount}</td>
                      <td className="px-8 py-6">
                        <select 
                          className="bg-transparent border border-outline-variant/20 text-[9px] uppercase tracking-widest font-bold px-2 py-1 outline-none focus:border-primary"
                          value={order.status}
                          onChange={(e) => handleOrderStatus(order.id, e.target.value)}
                        >
                          <option value="Processing">Processing</option>
                          <option value="In Production">In Production</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Analytics':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
            <div className="bg-white p-8 border border-outline-variant/10 shadow-sm">
              <h3 className="font-noto-serif text-xl italic mb-8">Sales Performance</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                  <div key={i} className="w-full bg-primary/10 relative group cursor-pointer">
                    <div className="bg-primary w-full absolute bottom-0 transition-all duration-1000 group-hover:brightness-110" style={{ height: `${h}%` }}></div>
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[8px] py-1 px-2 whitespace-nowrap">₹{h * 10},000</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[8px] uppercase tracking-widest text-outline font-bold">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
            <div className="bg-white p-8 border border-outline-variant/10 shadow-sm">
              <h3 className="font-noto-serif text-xl italic mb-8">Collection Distribution</h3>
              <div className="space-y-6">
                {[
                  { label: 'Bridal Lehengas', val: 65, color: 'bg-primary' },
                  { label: 'Heritage Sarees', val: 25, color: 'bg-secondary' },
                  { label: 'Non-Bridal', val: 10, color: 'bg-outline' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold mb-2">
                      <span>{item.label}</span>
                      <span>{item.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Settings':
        return (
          <div className="max-w-2xl bg-white border border-outline-variant/10 shadow-sm animate-in fade-in duration-500">
            <div className="p-8 space-y-10">
              <div className="space-y-4">
                <h4 className="font-noto-serif text-xl italic">Store Configuration</h4>
                <div className="space-y-6 pt-4">
                  {[
                    { label: 'Maintenance Mode', desc: 'Take the store offline for updates', active: false },
                    { label: 'Accepting Appointments', desc: 'Allow brides to book new sessions', active: true },
                    { label: 'Price Visibility', desc: 'Show prices to non-logged users', active: true },
                  ].map(s => (
                    <div key={s.label} className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-on-surface">{s.label}</p>
                        <p className="text-[10px] text-outline">{s.desc}</p>
                      </div>
                      <button className={`w-10 h-5 rounded-full transition-colors relative ${s.active ? 'bg-primary' : 'bg-outline-variant/30'}`}>
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${s.active ? 'left-6' : 'left-1'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8 border-t border-outline-variant/10 flex justify-end">
                <button className="btn-premium px-8"><span>Save Settings</span></button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col md:flex-row pt-20">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-80 bg-white border-r border-outline-variant/10 flex flex-col z-20">
        <div className="p-8 border-b border-outline-variant/10">
          <h2 className="font-noto-serif text-2xl tracking-tighter text-on-surface">Admin<span className="italic italic-serif text-primary">Portal</span></h2>
          <p className="text-[9px] uppercase tracking-[0.4em] text-outline mt-2 font-bold font-jakarta-sans">Heritage Management</p>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {[
            { id: 'Overview', icon: 'dashboard' },
            { id: 'Products', icon: 'inventory_2' },
            { id: 'Appointments', icon: 'event' },
            { id: 'Orders', icon: 'shopping_cart' },
            { id: 'Analytics', icon: 'analytics' },
            { id: 'Settings', icon: 'settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 group ${
                activeTab === tab.id 
                ? 'bg-primary text-on-primary shadow-lg scale-[1.02]' 
                : 'text-on-surface/60 hover:bg-surface-container-lowest hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined text-xl transition-transform ${activeTab === tab.id ? 'scale-110' : 'group-hover:translate-x-1'}`}>
                {tab.icon}
              </span>
              <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.2em] font-bold">
                {tab.id}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-outline-variant/10 bg-surface-container-lowest/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">A</div>
            <div>
              <p className="text-xs font-bold text-on-surface">Master Admin</p>
              <p className="text-[9px] text-outline uppercase tracking-widest">Full Authority</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 border border-outline-variant/30 text-[9px] uppercase tracking-widest font-bold hover:bg-secondary hover:text-white hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-sm">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-12 border-b border-outline-variant/10">
          <div>
            <h1 className="font-noto-serif text-4xl italic text-on-surface mb-2">{activeTab}</h1>
            <div className="flex items-center gap-2 text-[10px] text-outline font-jakarta-sans uppercase tracking-widest">
              <span>Admin</span>
              <span>/</span>
              <span className="text-primary font-bold">{activeTab}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-white hover:shadow-md transition-all relative group">
              <span className="material-symbols-outlined text-on-surface-variant group-hover:rotate-12 transition-transform">notifications</span>
              <span className="absolute top-3 right-3 w-2 h-2 bg-secondary rounded-full border-2 border-surface animate-pulse"></span>
            </button>
            <button onClick={() => activeTab === 'Products' ? openAddModal() : setActiveTab('Products')} className="btn-premium px-8">
              <span className="material-symbols-outlined mr-2">add</span>
              <span>Quick Action</span>
            </button>
          </div>
        </header>

        {renderContent()}
      </main>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="font-noto-serif text-2xl italic">{editingItem ? 'Edit Piece' : 'Add Heritage Piece'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="material-symbols-outlined text-outline hover:text-secondary transition-colors">close</button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Product Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-sm font-jakarta-sans transition-colors"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-sm font-jakarta-sans transition-colors"
                  >
                    <option>Bridal Collection</option>
                    <option>Festive Collection</option>
                    <option>Heritage Sarees</option>
                    <option>Couture Gowns</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Price (₹)</label>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-sm font-jakarta-sans transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Image Path</label>
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-[10px] text-outline font-jakarta-sans transition-colors"
                  required
                />
              </div>
              <div className="pt-6 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 border border-outline-variant/30 text-[10px] uppercase tracking-widest font-bold hover:bg-surface transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-[#1c1c1a] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-primary transition-all shadow-lg">
                  {editingItem ? 'Update Piece' : 'Add to Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
