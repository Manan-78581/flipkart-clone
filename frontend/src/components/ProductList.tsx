import React, { useState, useEffect, useMemo } from 'react';
import Filter from './Filter';
import ProductGrid from './ProductGrid';
import { Product } from '../data/products';

const ProductList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.REACT_APP_API_URL}/api/products`).then(r => r.json()),
      fetch(`${process.env.REACT_APP_API_URL}/api/categories`).then(r => r.json()),
    ])
      .then(([prods, cats]) => { setProducts(prods); setCategories(cats); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() =>
    products.filter((p: Product) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || p.category === selectedCategory)
    ),
    [products, searchTerm, selectedCategory]
  );

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-lg text-gray-600">Loading products...</p>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4">
        <Filter categories={categories} selectedCategory={selectedCategory} onChange={setSelectedCategory} />
      </div>
      <ProductGrid products={filteredProducts} />
    </main>
  );
};

export default ProductList;
