import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import CartLink from './components/CartLink';
import ToastNotification from './components/ToastNotification';
import OrderHistory from './components/OrderHistory';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import Wishlist from './components/Wishlist';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3">
                  {/* Desktop & Mobile top row */}
                  <div className="flex items-center gap-3">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                      <img src="/flipkart-logo.png" alt="Flipkart" className="h-16 sm:h-20 object-contain" />
                    </Link>

                    {/* Search bar */}
                    <div className="flex-1">
                      <SearchBar value={searchTerm} onChange={setSearchTerm} />
                    </div>

                    {/* Desktop nav */}
                    <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                      <Link to="/wishlist" className="text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">Wishlist</Link>
                      <Link to="/orders" className="text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">My Orders</Link>
                      <CartLink />
                    </div>

                    {/* Mobile hamburger */}
                    <button className="sm:hidden p-2" onClick={() => setMenuOpen(o => !o)}>
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                      </svg>
                    </button>
                  </div>

                  {/* Mobile menu */}
                  {menuOpen && (
                    <div className="sm:hidden mt-3 flex flex-col gap-3 pb-3 border-t pt-3">
                      <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700">Wishlist</Link>
                      <Link to="/orders" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700">My Orders</Link>
                      <CartLink />
                    </div>
                  )}
                </div>
              </header>

              <Routes>
                <Route path="/" element={<ProductList searchTerm={searchTerm} />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order/:id" element={<OrderConfirmation />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Routes>
              <ToastNotification />
              <Footer />
            </Router>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
