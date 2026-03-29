import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">Thank you for shopping with us. Your order has been confirmed.</p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">Order ID</p>
          <p className="text-xl font-semibold text-gray-900">{id}</p>
        </div>
        <div className="space-y-4">
          <Link to="/" className="inline-block w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 text-center">
            Continue Shopping
          </Link>
          <button onClick={() => window.print()} className="inline-block w-full py-3 px-6 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300">
            Print Order Details
          </button>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmation;
