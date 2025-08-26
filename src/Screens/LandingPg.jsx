

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPg = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b">
        <div className="font-bold text-xl">LOGO</div>
        <div>
          <button onClick={() => navigate('/login')} className="border rounded-full px-6 py-2 mr-2 hover:bg-gray-100">Log In</button>
          <button onClick={() => navigate('/signup')} className="border rounded-full px-6 py-2 bg-red-500 text-white hover:bg-red-600">Sign Up</button>
        </div>
      </header>

  {/* Hero Section */}
  <section className="flex flex-col md:flex-row items-center justify-between px-8 py-12 gap-8 opacity-0 translate-y-6 animate-fadeinup transition-all duration-700 shadow-md hover:shadow-xl bg-white rounded-xl">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trade Smarter.<br />
            <span className="text-red-500">Invest In Crypto,<br />Stocks &amp; Commodities.</span>
          </h2>
          <p className="mb-6 text-gray-700">A secure, all-in-one platform to manage and grow your digital &amp; traditional assets.</p>
          <button className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold transition-transform duration-200 hover:bg-red-600 hover:scale-105 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.28)]">Join Us</button>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="/landing-top.png" alt="Trading" className="rounded-xl w-full max-w-xs md:max-w-sm transition-transform duration-200 hover:scale-105 hover:brightness-105 shadow-[0_24px_48px_-8px_rgba(0,0,0,0.32)]" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 px-8 py-10 opacity-0 translate-y-6 animate-fadeinup transition-all duration-700 shadow hover:shadow-lg rounded-xl">
        <h3 className="text-2xl font-bold text-red-500 mb-4 transition-colors duration-300 hover:text-red-600">Why Choose Us?</h3>
        <ul className="text-gray-700 space-y-2">
          <li><span className="font-semibold">Bank-Grade Security:</span> Your Funds And Data Are Always Protected.</li>
          <li><span className="font-semibold">Instant Deposits &amp; Withdrawals:</span> Seamless Transactions In All Currencies.</li>
          <li><span className="font-semibold">All-In-One Platform:</span> Access Crypto, Stocks, Commodities In One Place.</li>
        </ul>
      </section>

  {/* Start In Just 3 Steps */}
  <section className="flex flex-col md:flex-row items-center justify-between px-8 py-12 gap-8 opacity-0 translate-y-6 animate-fadeinup transition-all duration-700 shadow-md hover:shadow-xl bg-white rounded-xl">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-red-500 mb-4">Start In Just 3 Steps</h3>
          <ol className="list-decimal list-inside text-gray-700 mb-6">
            <li>Sign Up &amp; Verify</li>
            <li>Deposit Funds</li>
            <li>Start Trading</li>
          </ol>
          <button className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold transition-transform duration-200 hover:bg-red-600 hover:scale-105 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.28)]">Get Started Now</button>
        </div>
        <div className="flex-1 flex justify-center">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 hover:scale-105">
            <rect x="20" y="60" width="15" height="40" rx="4" fill="#F87171" fillOpacity="0.2" />
            <rect x="45" y="45" width="15" height="55" rx="4" fill="#F87171" fillOpacity="0.4" />
            <rect x="70" y="30" width="15" height="70" rx="4" fill="#F87171" fillOpacity="0.6" />
            <rect x="95" y="15" width="15" height="85" rx="4" fill="#F87171" />
          </svg>
        </div>
      </section>

  {/* Global Trading Section */}
  <section className="flex flex-col md:flex-row items-center justify-between px-8 py-12 gap-8 opacity-0 translate-y-6 animate-fadeinup transition-all duration-700 shadow-md hover:shadow-xl bg-white rounded-xl">

        <div className="flex-1 flex justify-center">
          <img src="/landing-bottom.png" alt="Crypto" className="rounded-xl w-full max-w-xs md:max-w-sm transition-transform duration-200 hover:scale-105 hover:brightness-105 shadow-[0_24px_48px_-8px_rgba(0,0,0,0.32)]" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-red-500 mb-4">Global Trading At Your Fingertips</h3>
          <p className="text-gray-700 mb-6">Manage And Trade Cryptocurrencies, Global Stocks, Commodities And Currencies. All On A Trusted Platform With Top-Tier Security, Powerful Tools, And User-Friendly Features Designed For Every Type Of Investor. Access Seamless Deposits, Withdrawals, And Insights To Grow Your Portfolio With Confidence.</p>
          <button className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold transition-transform duration-200 hover:bg-red-600 hover:scale-105 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.28)]">Start Trading Now</button>
        </div>
      </section>

      {/* Footer - matches screenshot */}
      <footer className="bg-gray-200 px-12 pt-12 pb-4 mt-auto border-t">
        <div className="flex flex-col md:flex-row justify-between items-start mb-2">
          {/* Left: Headline */}
          <div className="font-bold text-xl text-gray-800 mb-8 md:mb-0 md:w-1/2">
            Your trusted partner in trading<br />
            and asset management.
          </div>
          {/* Right: Links in two columns */}
          <div className="flex gap-16 md:gap-24 text-gray-800 text-base md:w-1/2 justify-end">
            <div className="flex flex-col gap-3">
              <a href="#" className="">Home</a>
              <a href="#" className="">Watchlist</a>
              <a href="#" className="">Trade</a>
              <a href="#" className="">Discover</a>
              <a href="#" className="">Wallet</a>
              <a href="#" className="">Contact Us</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="">Terms of Service</a>
              <a href="#" className="">Privacy Policy</a>
            </div>
          </div>
        </div>
        {/* Bottom: Copyright, left-aligned and bold */}
        <div className="border-t border-gray-400 mt-6 mb-2"></div>
        <div className="text-left text-black text-sm font-bold pl-1">© 2025 Investalyst. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default LandingPg;