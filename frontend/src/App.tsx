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
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">

                  {/* Row 1: Logo + Minutes + Travel | right side */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Link to="/" className="flex-shrink-0">
                        <div className="bg-[#FFE11B] rounded-md px-3 py-1.5 flex items-center gap-1.5">
                          <span className="text-[#2874F0] font-black text-2xl italic leading-none">F</span>
                          <span className="text-[#2874F0] font-black text-base italic leading-none">Flipkart</span>
                        </div>
                      </Link>
                      <button className="hidden sm:flex items-center gap-1.5 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                        <span>🛵</span><span className="font-medium">Minutes</span>
                      </button>
                      <button className="hidden sm:flex items-center gap-1.5 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                        <span>✈️</span><span className="font-medium">Travel</span>
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Search bar | User + More + Cart */}
                  <div className="flex items-center gap-4 pb-2">
                    <div className="flex-1">
                      <SearchBar value={searchTerm} onChange={setSearchTerm} />
                    </div>
                    <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <circle cx="12" cy="8" r="4" />
                          <path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                        User
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setMoreOpen(o => !o)}
                          className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                          More
                          <svg className={`w-4 h-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {moreOpen && (
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-44 z-50">
                            <Link to="/orders" onClick={() => setMoreOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                              My Orders
                            </Link>
                            <Link to="/wishlist" onClick={() => setMoreOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                              Wishlist
                            </Link>
                          </div>
                        )}
                      </div>
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
                    <div className="sm:hidden flex flex-col gap-3 pb-3 border-t pt-3">
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
