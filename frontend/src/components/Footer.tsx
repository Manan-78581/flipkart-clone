import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-[#172337] text-gray-400 mt-12">
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-600">
      <div>
        <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">About</h3>
        <ul className="space-y-2 text-sm">
          {['Contact Us','About Us','Careers','Flipkart Stories','Press','Corporate Information'].map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Help</h3>
        <ul className="space-y-2 text-sm">
          {['Payments','Shipping','Cancellation & Returns','FAQ','Report Infringement'].map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Policy</h3>
        <ul className="space-y-2 text-sm">
          {['Return Policy','Terms of Use','Security','Privacy','Sitemap','EPR Compliance'].map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Social</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            Facebook
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            Twitter
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="#172337" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            YouTube
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
            Instagram
          </li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
      <div className="flex items-center gap-2">
        <img src="/flipkart-logo.png" alt="Flipkart" className="h-6 object-contain brightness-0 invert opacity-70" />
        <span>© {new Date().getFullYear()} Flipkart Clone. All rights reserved.</span>
      </div>
      <div className="flex items-center gap-3 text-gray-500 text-xs">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          Secure Payments
        </span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          Easy Returns
        </span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          24/7 Support
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
