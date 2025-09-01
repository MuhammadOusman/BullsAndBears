import React from 'react';

const statItems = [
  { id: 1, icon: '₿', title: 'Bitcoin', symbol: 'BTC', price: 'USD 53,260.20', change: '+7.23%' },
  { id: 2, icon: '◆', title: 'Bitcoin', symbol: 'ETH', price: 'USD 53,260.20', change: '-1.8%' },
  { id: 3, icon: '◎', title: 'Bitcoin', symbol: 'USDT', price: 'USD 53,260.20', change: '+3.54%' },
  { id: 4, icon: '◈', title: 'Ethereum', symbol: 'BNB', price: 'USD 53,260.20', change: '+3.24%' },
];

const rows = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: ['Bitcoin','Ethereum','Binance','Tether','Solana','Cardano'][i % 6],
  symbol: ['BTC','ETH','BNB','USDT','SOL','ADA'][i % 6],
  price: '$2,236',
  change: (i % 3 === 0) ? '-3.33%' : '+1.22%',
  lastTraded: '2.236',
  turnover: '$7,600,000',
}));

const Sparkline = ({ stroke = '#ef4444' }) => (
  <svg width="60" height="22" viewBox="0 0 60 22" xmlns="http://www.w3.org/2000/svg">
    <polyline points="0,16 10,12 20,14 30,8 40,10 50,6 60,8" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Overview(){
  return (
    <div className="px-8 py-8 max-w-6xl mx-auto space-y-8">
      {/* Top wallet card */}
      <div className="bg-white rounded-2xl p-6 shadow-md mb-6 border border-transparent">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold text-gray-800">Wallet</div>
            <div className="mt-3">
              <div className="text-sm text-gray-500">Total Balance</div>
              <div className="flex items-center gap-4 mt-2">
                <div className="text-4xl md:text-5xl font-extrabold text-gray-900">0.79253864</div>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">BTC</span>
              </div>
              <div className="text-sm text-gray-400 mt-2">$12,068.83</div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none md:w-auto md:mr-4">
              <select className="rounded-full border border-gray-200 px-4 py-2 text-sm bg-white">
                <option>USD</option>
              </select>
            </div>
            <div className="flex-1">
              <input placeholder="Search" className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview card */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Overview</h3>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">Favorites</div>
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Crypto</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          {statItems.map(s => (
            <div key={s.id} className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">{s.icon}</div>
                <div>
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="text-xs text-gray-400">{s.symbol}</div>
                </div>
              </div>
              <div className="text-lg font-semibold mb-2">{s.price}</div>
              <div className={`text-xs px-2 py-1 rounded-full mb-3 ${s.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{s.change}</div>
              <div><Sparkline stroke={s.change.startsWith('+') ? '#10B981' : '#EF4444'} /></div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-6 pt-4" />

        <div className="flex items-center gap-6 mb-6 mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">Crypto</button>
          <button className="text-sm text-gray-600 font-medium">Stocks</button>
          <button className="text-sm text-gray-600 font-medium">Indices</button>
          <button className="text-sm text-gray-600 font-medium">Commodities</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">#</th>
                <th>Trading Pair</th>
                <th className="text-right">Last Traded</th>
                <th className="text-right">24H Change</th>
                <th className="text-right">24H High</th>
                <th className="text-right">24H Low</th>
                <th className="text-right">24H Turnover</th>
                <th className="text-right">Chart</th>
                <th className="text-right">Trade</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-b hover:bg-red-50">
                  <td className="py-3">{r.id}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-100" />
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-gray-400">{r.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right">{r.lastTraded}</td>
                  <td className={`text-right ${r.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{r.change}</td>
                  <td className="text-right">62,749.00</td>
                  <td className="text-right">57,600.00</td>
                  <td className="text-right">5,048(USD)</td>
                  <td className="text-right"><Sparkline /></td>
                  <td className="text-right"><button className="text-sm bg-red-500 text-white px-3 py-1 rounded">Trade</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}