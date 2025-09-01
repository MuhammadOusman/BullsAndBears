import React, { useState, useEffect } from 'react';
import { authAPI, authUtils } from '../../services/api';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Spot');
  const [chartRange, setChartRange] = useState('7D');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      if (!authUtils.isAuthenticated()) {
        return;
      }

      const response = await authAPI.getUserProfile();
      if (!response.err) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 py-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Hello {user?.fullName?.split(' ')[0] || 'Trader'} !
          </h1>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-400">Account Balance</div>
          <div className="text-2xl md:text-3xl font-bold">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
            ) : (
              `$${user?.walletBalance?.toFixed(2) || '0.00'}`
            )}
          </div>
        </div>
      </div>

      {/* Large Chart Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>More</span>
          </div>

          <div className="flex items-center gap-3">
            {['7D', '1M', '1Y', 'YTD'].map(range => (
              <button
                key={range}
                onClick={() => setChartRange(range)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  chartRange === range
                    ? 'bg-red-600 text-white shadow'
                    : 'text-gray-500 border border-gray-100 bg-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-red-50 to-white">
          {/* Y axis labels */}
          <div className="absolute left-6 top-6 bottom-6 flex flex-col justify-between text-xs text-gray-400">
            <span>10k</span>
            <span>6k</span>
            <span>4k</span>
            <span>2k</span>
            <span>0</span>
          </div>

          {/* Area chart */}
          <div className="pl-20 pr-6 py-6">
            <svg viewBox="0 0 800 220" className="w-full h-56 md:h-72">
              <defs>
                <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#fecaca" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#fee2e2" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              <path 
                d="M0,160 C80,140 160,130 240,120 C320,110 400,115 480,105 C560,95 640,100 720,95 L800,90 L800,220 L0,220 Z" 
                fill="url(#grad)" 
              />
              <polyline 
                points="0,160 80,140 160,130 240,120 320,110 400,115 480,105 560,95 640,100 720,95 800,90" 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>

            <div className="absolute top-6 left-6 bg-black text-white text-sm px-3 py-1 rounded shadow">$7,980</div>
          </div>

          {/* Month labels */}
          <div className="px-20 pb-4 pt-2">
            <div className="flex justify-between text-xs text-gray-400">
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'].map(m => (
                <div key={m} className="w-1/12 text-center">{m}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + Market / Chart grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex gap-4 mb-6">
            {['Spot','Crypto','Fiat','Stocks'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white text-red-600 border border-red-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xs text-gray-500">Pair</div>
                <div className="text-sm font-medium">BTC/USD</div>
              </div>

              <div className="flex items-center gap-6 text-xs text-gray-500">
                <div className="text-center">
                  <div className="text-gray-400">Last price</div>
                  <div className="font-medium text-gray-800">0.006800 $500.58</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">24h Change</div>
                  <div className="text-green-600 font-medium">0.000647 +1.24%</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">24h High</div>
                  <div className="font-medium">0.000009</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">24h Volume</div>
                  <div className="font-medium">8,533.12 BTC</div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500">Trading market</div>
            <div className="h-56 bg-gray-50 rounded-lg relative overflow-hidden">
              <svg viewBox="0 0 600 140" className="w-full h-full absolute">
                {[...Array(18)].map((_, i) => {
                  const x = 10 + i * 32;
                  const isGreen = Math.random() > 0.5;
                  const h = 10 + Math.random() * 40;
                  const y = 60 - Math.random() * 20;
                  return (
                    <g key={i}>
                      <rect x={x} y={y} width="12" height={h} fill={isGreen ? '#10b981' : '#ef4444'} />
                      <line x1={x+6} x2={x+6} y1={y-8} y2={y+h+8} stroke={isGreen ? '#10b981' : '#ef4444'} strokeWidth="1" />
                    </g>
                  )
                })}
              </svg>

              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button className="w-14 py-1 rounded bg-green-600 text-white text-xs font-medium">BUY</button>
                <button className="w-14 py-1 rounded bg-red-600 text-white text-xs font-medium">SELL</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column placeholder for larger trading view */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">Detailed Market</div>
            <div className="text-xs text-gray-400">BTC/USD</div>
          </div>

          <div className="h-96 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-gray-300">
            {/* Placeholder for a detailed chart or widget - matches screenshot area */}
            <div>Chart Widget</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;