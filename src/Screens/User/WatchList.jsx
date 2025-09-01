import React from 'react';

const watchlistData = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC/USD', price: 'USD 46,168.95', change: '+2.5%' },
  { id: 2, name: 'Ethereum', symbol: 'ETH/USD', price: 'USD 3,480.04', change: '+1.8%' },
  { id: 3, name: 'Tether', symbol: 'USDT/USD', price: 'USD 1.00', change: '0.0%' },
  { id: 4, name: 'BNB', symbol: 'BNB/USD', price: 'USD 443.56', change: '+0.9%' },
];

// helper to chunk rows of 4 assets (we'll render the same 4-block repeated to match design)
const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const WatchList = () => {
  // create several rows like in the design (repeat the dataset a few times)
  const rows = [watchlistData, watchlistData, watchlistData, watchlistData];

  const iconFor = (name) => {
    if (name === 'Bitcoin') return '₿';
    if (name === 'Ethereum') return '◆';
    if (name === 'Tether') return '◎';
    return '◈';
  };

  return (
    <div className="px-8 py-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold">Hello Trader !</h1>
          <p className="text-gray-500 mt-1">Manage your tracked assets efficiently.</p>
        </div>

        <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">6 Total Assest</div>
      </div>

      {/* Overview header */}
      <div>
        <h2 className="text-lg font-semibold">Watchlist Overview</h2>
        <p className="text-gray-500 text-sm mt-1">Summary of your tracked assets.</p>
      </div>

      {/* Repeated rounded cards, each with a row of 4 asset blocks */}
      <div className="space-y-4">
        {rows.map((row, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {row.map((asset) => (
                <div key={asset.id} className="flex items-start gap-3 p-3 bg-transparent">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                    <span className="text-orange-600 font-bold">{iconFor(asset.name)}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">{asset.name}</div>
                        <div className="text-xs text-gray-400">{asset.symbol}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-medium">{asset.price}</div>
                        <div className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                          asset.change.startsWith('+') ? 'bg-green-100 text-green-700' : asset.change === '0.0%' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-600'
                        }`}>{asset.change}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;