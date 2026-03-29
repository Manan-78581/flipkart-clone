import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Product } from '../data/products';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
        if (response.ok) setProduct(await response.json());
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const nextImage = () => {
    if (product) setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (product) setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      addToast(`${product.name} added to cart!`, 'success');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-red-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img src={product.images[currentImageIndex]} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded border-2 ${index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'}`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover rounded" />
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button onClick={prevImage} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Previous</button>
            <button onClick={nextImage} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Next</button>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="text-lg text-gray-600 ml-2">{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.original_price && (
              <span className="text-xl text-gray-500 line-through">₹{product.original_price.toLocaleString()}</span>
            )}
          </div>

          <div className="text-lg">
            {product.stock > 0
              ? <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
              : <span className="text-red-600 font-medium">Out of Stock</span>
            }
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="flex w-full mt-4 border-t pt-4 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 py-3.5 px-4 bg-white border border-gray-300 text-[#1C2B33] font-semibold text-base sm:text-lg flex items-center justify-center transition-colors hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded-xl"
            >
              <span>Add to cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 py-3.5 px-4 bg-[#FFD700] text-[#1C2B33] font-semibold text-base sm:text-lg flex items-center justify-center transition-opacity hover:opacity-90 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed rounded-xl"
            >
              <span>Buy at ₹{product.price.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
