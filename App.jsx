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
import Profile from './pages/Profile';
import Policies from './pages/Policies';
import { CartProvider } from './context/CartContext';

function App() {
  return (
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
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/terms" element={<Policies />} />
            <Route path="/privacy" element={<Policies />} />
            <Route path="/accessibility" element={<Policies />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
