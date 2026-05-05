import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const BridalCollection = lazy(() => import('./pages/BridalCollection'));
const FestiveCollection = lazy(() => import('./pages/FestiveCollection'));
const TheEdit = lazy(() => import('./pages/TheEdit'));
const SareeCollection = lazy(() => import('./pages/SareeCollection'));
const Cart = lazy(() => import('./pages/Cart'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));
const Checkout = lazy(() => import('./pages/Checkout'));
const MyOrders = lazy(() => import('./pages/MyOrders'));
const OrderDetail = lazy(() => import('./pages/OrderDetail'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const Policies = lazy(() => import('./pages/Policies'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const SizeGuide = lazy(() => import('./pages/SizeGuide'));
const BookAppointment = lazy(() => import('./pages/BookAppointment'));
const EtashaaMuse = lazy(() => import('./pages/EtashaaMuse'));
const HeritageJournal = lazy(() => import('./pages/HeritageJournal'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Maintenance = lazy(() => import('./pages/Maintenance'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface">
    <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

// Admin Route Wrapper
const AdminRoute = ({ children }) => {
  const { admin, initialLoading } = useAuth();
  
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!admin) {
    return <AdminLogin />;
  }
  
  return children;
};

function App() {
  const [settings, setSettings] = React.useState(() => {
    const saved = localStorage.getItem('etashaa_settings');
    return saved ? JSON.parse(saved) : { 
      maintenanceMode: false,
      maintenanceTitle: "Perfecting the Digital Atelier",
      maintenanceSubtitle: "Exquisite Craftsmanship",
      maintenanceDescription: "The Etashaa Digital Atelier is currently undergoing a scheduled transformation. We are refining our collections to bring you the pinnacle of Indian heritage couture.",
      maintenanceNotice: "Our artisans are curating a new digital experience for you. Returning shortly.",
      maintenanceImage: "/images/auth/slide1.png",
      contactEmail: "atelier@etashaa.com",
      contactPhone: "+91 9999 888 777"
    };
  });

  // Check for maintenance mode on mount and periodically (to sync with admin changes)
  React.useEffect(() => {
    const checkSettings = () => {
      const saved = localStorage.getItem('etashaa_settings');
      if (saved) setSettings(JSON.parse(saved));
    };
    const interval = setInterval(checkSettings, 2000);
    return () => clearInterval(interval);
  }, []);

  const isMaintenance = settings.maintenanceMode;
  const isAdminPath = window.location.pathname.startsWith('/admin');

  if (isMaintenance && !isAdminPath) {
    return (
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="*" element={<Maintenance settings={settings} />} />
          </Routes>
        </Suspense>
      </Router>
    );
  }

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bridal-collection" element={<BridalCollection />} />
                <Route path="/the-edit" element={<TheEdit />} />
                <Route path="/non-bridal-collection" element={<FestiveCollection />} />
                <Route path="/saree-collection" element={<SareeCollection />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/order-detail/:id" element={<OrderDetail />} />
                <Route path="/order-tracking" element={<OrderTracking />} />
                <Route path="/terms" element={<Policies />} />
                <Route path="/privacy" element={<Policies />} />
                <Route path="/accessibility" element={<Policies />} />
                <Route path="/shipping-policy" element={<Policies />} />
                <Route path="/returns-exchanges" element={<Policies />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/faqs" element={<Policies />} />
                <Route path="/our-story" element={<Policies />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/etashaa-muse" element={<EtashaaMuse />} />
                <Route path="/heritage-journal" element={<HeritageJournal />} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/contact" element={<Policies />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </CartProvider>
    </WishlistProvider>
  </AuthProvider>
  );
}

export default App;
