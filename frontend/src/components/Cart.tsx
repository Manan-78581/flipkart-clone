import React from 'react';
import { Link } from 'react-router-dom';
import { useCart, CartItem } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <Link to="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item: CartItem) => (
              <div key={item.product.id} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-start gap-3">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">₹{Number(item.product.price).toLocaleString()}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center justify-center font-bold">-</button>
                        <span className="px-3 py-1 border rounded text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center justify-center font-bold">+</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-red-600 hover:text-red-800">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border h-fit">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>₹{getTotalPrice().toLocaleString()}</span>
              </div>
            </div>
            <Link to="/checkout" className="w-full block text-center py-3 px-6 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
