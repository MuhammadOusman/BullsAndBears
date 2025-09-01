import React, { useState } from 'react';

const Discover = () => {
  const [activeTab, setActiveTab] = useState('Stocks');
  const [marketCapTab, setMarketCapTab] = useState('Crypto');

  // Sample data for different sections
  const dailyMovers = [
    { symbol: 'ALAGR.PA', name: 'Agarenergia SA', change: '+36.84%', type: 'positive' },
    { symbol: 'OCI.NV', name: 'OCI NV', change: '-34.18%', type: 'negative' },
    { symbol: 'EAAS.L', name: 'Energy Group P.L.C', change: '+31.05%', type: 'positive' },
    { symbol: 'SYMEL', name: 'Suprema Capital Plc', change: '-26.18%', type: 'negative' }
  ];

  const popularStocks = [
    { rank: 1, name: 'AAPL', company: 'Apple Inc.', price: '$175.43', volume: '58.5M' },
    { rank: 2, name: 'TSLA', company: 'Tesla Inc.', price: '$245.17', volume: '45.2M' },
    { rank: 3, name: 'NVDA', company: 'NVIDIA Corporation', price: '$502.61', volume: '38.7M' },
    { rank: 4, name: 'AMZN', company: 'Amazon.com Inc.', price: '$142.23', volume: '32.1M' },
    { rank: 5, name: 'MSFT', company: 'Microsoft Corporation', price: '$337.89', volume: '28.9M' },
    { rank: 6, name: 'GOOGL', company: 'Alphabet Inc.', price: '$125.42', volume: '25.6M' }
  ];

  const trendingAssets = [
    { name: 'HIMS', price: '45.98', change: '-2.12%', type: 'negative' },
    { name: 'CCOI', price: '37.44', change: '9.50%', type: 'positive' },
    { name: 'LEN', price: '131.50', change: '-0.12%', type: 'negative' }
  ];

  const marketCapData = [
    { rank: 1, coin: 'BTC', name: 'Bitcoin', price: '110,434.38', change: '2.3T', marketCap: '64.17B', volume: '64.17B', signal: 'HOLD' },
    { rank: 2, coin: 'ETH', name: 'Ethereum', price: '2,840.40', change: '1.5T', marketCap: '24.17B', volume: '24.17B', signal: 'HOLD' },
    { rank: 3, coin: 'BTC', name: 'Bitcoin', price: '58,642.89', change: '2.3T', marketCap: '64.17B', volume: '64.17B', signal: 'HOLD' }
  ];

  const stocksData = [
    { rank: 1, coin: 'AAPL', name: 'Apple Inc.', price: '175.43', change: '2.8T', marketCap: '2.75T', volume: '58.5M', signal: 'BUY' },
    { rank: 2, coin: 'MSFT', name: 'Microsoft Corp.', price: '337.89', change: '2.5T', marketCap: '2.51T', volume: '28.9M', signal: 'HOLD' },
    { rank: 3, coin: 'GOOGL', name: 'Alphabet Inc.', price: '125.42', change: '1.6T', marketCap: '1.58T', volume: '25.6M', signal: 'BUY' }
  ];

  const indicesData = [
    { rank: 1, coin: 'SPY', name: 'S&P 500 ETF', price: '445.23', change: '42.1T', marketCap: '385B', volume: '87.2M', signal: 'HOLD' },
    { rank: 2, coin: 'QQQ', name: 'Nasdaq 100 ETF', price: '378.91', change: '15.8T', marketCap: '189B', volume: '42.1M', signal: 'BUY' },
    { rank: 3, coin: 'IWM', name: 'Russell 2000 ETF', price: '198.45', change: '2.9T', marketCap: '67B', volume: '25.8M', signal: 'SELL' }
  ];

  const commoditiesData = [
    { rank: 1, market: 'USD/DOLLAR', change: '0.38', type: 'positive' },
    { rank: 2, market: 'SP500', change: '-32.35', type: 'negative' },
    { rank: 3, market: 'LN100', change: '100.04', type: 'positive' },
    { rank: 4, market: 'OIL', change: '0.38', type: 'positive' },
    { rank: 5, market: 'GOLD', change: '-32.35', type: 'negative' },
    { rank: 6, market: 'SILVER', change: '100.04', type: 'positive' }
  ];

  // Function to get current market cap data based on active tab
  const getCurrentMarketData = () => {
    switch(marketCapTab) {
      case 'Crypto': return marketCapData;
      case 'Stocks': return stocksData;
      case 'Indices': return indicesData;
      default: return marketCapData;
    }
  };

  // Function to get market description based on active tab
  const getMarketDescription = () => {
    switch(marketCapTab) {
      case 'Crypto': 
        return {
          text: 'The crypto global market cap is',
          value: '$ 3.01T',
          change: '-2.70%',
          description: 'decrease over the last day.'
        };
      case 'Stocks':
        return {
          text: 'The global stock market cap is',
          value: '$ 85.2T',
          change: '+1.25%',
          description: 'increase over the last day.'
        };
      case 'Indices':
        return {
          text: 'The global indices market cap is',
          value: '$ 45.8T',
          change: '+0.85%',
          description: 'increase over the last day.'
        };
      default:
        return {
          text: 'The crypto global market cap is',
          value: '$ 3.01T',
          change: '-2.70%',
          description: 'decrease over the last day.'
        };
    }
  };

  const marketAnalysis = [
    { rank: 1, stock: 'SNOW', company: 'Snowflake Inc.', price: '108.50', target: '234.60', rating: 'Strong buy' },
    { rank: 2, stock: 'MTOR', company: 'Meritor Inc.', price: '41.26', target: '64.71', rating: 'Strong buy' },
    { rank: 3, stock: 'WMT', company: 'Walmart Inc.', price: '100.04', target: '115.83', rating: 'Strong buy' }
  ];

  const SparklineChart = ({ type }) => (
    <svg width="60" height="30" viewBox="0 0 60 30">
      <polyline
        points={type === 'positive' ? "5,25 15,20 25,15 35,10 45,5 55,2" : "5,5 15,8 25,12 35,18 45,22 55,25"}
        fill="none"
        stroke={type === 'positive' ? '#10b981' : '#ef4444'}
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Daily Movers Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Daily Movers</h2>
          <p className="text-gray-600">Explore the biggest stocks movers on the market</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dailyMovers.map((stock, index) => (
            <div key={index} className={`p-4 rounded-xl border-2 ${index === 2 ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  stock.type === 'positive' ? 'bg-green-500' : 'bg-gray-500'
                }`}>
                  {stock.symbol.substring(0, 2)}
                </div>
                <span className={`text-sm font-medium ${stock.type === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change}
                </span>
              </div>
              <div className="text-lg font-bold">{stock.symbol}</div>
              <div className="text-sm text-gray-600">{stock.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Stocks Section */}
        <div>
          <div className="bg-gray-100 rounded-xl p-6 mb-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">The most popular</h3>
              <h3 className="text-xl font-bold text-green-500">Stocks</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600">
                <span>#</span>
                <span>Asset</span>
                <span>Price</span>
                <span>Volume</span>
              </div>
            </div>
            <div className="divide-y">
              {popularStocks.map((stock) => (
                <div key={stock.rank} className="p-4 hover:bg-gray-50">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <span className="text-sm">{stock.rank}</span>
                    <div>
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-sm text-gray-500">{stock.company}</div>
                    </div>
                    <span className="font-medium text-red-500">{stock.price}</span>
                    <span className="text-sm">{stock.volume}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Assets Section */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Trending Assets</h3>
            <p className="text-sm text-gray-600">Assets acquiring among top Investors right now</p>
          </div>
          
          <div className="grid gap-4">
            {trendingAssets.map((asset, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                index === 1 ? 'bg-pink-100' : 'bg-gray-100'
              }`}>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Items</div>
                  <div className="text-2xl font-bold mb-1">{asset.name}</div>
                  <div className="text-lg font-medium mb-2">{asset.price}</div>
                  <div className={`text-sm font-medium ${asset.type === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                    {asset.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Cap Section */}
      <div>
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            {['Crypto', 'Stocks', 'Indices', 'Commodities'].map(tab => (
              <button
                key={tab}
                onClick={() => setMarketCapTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  marketCapTab === tab
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-2">By Market Cap</h2>
          {marketCapTab !== 'Commodities' && (
            <div className="flex items-center gap-2 text-sm">
              <span>{getMarketDescription().text}</span>
              <span className="text-green-500 font-medium">{getMarketDescription().value}</span>
              <span>, a</span>
              <span className={`font-medium ${getMarketDescription().change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                {getMarketDescription().change}
              </span>
              <span>{getMarketDescription().description}</span>
            </div>
          )}
        </div>

        {marketCapTab === 'Commodities' ? (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600">
                <span>#</span>
                <span>Market</span>
                <span>Change</span>
                <span>1D %</span>
              </div>
            </div>
            <div className="divide-y">
              {commoditiesData.map((item) => (
                <div key={item.rank} className="p-4 hover:bg-gray-50">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <span className="text-sm">{item.rank}</span>
                    <span className="font-medium">{item.market}</span>
                    <span className={`font-medium ${item.type === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                      {item.change}
                    </span>
                    <div className="w-16">
                      <SparklineChart type={item.type} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b">
              <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-600">
                <span>#</span>
                <span>{marketCapTab === 'Crypto' ? 'Coin' : marketCapTab === 'Stocks' ? 'Stock' : 'Index'}</span>
                <span>Price</span>
                <span>Last 7 Days</span>
                <span>Market Cap</span>
                <span>Volume (24h)</span>
                <span>Signal</span>
              </div>
            </div>
            <div className="divide-y">
              {getCurrentMarketData().map((item) => (
                <div key={item.rank} className="p-4 hover:bg-gray-50">
                  <div className="grid grid-cols-7 gap-4 items-center">
                    <span className="text-sm">{item.rank}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        marketCapTab === 'Crypto' ? 'bg-orange-500' : 
                        marketCapTab === 'Stocks' ? 'bg-blue-500' : 'bg-green-500'
                      }`}>
                        {item.coin}
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="font-medium">${item.price}</span>
                    <div className="w-16">
                      <SparklineChart type="negative" />
                    </div>
                    <span className="text-sm">{item.marketCap}</span>
                    <span className="text-sm">{item.volume}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.signal === 'BUY' ? 'bg-green-100 text-green-700' :
                      item.signal === 'SELL' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.signal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Market Analysis Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Market Analysis</h2>
          <p className="text-gray-600">Based on insight from top analysts</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-600">
              <span>#</span>
              <span>Stock</span>
              <span>Current Price</span>
              <span>Last 30 Days</span>
              <span>Target Price</span>
              <span>Rating</span>
            </div>
          </div>
          <div className="divide-y">
            {marketAnalysis.map((item) => (
              <div key={item.rank} className="p-4 hover:bg-gray-50">
                <div className="grid grid-cols-6 gap-4 items-center">
                  <span className="text-sm">{item.rank}</span>
                  <div>
                    <div className="font-medium">{item.stock}</div>
                    <div className="text-sm text-gray-500">{item.company}</div>
                  </div>
                  <span className="font-medium">${item.price}</span>
                  <div className="w-16">
                    <SparklineChart type="negative" />
                  </div>
                  <span className="font-medium">{item.target}</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    {item.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;