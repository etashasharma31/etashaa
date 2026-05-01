import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BridalCollection from './pages/BridalCollection';
import FestiveCollection from './pages/FestiveCollection';
import TheEdit from './pages/TheEdit';
import SareeCollection from './pages/SareeCollection';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import OrderDetail from './pages/OrderDetail';
import OrderTracking from './pages/OrderTracking';
import Policies from './pages/Policies';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import Wishlist from './pages/Wishlist';
import SizeGuide from './pages/SizeGuide';
import BookAppointment from './pages/BookAppointment';
import EtashaaMuse from './pages/EtashaaMuse';
import HeritageJournal from './pages/HeritageJournal';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
          <Layout>
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
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/contact" element={<Policies />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </WishlistProvider>
  </AuthProvider>
  );
}

export default App;
