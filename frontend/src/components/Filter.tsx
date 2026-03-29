import React from 'react';

const categoryIcons: Record<string, JSX.Element> = {
  'For You': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect x="6" y="6" width="28" height="28" rx="4" stroke="#878787" strokeWidth="2"/>
      <path d="M14 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#f0c000" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="20" cy="23" r="3" fill="#f0c000"/>
    </svg>
  ),
  'Fashion': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <path d="M14 8l-6 8h5v16h14V16h5l-6-8" stroke="#878787" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M14 8c0 3.314 2.686 6 6 6s6-2.686 6-6" stroke="#878787" strokeWidth="2"/>
    </svg>
  ),
  'Mobiles': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect x="12" y="4" width="16" height="32" rx="3" stroke="#878787" strokeWidth="2"/>
      <line x1="12" y1="10" x2="28" y2="10" stroke="#878787" strokeWidth="2"/>
      <line x1="12" y1="30" x2="28" y2="30" stroke="#878787" strokeWidth="2"/>
      <circle cx="20" cy="34" r="1.5" fill="#f0c000"/>
    </svg>
  ),
  'Beauty': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect x="15" y="4" width="10" height="6" rx="2" stroke="#878787" strokeWidth="2"/>
      <rect x="12" y="10" width="16" height="24" rx="3" stroke="#878787" strokeWidth="2"/>
      <line x1="20" y1="16" x2="20" y2="28" stroke="#f0c000" strokeWidth="2"/>
      <line x1="14" y1="22" x2="26" y2="22" stroke="#f0c000" strokeWidth="2"/>
    </svg>
  ),
  'Electronics': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect x="5" y="8" width="30" height="20" rx="2" stroke="#878787" strokeWidth="2"/>
      <line x1="14" y1="28" x2="12" y2="34" stroke="#878787" strokeWidth="2"/>
      <line x1="26" y1="28" x2="28" y2="34" stroke="#878787" strokeWidth="2"/>
      <line x1="10" y1="34" x2="30" y2="34" stroke="#878787" strokeWidth="2"/>
      <rect x="10" y="12" width="20" height="12" rx="1" fill="#f0c000" fillOpacity="0.3" stroke="#f0c000" strokeWidth="1.5"/>
    </svg>
  ),
  'Home': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <path d="M8 18l12-12 12 12" stroke="#878787" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="13" y="22" width="14" height="12" rx="1" stroke="#878787" strokeWidth="2"/>
      <rect x="17" y="26" width="6" height="8" rx="1" fill="#f0c000" fillOpacity="0.4"/>
      <line x1="20" y1="6" x2="20" y2="10" stroke="#f0c000" strokeWidth="2"/>
    </svg>
  ),
  'Appliances': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect x="8" y="6" width="24" height="28" rx="2" stroke="#878787" strokeWidth="2"/>
      <line x1="8" y1="16" x2="32" y2="16" stroke="#878787" strokeWidth="2"/>
      <circle cx="26" cy="11" r="2" fill="#f0c000"/>
      <circle cx="20" cy="26" r="5" stroke="#f0c000" strokeWidth="2"/>
    </svg>
  ),
  'Toys': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <circle cx="20" cy="22" r="10" stroke="#878787" strokeWidth="2"/>
      <circle cx="15" cy="16" r="3" stroke="#878787" strokeWidth="2"/>
      <circle cx="25" cy="16" r="3" stroke="#878787" strokeWidth="2"/>
      <path d="M15 26c1.5 2 8.5 2 10 0" stroke="#f0c000" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="17" cy="23" r="1" fill="#878787"/>
      <circle cx="23" cy="23" r="1" fill="#878787"/>
    </svg>
  ),
  'Food': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <path d="M10 12v6a8 8 0 0016 0v-6" stroke="#878787" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="8" x2="18" y2="14" stroke="#878787" strokeWidth="2" strokeLinecap="round"/>
      <line x1="22" y1="8" x2="22" y2="14" stroke="#878787" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="26" x2="18" y2="34" stroke="#878787" strokeWidth="2"/>
      <line x1="22" y1="26" x2="22" y2="34" stroke="#878787" strokeWidth="2"/>
      <line x1="15" y1="34" x2="25" y2="34" stroke="#f0c000" strokeWidth="2"/>
    </svg>
  ),
  'Auto': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <path d="M6 22l4-10h20l4 10" stroke="#878787" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="4" y="22" width="32" height="10" rx="2" stroke="#878787" strokeWidth="2"/>
      <circle cx="12" cy="32" r="3" fill="white" stroke="#878787" strokeWidth="2"/>
      <circle cx="28" cy="32" r="3" fill="white" stroke="#878787" strokeWidth="2"/>
      <rect x="14" y="14" width="12" height="8" rx="1" fill="#f0c000" fillOpacity="0.4"/>
    </svg>
  ),
  '2 Wheelers': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <circle cx="10" cy="28" r="6" stroke="#878787" strokeWidth="2"/>
      <circle cx="30" cy="28" r="6" stroke="#878787" strokeWidth="2"/>
      <path d="M10 28l8-14h6l6 14" stroke="#878787" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M18 14h4l2 6h-8z" fill="#f0c000" fillOpacity="0.5"/>
    </svg>
  ),
  'Sports': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <line x1="10" y1="32" x2="28" y2="10" stroke="#878787" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="31" cy="9" rx="5" ry="3" transform="rotate(-45 31 9)" stroke="#f0c000" strokeWidth="2"/>
      <circle cx="12" cy="31" r="3" fill="#f0c000" fillOpacity="0.5" stroke="#878787" strokeWidth="1.5"/>
    </svg>
  ),
  'Books': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect x="8" y="6" width="18" height="28" rx="1" stroke="#878787" strokeWidth="2"/>
      <rect x="10" y="6" width="4" height="28" fill="#f0c000" fillOpacity="0.5"/>
      <line x1="14" y1="14" x2="22" y2="14" stroke="#878787" strokeWidth="1.5"/>
      <line x1="14" y1="19" x2="22" y2="19" stroke="#878787" strokeWidth="1.5"/>
      <line x1="14" y1="24" x2="20" y2="24" stroke="#878787" strokeWidth="1.5"/>
    </svg>
  ),
  'Furniture': (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect x="6" y="18" width="28" height="10" rx="3" stroke="#878787" strokeWidth="2"/>
      <rect x="10" y="12" width="20" height="8" rx="2" stroke="#878787" strokeWidth="2"/>
      <line x1="10" y1="28" x2="10" y2="35" stroke="#878787" strokeWidth="2" strokeLinecap="round"/>
      <line x1="30" y1="28" x2="30" y2="35" stroke="#878787" strokeWidth="2" strokeLinecap="round"/>
      <rect x="10" y="14" width="20" height="6" rx="1" fill="#f0c000" fillOpacity="0.3"/>
    </svg>
  ),
};

const categoryKey = (cat: string) => {
  if (cat === 'For You') return 'For You';
  if (cat.includes('Fashion') || cat === 'Men Fashion' || cat === 'Women Fashion') return 'Fashion';
  if (cat === 'Mobiles') return 'Mobiles';
  if (cat === 'Beauty') return 'Beauty';
  if (cat === 'Electronics') return 'Electronics';
  if (cat === 'Home') return 'Home';
  if (cat === 'Appliances') return 'Appliances';
  if (cat === 'Toys' || cat === 'Kids') return 'Toys';
  if (cat === 'Food') return 'Food';
  if (cat === 'Auto') return 'Auto';
  if (cat === '2 Wheelers') return '2 Wheelers';
  if (cat === 'Sports') return 'Sports';
  if (cat === 'Books') return 'Books';
  if (cat === 'Furniture') return 'Furniture';
  return cat;
};

interface FilterProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, selectedCategory, onChange }) => (
  <div className="flex justify-center overflow-x-auto border-b border-gray-200 scrollbar-hide">
    {categories.map((category) => {
      const key = categoryKey(category);
      const icon = categoryIcons[key];
      if (!icon) return null;
      const isSelected = selectedCategory === category;
      return (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`flex flex-col items-center px-4 py-3 min-w-[80px] flex-shrink-0 border-b-2 transition-colors duration-150 ${
            isSelected ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
          }`}
        >
          <div className={isSelected ? '[&_path]:stroke-[#f0c000] [&_rect]:stroke-[#f0c000] [&_circle]:stroke-[#f0c000] [&_line]:stroke-[#f0c000] [&_ellipse]:stroke-[#f0c000]' : ''}>
            {icon}
          </div>
          <span className={`text-xs mt-1 whitespace-nowrap ${isSelected ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
            {category}
          </span>
        </button>
      );
    })}
  </div>
);

export default Filter;
