import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filter from './Filter';
import ProductGrid from './ProductGrid';
import BannerAds from './BannerAds';
import { Product } from '../data/products';

const categoryBrands: Record<string, { label: string; img: string }[]> = {
  Mobiles: [
    { label: 'iPhone', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=120&q=80' },
    { label: 'Samsung', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=120&q=80' },
    { label: 'OnePlus', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=120&q=80' },
    { label: 'Redmi', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=120&q=80' },
    { label: 'POCO', img: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=120&q=80' },
    { label: 'realme', img: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=120&q=80' },
    { label: 'motorola', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&q=80' },
    { label: 'vivo', img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=120&q=80' },
  ],
  Electronics: [
    { label: 'Sony', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=80' },
    { label: 'Apple', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=120&q=80' },
    { label: 'Dell', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=120&q=80' },
    { label: 'LG', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=120&q=80' },
    { label: 'iPad', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=120&q=80' },
    { label: 'Samsung', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=120&q=80' },
  ],
  Fashion: [
    { label: 'Celeb Looks', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=120&q=80' },
    { label: 'T-shirts Shirts', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&q=80' },
    { label: 'Jeans', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=120&q=80' },
    { label: 'Kurtas', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=120&q=80' },
    { label: 'Sports Wear', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80' },
    { label: 'Sunglasses', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=120&q=80' },
    { label: 'Sandals & clogs', img: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=120&q=80' },
    { label: 'Backpacks', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&q=80' },
    { label: 'Casual shoes', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=120&q=80' },
    { label: 'Formal shoes', img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=120&q=80' },
    { label: 'Trolley', img: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=120&q=80' },
    { label: "Kids' clothing", img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=120&q=80' },
    { label: 'Slides', img: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=120&q=80' },
    { label: 'Watches', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&q=80' },
    { label: 'Jewellery', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=120&q=80' },
  ],
  Appliances: [
    { label: 'Dyson', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80' },
    { label: 'Instant Pot', img: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=120&q=80' },
    { label: 'LG', img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=120&q=80' },
  ],
  Sports: [
    { label: 'Nike', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80' },
    { label: 'Adidas', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=120&q=80' },
    { label: 'Yoga', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=120&q=80' },
  ],
  Books: [
    { label: 'Harry Potter', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&q=80' },
    { label: 'Fiction', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&q=80' },
    { label: 'Non-Fiction', img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=120&q=80' },
  ],
  Furniture: [
    { label: 'IKEA', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&q=80' },
    { label: 'Study Table', img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=120&q=80' },
  ],
  Beauty: [
    { label: 'Maybelline', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=120&q=80' },
    { label: 'The Ordinary', img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=120&q=80' },
  ],
};

const categoryBanners: Record<string, { bg: string; logo: string; logoColor: string; title: string; subtitle: string; desc: string; img: string }[]> = {
  Mobiles: [
    { bg: '#dbeafe', logo: 'iPhone', logoColor: '#1e3a8a', title: 'iPhone 15 Pro', subtitle: 'From ₹1,34,900', desc: 'A17 Pro chip · Titanium design · 5x zoom', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&q=80' },
    { bg: '#f3f4f6', logo: 'SAMSUNG', logoColor: '#1f2937', title: 'Samsung Galaxy S24', subtitle: 'From ₹79,999', desc: 'Galaxy AI · 200MP Camera · Snapdragon 8 Gen 3', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80' },
    { bg: '#fee2e2', logo: 'OnePlus', logoColor: '#991b1b', title: 'OnePlus 12', subtitle: 'From ₹64,999', desc: 'Snapdragon 8 Gen 3 · 100W SUPERVOOC charging', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=300&q=80' },
  ],
  Electronics: [
    { bg: '#d1fae5', logo: 'Apple', logoColor: '#065f46', title: 'MacBook Air M3', subtitle: 'From ₹99,900', desc: '18hr battery · Retina Display · 8GB RAM', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80' },
    { bg: '#e0f2fe', logo: 'SONY', logoColor: '#075985', title: 'Sony WH-1000XM5', subtitle: 'At ₹24,990', desc: 'Industry-leading noise cancellation · 30hr battery', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80' },
    { bg: '#fce7f3', logo: 'LG', logoColor: '#9d174d', title: 'LG 55" OLED TV', subtitle: 'From ₹89,999', desc: 'Perfect blacks · Dolby Vision IQ · 4K', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=300&q=80' },
  ],
  Fashion: [
    { bg: '#ffedd5', logo: 'NIKE', logoColor: '#c2410c', title: 'Nike Air Max 270', subtitle: 'Min 50% Off', desc: 'Sports shoes & sneakers · Free delivery', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80' },
    { bg: '#f3e8ff', logo: 'ADIDAS', logoColor: '#6b21a8', title: 'Adidas Ultraboost 22', subtitle: 'From ₹14,999', desc: 'Boost midsole · Primeknit+ upper', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&q=80' },
    { bg: '#e0f2fe', logo: "Levi's", logoColor: '#0369a1', title: "Levi's 511 Slim Jeans", subtitle: 'From ₹2,999', desc: 'Classic slim fit · Stretch denim · All sizes', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80' },
    { bg: '#dcfce7', logo: 'WATCHES', logoColor: '#166534', title: 'Premium Watches', subtitle: 'Up to 60% Off', desc: 'Casio · Titan · Fossil · Seiko', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80' },
    { bg: '#e0e7ff', logo: 'BAGS', logoColor: '#3730a3', title: 'Backpacks & Trolleys', subtitle: 'From ₹999', desc: 'Travel · College · Office bags', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80' },
  ],
  Appliances: [
    { bg: '#fae8ff', logo: 'Dyson', logoColor: '#86198f', title: 'Dyson V15 Detect', subtitle: 'From ₹52,900', desc: 'Laser dust detection · 60min battery', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80' },
    { bg: '#fee2e2', logo: 'Instant Pot', logoColor: '#991b1b', title: 'Instant Pot Duo 7-in-1', subtitle: 'From ₹8,999', desc: 'Replaces 7 appliances · Cook 70% faster', img: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&q=80' },
    { bg: '#dbeafe', logo: 'LG', logoColor: '#1e40af', title: 'LG Refrigerator', subtitle: 'From ₹8,990', desc: 'No Cost EMI · Exchange Offers available', img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&q=80' },
  ],
};

const ProductList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [bannerIdx, setBannerIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedCategory = searchParams.get('category') || '';

  const handleCategoryChange = (cat: string) => {
    setSelectedBrand('');
    setBannerIdx(0);
    if (cat === '') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.REACT_APP_API_URL}/api/products`).then(r => r.json()),
      fetch(`${process.env.REACT_APP_API_URL}/api/categories`).then(r => r.json()),
    ])
      .then(([prods, cats]) => { setProducts(prods); setCategories(cats); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const banners = selectedCategory ? (categoryBanners[selectedCategory] || []) : [];

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (banners.length > 0) {
      timerRef.current = setInterval(() => setBannerIdx(i => (i + 1) % banners.length), 3500);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [selectedCategory, banners.length]);

  const brands = selectedCategory ? (categoryBrands[selectedCategory] || []) : [];

  const filteredProducts = useMemo(() =>
    products.filter((p: Product) => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === '' || p.category === selectedCategory;
      const matchBrand = selectedBrand === '' || p.name.toLowerCase().includes(selectedBrand.toLowerCase());
      return matchSearch && matchCategory && matchBrand;
    }),
    [products, searchTerm, selectedCategory, selectedBrand]
  );

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-lg text-gray-600">Loading products...</p>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-4">
      {/* Filter bar */}
      <Filter categories={categories} selectedCategory={selectedCategory} onChange={handleCategoryChange} />

      {/* Category banners */}
      {banners.length > 0 && (
        <div className="mt-4">
          <div className="flex gap-3">
            {Array.from({ length: 3 }, (_, i) => {
              const b = banners[(bannerIdx + i) % banners.length];
              return (
                <div key={i} className={`flex-1 rounded-xl h-40 relative overflow-hidden cursor-pointer flex items-center ${i > 0 ? 'hidden md:flex' : ''}`} style={{ background: b.bg }}>
                  <div className="flex flex-col justify-center px-4 gap-1 w-3/5">
                    <span className="text-sm font-black" style={{ color: b.logoColor }}>{b.logo}</span>
                    <p className="text-gray-900 font-black text-sm md:text-base leading-tight">{b.title}</p>
                    <p className="text-gray-800 font-bold text-xs md:text-sm leading-tight">{b.subtitle}</p>
                    <p className="text-gray-600 font-medium text-xs">{b.desc}</p>
                  </div>
                  <div className="w-2/5 h-full flex items-center justify-center p-2">
                    <img src={b.img} alt={b.title} className="h-full w-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-gray-300 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded">AD</div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-1.5 mt-2">
            {banners.map((_, i) => (
              <button key={i} onClick={() => setBannerIdx(i)} className={`rounded-full transition-all duration-300 ${i === bannerIdx ? 'w-4 h-1.5 bg-[#2874F0]' : 'w-1.5 h-1.5 bg-gray-300'}`} />
            ))}
          </div>
        </div>
      )}

      {/* Brand row */}
      {brands.length > 0 && (
        <div className="bg-white rounded-xl p-4 mt-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Shop by Brand</h2>
          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-1">
            {brands.map(brand => (
              <button
                key={brand.label}
                onClick={() => setSelectedBrand(selectedBrand === brand.label ? '' : brand.label)}
                className="flex flex-col items-center gap-2 flex-shrink-0 group"
              >
                <div className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedBrand === brand.label ? 'border-blue-500 shadow-md' : 'border-gray-200 group-hover:border-blue-300'}`}>
                  <img src={brand.img} alt={brand.label} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <span className={`text-xs font-medium ${selectedBrand === brand.label ? 'text-blue-600' : 'text-gray-600'}`}>{brand.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Default banners when no category selected */}
      {!selectedCategory && <BannerAds onCategorySelect={handleCategoryChange} />}

      {/* Products */}
      <div className="mt-4">
        <ProductGrid products={filteredProducts} />
      </div>
    </main>
  );
};

export default ProductList;
