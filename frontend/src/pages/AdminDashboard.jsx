import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { allProducts } from '../data';

const AdminDashboard = () => {
  const { admin, adminLogout, initialLoading } = useAuth();
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
      {
        id: '#ORD-9283',
        customer: 'Priya Sharma',
        email: 'priya.s@gmail.com',
        phone: '+91 98765 43210',
        address: 'A-42, Hemkunt Tower, Nehru Place, New Delhi - 110019',
        product: 'Royal Zardosi Lehenga',
        status: 'In Production',
        amount: '₹1,85,000',
        date: '2024-04-28',
        items: [
          {
            name: 'Royal Zardosi Lehenga',
            price: '₹1,85,000',
            images: ['/images/bridal_new_1.png', '/images/bridal_01.jpg', '/images/bridal_02.jpg'],
            qty: 1
          }
        ]
      },
      {
        id: '#ORD-9284',
        customer: 'Ananya Rao',
        email: 'ananya.rao@outlook.com',
        phone: '+91 88888 77777',
        address: 'Flat 201, Sterling Apartments, Indiranagar, Bangalore - 560038',
        product: 'Champagne Tissue Saree',
        status: 'Shipped',
        amount: '₹45,000',
        date: '2024-04-29',
        items: [
          {
            name: 'Champagne Tissue Saree',
            price: '₹45,000',
            images: ['/images/saree_new_2.png', '/images/saree_01.jpg'],
            qty: 1
          }
        ]
      },
      {
        id: '#ORD-9285',
        customer: 'Meera Kapoor',
        email: 'meera.k@yahoo.com',
        phone: '+91 99900 11122',
        address: '7th Floor, Maker Chambers, Nariman Point, Mumbai - 400021',
        product: 'Emerald Silk Anarkali',
        status: 'Processing',
        amount: '₹78,000',
        date: '2024-04-30',
        items: [
          { name: 'Emerald Silk Anarkali', price: '₹78,000', image: '/images/festive_new_1.png', qty: 1 }
        ]
      },
      {
        id: '#ORD-9286',
        customer: 'Sonia Varma',
        email: 'sonia.v@gmail.com',
        phone: '+91 77766 55544',
        address: 'Villa 12, Palm Meadows, Whitefield, Bangalore - 560066',
        product: 'Heritage Gold Saree',
        status: 'Delivered',
        amount: '₹62,000',
        date: '2024-05-01',
        items: [
          { name: 'Heritage Gold Saree', price: '₹62,000', image: '/images/saree_new_1.png', qty: 1 }
        ]
      },
    ];
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('etashaa_settings');
    return saved ? JSON.parse(saved) : {
      maintenanceMode: false,
      maintenanceTitle: "Perfecting the Digital Atelier",
      maintenanceSubtitle: "Exquisite Craftsmanship",
      maintenanceDescription: "The Etashaa Digital Atelier is currently undergoing a scheduled transformation. We are refining our collections to bring you the pinnacle of Indian heritage couture.",
      maintenanceNotice: "Our artisans are curating a new digital experience for you. Returning shortly.",
      maintenanceImage: "/images/auth/slide1.png",
      contactEmail: "atelier@etashaa.com",
      contactPhone: "+91 9999 888 777",
      acceptingAppointments: true,
      priceVisibility: true
    };
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', price: '', images: [''], id: '' });

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New Appointment: Aditi Singh", time: "2 mins ago", type: "event", unread: true },
    { id: 2, text: "New Order #ORD-9283", time: "1 hour ago", type: "shopping_bag", unread: true },
    { id: 3, text: "Payment Successful: Ananya Rao", time: "3 hours ago", type: "payments", unread: false },
  ]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Rescheduling State
  const [reschedulingAppointment, setReschedulingAppointment] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ date: '', time: '' });

  // Order Detail State
  const [viewingOrder, setViewingOrder] = useState(null);

  // Persistence Effects
  useEffect(() => localStorage.setItem('etashaa_inventory', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('etashaa_appointments', JSON.stringify(appointments)), [appointments]);
  useEffect(() => localStorage.setItem('etashaa_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('etashaa_settings', JSON.stringify(settings)), [settings]);

  // Protect route
  useEffect(() => {
    if (!initialLoading && !admin) navigate('/admin-login');
  }, [admin, initialLoading, navigate]);

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
    setFormData({
      name: '',
      category: 'Bridal Collection',
      price: '',
      images: ['/images/bridal_new_1.png'],
      id: `PROD-${Date.now()}`
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingItem(product);
    setFormData({
      ...product,
      images: product.images || [product.image] || ['']
    });
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

  const handleRescheduleOpen = (apt) => {
    setReschedulingAppointment(apt);
    setRescheduleData({ date: apt.date, time: apt.time });
  };

  const handleRescheduleSave = (e) => {
    e.preventDefault();
    setAppointments(appointments.map(a =>
      a.id === reschedulingAppointment.id ? { ...a, date: rescheduleData.date, time: rescheduleData.time } : a
    ));
    setNotifications([{
      id: Date.now(),
      text: `Rescheduled: ${reschedulingAppointment.name}`,
      time: "Just now",
      type: "event",
      unread: true
    }, ...notifications]);
    setReschedulingAppointment(null);
  };

  // Order Handlers
  const handleOrderStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    setNotifications([{
      id: Date.now(),
      text: `Status Updated: Order ${id} is now ${status}`,
      time: "Just now",
      type: "update",
      unread: true
    }, ...notifications]);
  };

  const handleGenerateInvoice = (order) => {
    // Simulate generation
    setNotifications([{
      id: Date.now(),
      text: `Invoice Generated for ${order.id}`,
      time: "Just now",
      type: "description",
      unread: true
    }, ...notifications]);
    alert(`Generating high-resolution invoice for ${order.customer} (${order.id})...`);
  };

  const handleUpdateTracking = (order) => {
    const tracking = prompt("Enter Tracking ID / AWB Number:", "AWB-77283910");
    if (tracking) {
      setOrders(orders.map(o => o.id === order.id ? { ...o, trackingNumber: tracking } : o));
      setNotifications([{
        id: Date.now(),
        text: `Tracking Updated for ${order.id}`,
        time: "Just now",
        type: "local_shipping",
        unread: true
      }, ...notifications]);
      alert(`Tracking ID ${tracking} has been linked to order ${order.id}. Customer has been notified.`);
    }
  };

  const handleContactCustomer = (order) => {
    const message = `Hello ${order.customer}, this is the Etashaa Atelier Concierge regarding your order ${order.id}.`;
    window.open(`mailto:${order.email || 'customer@etashaa.com'}?subject=Update on your Etashaa Order ${order.id}&body=${encodeURIComponent(message)}`);
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
                            <span className={`text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
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
                        <img
                          src={product.images?.[0] || product.image}
                          alt={product.name}
                          className="w-12 h-16 object-cover border border-outline-variant/10 shadow-sm"
                        />
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
                      <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${apt.status === 'Confirmed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
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
                    <button
                      onClick={() => handleRescheduleOpen(apt)}
                      className="flex-1 py-2 bg-surface border border-outline-variant/20 text-on-surface text-[9px] uppercase tracking-widest font-bold hover:bg-primary hover:text-white hover:border-primary transition-all"
                    >
                      Reschedule
                    </button>
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
                    <th className="px-8 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors group">
                      <td className="px-8 py-6 font-bold text-xs">{order.id}</td>
                      <td className="px-8 py-6 text-sm text-on-surface-variant">{order.customer}</td>
                      <td className="px-8 py-6">
                        <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
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
                      <td className="px-8 py-6">
                        <button
                          onClick={() => setViewingOrder(order)}
                          className="material-symbols-outlined text-outline hover:text-primary transition-colors text-xl"
                        >
                          visibility
                        </button>
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

      case 'Maintenance':
        return (
          <div className="max-w-4xl space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Status & Control */}
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white border border-outline-variant/10 shadow-sm p-8">
                  <h4 className="font-noto-serif text-xl italic mb-6">Status Center</h4>
                  <div className="flex justify-between items-center p-4 bg-surface rounded-lg mb-6">
                    <div>
                      <p className="text-xs font-bold text-on-surface">Store Visibility</p>
                      <p className={`text-[9px] uppercase font-bold ${settings.maintenanceMode ? 'text-secondary' : 'text-green-600'}`}>
                        {settings.maintenanceMode ? 'Offline (Maintenance)' : 'Live & Active'}
                      </p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                      className={`w-12 h-6 rounded-full transition-colors relative ${settings.maintenanceMode ? 'bg-secondary' : 'bg-green-500'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.maintenanceMode ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>
                  <p className="text-[10px] text-outline leading-relaxed italic">
                    Enabling Maintenance Mode will redirect all customer traffic to the splash page. Admins can still access the dashboard.
                  </p>
                </div>

                <div className="bg-white border border-outline-variant/10 shadow-sm p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-noto-serif text-xl italic">Customer View</h4>
                    <span className="text-[8px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Live Preview</span>
                  </div>
                  <div className="aspect-3/4 bg-surface relative overflow-hidden border border-outline-variant/10 group">
                    <img src={settings.maintenanceImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white text-3xl mb-4">visibility</span>
                      <p className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{settings.maintenanceTitle}</p>
                      <button
                        onClick={() => window.open('/', '_blank')}
                        className="w-full bg-white text-on-surface text-[9px] uppercase tracking-widest font-bold py-3 hover:bg-primary hover:text-white transition-all shadow-xl"
                      >
                        Launch Maintenance Page
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-outline-variant/5">
                    <p className="text-[9px] text-outline leading-relaxed italic">
                      This is a miniature preview of the splash page customers will see. Click the button above to view the full high-resolution experience with animations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Editor */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white border border-outline-variant/10 shadow-sm p-8 space-y-8">
                  <h4 className="font-noto-serif text-xl italic border-b border-outline-variant/5 pb-4">Splash Page Messaging</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Subtitle / Label</label>
                      <input
                        type="text"
                        value={settings.maintenanceSubtitle}
                        onChange={(e) => setSettings({ ...settings, maintenanceSubtitle: e.target.value })}
                        className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-sm font-jakarta-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Main Title</label>
                      <input
                        type="text"
                        value={settings.maintenanceTitle}
                        onChange={(e) => setSettings({ ...settings, maintenanceTitle: e.target.value })}
                        className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-sm font-jakarta-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Primary Description</label>
                    <textarea
                      value={settings.maintenanceDescription}
                      onChange={(e) => setSettings({ ...settings, maintenanceDescription: e.target.value })}
                      rows="3"
                      className="w-full border border-outline-variant/20 p-4 outline-none focus:border-primary text-sm font-jakarta-sans bg-surface/30 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Bottom Notice</label>
                    <input
                      type="text"
                      value={settings.maintenanceNotice}
                      onChange={(e) => setSettings({ ...settings, maintenanceNotice: e.target.value })}
                      className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-sm font-jakarta-sans italic"
                    />
                  </div>
                </div>

                <div className="bg-white border border-outline-variant/10 shadow-sm p-8 space-y-8">
                  <h4 className="font-noto-serif text-xl italic border-b border-outline-variant/5 pb-4">Visuals & Contact</h4>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Hero Cover Image URL</label>
                    <input
                      type="text"
                      value={settings.maintenanceImage}
                      onChange={(e) => setSettings({ ...settings, maintenanceImage: e.target.value })}
                      className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Inquiry Email</label>
                      <input
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                        className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Concierge Phone</label>
                      <input
                        type="text"
                        value={settings.contactPhone}
                        onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                        className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => {
                      localStorage.setItem('etashaa_settings', JSON.stringify(settings));
                      alert('Maintenance configuration saved');
                    }}
                    className="btn-premium px-12"
                  >
                    <span>Deploy Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Settings':
        return (
          <div className="max-w-2xl space-y-8 animate-in fade-in duration-500">
            <div className="bg-white border border-outline-variant/10 shadow-sm p-8 space-y-10">
              <div className="space-y-4">
                <h4 className="font-noto-serif text-xl italic">Store Configuration</h4>
                <div className="space-y-6 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-on-surface">Accepting Appointments</p>
                      <p className="text-[10px] text-outline">Allow brides to book new sessions</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, acceptingAppointments: !settings.acceptingAppointments })}
                      className={`w-10 h-5 rounded-full transition-colors relative ${settings.acceptingAppointments ? 'bg-primary' : 'bg-outline-variant/30'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.acceptingAppointments ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-on-surface">Price Visibility</p>
                      <p className="text-[10px] text-outline">Show prices to non-logged users</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, priceVisibility: !settings.priceVisibility })}
                      className={`w-10 h-5 rounded-full transition-colors relative ${settings.priceVisibility ? 'bg-primary' : 'bg-outline-variant/30'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.priceVisibility ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  localStorage.setItem('etashaa_settings', JSON.stringify(settings));
                  alert('Settings updated successfully');
                }}
                className="btn-premium px-12"
              >
                <span>Save All Changes</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col md:flex-row">
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
            { id: 'Maintenance', icon: 'construction' },
            { id: 'Settings', icon: 'settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 group ${activeTab === tab.id
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
          <div className="flex gap-4 relative">
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-white hover:shadow-md transition-all relative group"
              >
                <span className="material-symbols-outlined text-on-surface-variant group-hover:rotate-12 transition-transform">notifications</span>
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-3 right-3 w-2 h-2 bg-secondary rounded-full border-2 border-surface animate-pulse"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-white shadow-2xl border border-outline-variant/10 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
                    <h4 className="font-noto-serif text-sm italic">Notifications</h4>
                    <button
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                      className="text-[8px] uppercase tracking-widest font-bold text-primary hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => setNotifications(notifications.map(notif => notif.id === n.id ? { ...notif, unread: false } : notif))}
                          className={`p-6 border-b border-outline-variant/5 flex gap-4 cursor-pointer transition-colors ${n.unread ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-surface'}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.unread ? 'bg-primary text-white' : 'bg-surface text-outline'}`}>
                            <span className="material-symbols-outlined text-sm">{n.type}</span>
                          </div>
                          <div>
                            <p className={`text-[11px] leading-tight mb-1 ${n.unread ? 'font-bold text-on-surface' : 'text-on-surface-variant'}`}>{n.text}</p>
                            <p className="text-[9px] text-outline uppercase tracking-wider">{n.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-12 text-center text-outline text-[10px] uppercase tracking-widest italic">
                        No new alerts
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-surface-container-lowest text-center border-t border-outline-variant/10">
                    <button className="text-[9px] uppercase tracking-widest font-bold text-outline hover:text-primary transition-colors">View All Activities</button>
                  </div>
                </div>
              )}
            </div>

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
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-700">
          <div className="bg-white/95 backdrop-blur-xl w-full max-w-lg shadow-[0_30px_100px_rgba(0,0,0,0.4)] relative animate-in zoom-in-95 duration-700 rounded-sm border border-white/20">
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-sm font-jakarta-sans transition-colors"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-sm font-jakarta-sans transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Image Options (URLs)</label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}
                    className="text-[9px] uppercase tracking-widest font-bold text-primary hover:underline"
                  >
                    + Add Image
                  </button>
                </div>
                <div className="space-y-3 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <input
                        type="text"
                        value={img}
                        onChange={(e) => {
                          const newImages = [...formData.images];
                          newImages[idx] = e.target.value;
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="flex-1 border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-[10px] text-outline font-jakarta-sans transition-colors"
                        placeholder="https://images.etashaa.com/..."
                        required
                      />
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = formData.images.filter((_, i) => i !== idx);
                            setFormData({ ...formData, images: newImages });
                          }}
                          className="material-symbols-outlined text-outline hover:text-secondary text-sm"
                        >
                          delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
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

      {/* Reschedule Modal */}
      {reschedulingAppointment && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-700">
          <div className="bg-white/95 backdrop-blur-xl w-full max-w-sm shadow-[0_30px_100px_rgba(0,0,0,0.4)] relative animate-in zoom-in-95 duration-700 rounded-sm border border-white/20">
            <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="font-noto-serif text-2xl italic">Reschedule</h3>
              <button onClick={() => setReschedulingAppointment(null)} className="material-symbols-outlined text-outline hover:text-secondary transition-colors">close</button>
            </div>
            <form onSubmit={handleRescheduleSave} className="p-8 space-y-6">
              <div className="text-center mb-8">
                <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-2">Patient / Client</p>
                <p className="font-noto-serif text-xl italic">{reschedulingAppointment.name}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-outline font-bold">New Date</label>
                  <input
                    type="date"
                    value={rescheduleData.date}
                    onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
                    className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-sm font-jakarta-sans"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-outline font-bold">New Time</label>
                  <input
                    type="text"
                    value={rescheduleData.time}
                    onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
                    placeholder="11:00 AM"
                    className="w-full border-b border-outline-variant/30 py-2 outline-none focus:border-primary text-sm font-jakarta-sans"
                    required
                  />
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full py-4 bg-primary text-white text-[10px] uppercase tracking-widest font-bold hover:shadow-lg transition-all">
                  Confirm Reschedule
                </button>
                <button
                  type="button"
                  onClick={() => setReschedulingAppointment(null)}
                  className="w-full mt-4 py-2 text-[9px] uppercase tracking-widest font-bold text-outline hover:text-on-surface transition-colors"
                >
                  Go Back
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-xl animate-in fade-in duration-700">
          <div className="bg-surface-bright/95 backdrop-blur-2xl w-full max-w-7xl h-full shadow-[0_40px_120px_rgba(0,0,0,0.5)] relative animate-in zoom-in-95 duration-700 overflow-hidden flex flex-col border border-white/20">
            {/* Modal Header */}
            <div className="p-10 border-b border-outline-variant/10 flex justify-between items-center bg-white z-20">
              <div className="space-y-1">
                <h3 className="font-noto-serif text-4xl italic text-on-surface">Order <span className="text-primary">Manifest</span></h3>
                <div className="flex items-center gap-4 text-[10px] text-outline uppercase tracking-[0.3em] font-bold">
                  <span>{viewingOrder.id}</span>
                  <span className="w-1 h-1 bg-outline/30 rounded-full"></span>
                  <span>{viewingOrder.date}</span>
                </div>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center text-outline hover:text-secondary hover:border-secondary transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-surface/30">
              <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left Side: Order Content (8 cols) */}
                <div className="lg:col-span-8 space-y-16">
                  {/* Pieces Section */}
                  <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
                      <h4 className="text-[11px] uppercase tracking-[0.4em] text-outline font-bold">Ordered Pieces</h4>
                      <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{viewingOrder.items?.length || 1} Item(s)</span>
                    </div>

                    <div className="space-y-4">
                      {(viewingOrder.items || [{ name: viewingOrder.product, price: viewingOrder.amount, images: [viewingOrder.image || '/images/bridal_new_1.png'], qty: 1 }]).map((item, idx) => (
                        <div key={idx} className="flex gap-10 items-center bg-white p-6 border border-outline-variant/5 hover:border-primary/20 transition-all group">
                          <div className="w-32 h-40 bg-surface shrink-0 shadow-sm relative group/img overflow-hidden">
                            {/* Image Gallery / Main Image */}
                            <div className="w-full h-full">
                              <img
                                src={(item.images?.[0] || item.image)}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            </div>

                            {/* Secondary Image Overlay (if exists) */}
                            {item.images?.length > 1 && (
                              <div className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500">
                                <img
                                  src={item.images[1]}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-white text-[7px] py-1 text-center font-bold uppercase tracking-[0.2em]">
                                  +{item.images.length - 1} More Views
                                </div>
                              </div>
                            )}

                            <div className="absolute top-2 left-2 bg-on-surface text-white text-[8px] px-2 py-1 font-bold uppercase tracking-widest z-10">Qty: {item.qty}</div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex justify-between items-start">
                              <h5 className="font-noto-serif text-2xl italic leading-tight text-on-surface">{item.name}</h5>
                              <p className="text-xl font-bold text-primary font-jakarta-sans">{item.price}</p>
                            </div>
                            <p className="text-[10px] text-outline uppercase tracking-[0.2em] font-bold">Category: Heritage Couture</p>

                            {/* Thumbnail List */}
                            {item.images?.length > 1 && (
                              <div className="flex gap-2 pt-2">
                                {item.images.slice(0, 4).map((img, i) => (
                                  <div key={i} className="w-8 h-10 border border-outline-variant/20 overflow-hidden cursor-pointer hover:border-primary transition-colors">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="pt-4 flex gap-4">
                              <span className="text-[9px] uppercase tracking-widest text-primary/60 font-bold border border-primary/20 px-3 py-1">In Production</span>
                              <span className="text-[9px] uppercase tracking-widest text-outline/60 font-bold border border-outline-variant/20 px-3 py-1 italic">SKU: {viewingOrder.id}-{idx + 1}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer & Logistics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-6">
                      <h4 className="text-[11px] uppercase tracking-[0.4em] text-outline font-bold border-b border-outline-variant/10 pb-4">Customer Dossier</h4>
                      <div className="space-y-4">
                        <p className="font-noto-serif text-2xl italic text-on-surface">{viewingOrder.customer}</p>
                        <div className="space-y-3 pt-2">
                          <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-primary">
                              <span className="material-symbols-outlined text-sm">mail</span>
                            </div>
                            <span className="font-jakarta-sans">{viewingOrder.email || 'customer@etashaa.com'}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-primary">
                              <span className="material-symbols-outlined text-sm">call</span>
                            </div>
                            <span className="font-jakarta-sans">{viewingOrder.phone || '+91 99999 88888'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[11px] uppercase tracking-[0.4em] text-outline font-bold border-b border-outline-variant/10 pb-4">Logistics Target</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                          </div>
                          <p className="text-sm text-on-surface-variant leading-relaxed font-jakarta-sans italic pt-1">
                            {viewingOrder.address || 'A-42, Hemkunt Tower, Nehru Place, New Delhi - 110019'}
                          </p>
                        </div>
                        <div className="p-4 bg-primary/5 border border-primary/10 rounded-sm">
                          <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Shipping Method</p>
                          <p className="text-[11px] text-on-surface">Atelier Concierge Delivery (Secured)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Summary & Admin Actions (4 cols) */}
                <div className="lg:col-span-4 space-y-10">
                  {/* Payment Summary Card */}
                  <div className="bg-white p-8 border border-outline-variant/10 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                    <h4 className="text-[11px] uppercase tracking-[0.4em] text-outline font-bold mb-8">Financial Summary</h4>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-outline uppercase tracking-widest">Subtotal</span>
                        <span className="font-bold text-on-surface font-jakarta-sans">{viewingOrder.amount}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-outline uppercase tracking-widest">Atelier Shipping</span>
                        <span className="text-green-600 font-bold uppercase tracking-tighter italic">Complimentary</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-outline uppercase tracking-widest">Insurance</span>
                        <span className="text-on-surface-variant italic font-jakarta-sans">₹0</span>
                      </div>
                      <div className="pt-8 border-t border-outline-variant/10 space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-outline">Total Remittance</p>
                        <div className="flex justify-between items-end">
                          <span className="text-3xl font-bold text-on-surface font-jakarta-sans tracking-tighter">{viewingOrder.amount}</span>
                          <span className="text-[9px] uppercase tracking-widest text-green-600 font-bold mb-1 italic flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px]">verified</span> Paid
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Controls */}
                  <div className="bg-surface-container-low p-8 border border-outline-variant/10 space-y-8">
                    <h4 className="text-[11px] uppercase tracking-[0.4em] text-outline font-bold">Atelier Control</h4>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[9px] uppercase tracking-widest text-outline font-bold">Order Lifecycle Status</label>
                        <div className="relative">
                          <select
                            value={viewingOrder.status}
                            onChange={(e) => {
                              handleOrderStatus(viewingOrder.id, e.target.value);
                              setViewingOrder({ ...viewingOrder, status: e.target.value });
                            }}
                            className="w-full bg-white border border-outline-variant/20 p-4 text-xs font-bold outline-none focus:border-primary appearance-none cursor-pointer"
                          >
                            <option value="Processing">Processing</option>
                            <option value="In Production">In Production</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <button
                          onClick={() => handleGenerateInvoice(viewingOrder)}
                          className="w-full py-4 bg-on-surface text-white text-[10px] uppercase tracking-widest font-bold hover:bg-primary transition-all flex items-center justify-center gap-3"
                        >
                          <span className="material-symbols-outlined text-sm">description</span>
                          Generate Invoice
                        </button>
                        <button
                          onClick={() => handleUpdateTracking(viewingOrder)}
                          className="w-full py-4 border border-outline-variant/30 text-on-surface text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-all flex items-center justify-center gap-3"
                        >
                          <span className="material-symbols-outlined text-sm">local_shipping</span>
                          Update Tracking
                        </button>
                        <button
                          onClick={() => handleContactCustomer(viewingOrder)}
                          className="w-full py-4 border border-outline-variant/30 text-secondary text-[10px] uppercase tracking-widest font-bold hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-3"
                        >
                          <span className="material-symbols-outlined text-sm">mail</span>
                          Contact Customer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer / Quick Info */}
            <div className="p-6 bg-surface-container-lowest border-t border-outline-variant/10 text-center">
              <p className="text-[9px] uppercase tracking-[0.5em] text-outline/40 italic font-bold">Etashaa Heritage Management System • Confidential Authority</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
