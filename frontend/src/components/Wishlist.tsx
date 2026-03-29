import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Product } from '../data/products';

const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  if (wishlist.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
      <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Start Shopping</Link>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product: Product) => {
          const discount = product.original_price
            ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
            : 0;
          return (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative">
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square mb-3 overflow-hidden rounded-lg">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base font-bold text-gray-900">₹{Number(product.price).toLocaleString()}</span>
                  {product.original_price && (
                    <>
                      <span className="text-xs text-gray-500 line-through">₹{Number(product.original_price).toLocaleString()}</span>
                      <span className="text-xs text-green-600 font-medium">{discount}% off</span>
                    </>
                  )}
                </div>
              </Link>
              <button
                onClick={() => { addToCart(product); addToast(`${product.name} added to cart!`, 'success'); }}
                className="w-full py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Wishlist;
