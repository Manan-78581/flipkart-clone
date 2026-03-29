import React, { useState, useEffect, useRef } from 'react';

const banners = [
  { bg: '#ffedd5', logo: 'ADIDAS', logoColor: '#c2410c', title: 'Sports shoes & sneakers', subtitle: 'Min 50% Off', desc: 'Elevate your game with ADIDAS', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80', category: 'Fashion' },
  { bg: '#f3f4f6', logo: 'SAMSUNG', logoColor: '#1f2937', title: 'Galaxy S25 Ultra', subtitle: 'Starting ₹1,24,999', desc: 'AI-powered · 200MP Camera · Titanium', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80', category: 'Mobiles' },
  { bg: '#d1fae5', logo: 'Apple', logoColor: '#065f46', title: 'MacBook Air M3', subtitle: 'From ₹99,900', desc: '18hr battery · Retina Display · 8GB RAM', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80', category: 'Electronics' },
  { bg: '#dbeafe', logo: 'LG', logoColor: '#1e40af', title: 'Best-selling Refrigerators', subtitle: 'From ₹8,990*', desc: 'Prepaids | SuperCoins | Exchange Offers', img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&q=80', category: 'Appliances' },
  { bg: '#fce7f3', logo: 'NIKE', logoColor: '#9d174d', title: 'Running shoes & more', subtitle: 'Up to 40% Off', desc: 'Just Do It — Free delivery on ₹499+', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&q=80', category: 'Sports' },
  { bg: '#e0f2fe', logo: 'SONY', logoColor: '#075985', title: 'WH-1000XM5 Headphones', subtitle: 'At ₹24,990', desc: 'Industry-leading noise cancellation', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80', category: 'Electronics' },
];

const BannerAds: React.FC<{ onCategorySelect: (cat: string) => void }> = ({ onCategorySelect }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % banners.length), 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const visible = Array.from({ length: 3 }, (_, i) => banners[(current + i) % banners.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex gap-3">
        {visible.map((b, i) => (
          <div key={`${current}-${i}`} className="flex-1 rounded-xl overflow-hidden h-48 relative cursor-pointer" style={{ background: b.bg }} onClick={() => onCategorySelect(b.category)}>
            <div className="absolute left-0 top-0 h-full flex flex-col justify-center px-4 gap-1 w-3/5">
              <span className="text-base font-black" style={{ color: b.logoColor }}>{b.logo}</span>
              <p className="text-gray-900 font-black text-sm leading-tight">{b.title}</p>
              <p className="text-gray-800 font-bold text-base leading-tight">{b.subtitle}</p>
              <p className="text-gray-600 font-medium text-xs">{b.desc}</p>
            </div>
            <div className="absolute right-0 top-0 h-full w-2/5 flex items-center justify-center p-1">
              <img src={b.img} alt={b.logo} className="h-full w-full object-contain mix-blend-multiply" />
            </div>
            <div className="absolute bottom-2 right-2 bg-gray-300 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded">AD</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1.5 mt-2">
        {banners.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 ${i === current ? 'w-4 h-1.5 bg-[#2874F0]' : 'w-1.5 h-1.5 bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
};

export default BannerAds;
