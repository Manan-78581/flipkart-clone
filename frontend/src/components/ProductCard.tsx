import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 relative">
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
        className="absolute top-3 right-3 z-10"
      >
        <svg className="w-5 h-5" fill={wishlisted ? '#ef4444' : 'none'} stroke={wishlisted ? '#ef4444' : '#9ca3af'} strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-sm text-gray-600 ml-1">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-bold text-gray-900">₹{Number(product.price).toLocaleString()}</span>
          {product.original_price && (
            <>
              <span className="text-sm text-gray-500 line-through">₹{Number(product.original_price).toLocaleString()}</span>
              <span className="text-sm text-green-600 font-medium">{discount}% off</span>
            </>
          )}
        </div>
        <div className="text-sm">
          {product.stock > 0
            ? <span className="text-green-600">In stock</span>
            : <span className="text-red-600">Out of stock</span>
          }
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
