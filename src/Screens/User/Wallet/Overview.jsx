import React, { useState, useEffect, useMemo } from 'react';
import { authAPI, tradingAPI, authUtils } from '../../../services/api';

// Default crypto icons for display
const cryptoIcons = {
  'BTC': '₿',
  'ETH': '◆', 
  'USDT': '◎',
  'BNB': '◈',
  'SOL': '◉',
  'ADA': '◈'
};

const categories = ['Crypto','Stocks','Indices','Commodities'];

const Sparkline = ({ stroke = '#ef4444' }) => (
  <svg width="60" height="22" viewBox="0 0 60 22" xmlns="http://www.w3.org/2000/svg">
    <polyline points="0,16 10,12 20,14 30,8 40,10 50,6 60,8" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Overview(){
  // State for real data
  const [user, setUser] = useState(null);
  const [userTrades, setUserTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // UI state
  const [selectedId, setSelectedId] = useState(null);
  const [category, setCategory] = useState('Crypto');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const perPage = 8;

  // Load real user data and trades
  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true);
        
        // Check if user is authenticated
        if (!authUtils.isAuthenticated()) {
          setError('Please log in to view your wallet');
          return;
        }

        // Load user profile and trades in parallel
        const [profileResponse, tradesResponse] = await Promise.all([
          authAPI.getUserProfile(),
          tradingAPI.getUserTrades()
        ]);

        setUser(profileResponse.data);
        setUserTrades(tradesResponse.data || []);
        setError('');
      } catch (err) {
        console.error('Error loading user data:', err);
        setError(err.message || 'Failed to load wallet data');
        
        // If unauthorized, redirect to login
        if (err.status === 401 || err.status === 404) {
          authUtils.logout();
        }
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  // Generate portfolio stats from user holdings
  const portfolioStats = useMemo(() => {
    if (!user?.cryptoHoldings) return [];
    
    return user.cryptoHoldings.map((holding, index) => ({
      id: index + 1,
      icon: cryptoIcons[holding.symbol] || '◈',
      title: holding.asset,
      symbol: holding.symbol,
      amount: holding.amount,
      // Mock price data - in real app, would fetch from price API
      price: `USD ${(Math.random() * 50000 + 1000).toFixed(2)}`,
      change: `${(Math.random() * 10 - 5).toFixed(2)}%`,
      category: 'Crypto'
    }));
  }, [user?.cryptoHoldings]);

  // Convert trades to table rows
  const tradeRows = useMemo(() => {
    return userTrades.map((trade, index) => ({
      id: trade._id,
      fav: false, // Remove favorites functionality as requested
      category: 'Crypto',
      name: trade.asset,
      symbol: trade.symbol,
      price: `$${trade.pricePerToken.toFixed(2)}`,
      change: trade.type === 'buy' ? '+1.22%' : '-3.33%', // Mock change
      lastTraded: trade.pricePerToken.toFixed(2),
      turnover: `$${trade.usdAmount.toFixed(2)}`,
      amount: trade.cryptoAmount,
      type: trade.type,
      status: trade.status,
      createdAt: trade.createdAt
    }));
  }, [userTrades]);

  const handleTrade = async (row) => {
    try {
      // Simple trade implementation - prompt for amount and execute buy
      const amountToBuy = prompt(`Enter amount of ${row.symbol} to buy:`);
      
      if (!amountToBuy || isNaN(parseFloat(amountToBuy))) {
        alert('Please enter a valid amount');
        return;
      }

      const amount = parseFloat(amountToBuy);
      if (amount <= 0) {
        alert('Amount must be greater than 0');
        return;
      }

      setLoading(true);

      // Use the trading API to buy crypto
      const result = await tradingAPI.buyCrypto({
        asset: row.name,
        symbol: row.symbol,
        cryptoAmount: amount
      });

      if (result.err) {
        throw new Error(result.message);
      }

      alert(`Successfully bought ${amount} ${row.symbol}`);
      
      // Refresh user data after successful trade
      await loadUserData();
      
    } catch (error) {
      console.error('Trade error:', error);
      alert('Trade failed: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // derived - filter, sort, paginate
  const filtered = useMemo(() => {
    let list = tradeRows.slice();
    // filter by category (tabs) - for now all trades are crypto
    if (category && category !== 'Crypto') list = [];
    
    if (search && search.trim() !== ''){
      const q = search.toLowerCase().trim();
      list = list.filter(r => (
        String(r.id).includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.symbol.toLowerCase().includes(q)
      ));
    }

    const dir = sortDir === 'asc' ? 1 : -1;
    list.sort((a,b) => {
      if (sortBy === 'id') return (a.id.localeCompare(b.id)) * dir;
      if (sortBy === 'name') return a.name.localeCompare(b.name) * dir;
      if (sortBy === 'symbol') return a.symbol.localeCompare(b.symbol) * dir;
      if (sortBy === 'lastTraded') return (parseFloat(String(a.lastTraded).replace(/,/g,'')) - parseFloat(String(b.lastTraded).replace(/,/g,''))) * dir;
      if (sortBy === 'change') {
        const na = parseFloat(String(a.change).replace('%','')) || 0;
        const nb = parseFloat(String(b.change).replace('%','')) || 0;
        return (na - nb) * dir;
      }
      return 0;
    });

    return list;
  }, [tradeRows, search, sortBy, sortDir, category]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pageItems = filtered.slice((page-1)*perPage, page*perPage);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  const changeSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
  };

  const handleSelect = (id) => setSelectedId(id);

  // Loading state
  if (loading) {
    return (
      <div className="px-8 py-8 max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl p-6 shadow-md animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="px-8 py-8 max-w-6xl mx-auto space-y-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <div className="text-red-600 font-semibold mb-2">Error Loading Wallet</div>
          <div className="text-red-500 text-sm">{error}</div>
        </div>
      </div>
    );
  }

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
                <div className="text-4xl md:text-5xl font-extrabold text-gray-900">
                  {user?.walletBalance?.toFixed(8) || '0.00000000'}
                </div>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">USD</span>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                Portfolio Value: ${user?.walletBalance?.toFixed(2) || '0.00'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none md:w-auto md:mr-4">
              <select className="rounded-full border border-gray-200 px-4 py-2 text-sm bg-white">
                <option>USD</option>
              </select>
            </div>
            <div className="flex-1">
              <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name or symbol" className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview card */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Overview</h3>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          {portfolioStats.length > 0 ? portfolioStats.map(s => (
            <div key={s.id} className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">{s.icon}</div>
                <div>
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="text-xs text-gray-400">{s.symbol}</div>
                </div>
              </div>
              <div className="text-lg font-semibold mb-2">{s.price}</div>
              <div className="text-xs text-gray-500 mb-2">Holdings: {s.amount.toFixed(4)}</div>
              <div className={`text-xs px-2 py-1 rounded-full mb-3 ${s.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{s.change}</div>
              <div><Sparkline stroke={s.change.startsWith('+') ? '#10B981' : '#EF4444'} /></div>
            </div>
          )) : (
            <div className="col-span-4 text-center text-gray-500 py-8">
              No crypto holdings yet. Start trading to see your portfolio here.
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 mt-6 pt-4" />

        <div className="flex items-center gap-6 mb-6 mt-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); setSearch(''); }}
              className={`px-4 py-2 rounded-full text-sm font-medium ${category === cat ? 'bg-red-500 text-white' : 'text-gray-600'}`}
            >{cat}</button>
          ))}
          <div className="ml-auto" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 w-8">#</th>
                <th className="cursor-pointer" onClick={() => changeSort('name')}>Trading Pair {sortBy === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
                <th className="text-right cursor-pointer" onClick={() => changeSort('lastTraded')}>Price {sortBy === 'lastTraded' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
                <th className="text-right">Amount</th>
                <th className="text-right cursor-pointer" onClick={() => changeSort('change')}>24H Change {sortBy === 'change' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
                <th className="text-right">USD Value</th>
                <th className="text-right">Type</th>
                <th className="text-right">Chart</th>
                <th className="text-right">Trade</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length > 0 ? pageItems.map(r => {
                const selected = r.id === selectedId;
                return (
                <tr key={r.id} className={`${selected ? 'bg-red-50' : ''} border-b hover:bg-red-50` } onClick={() => handleSelect(r.id)}>
                  <td className="py-3 text-gray-500">{pageItems.indexOf(r) + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">{r.symbol.toLowerCase()}</div>
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-gray-400">{r.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right">{r.price}</td>
                  <td className="text-right">{r.amount?.toFixed(4) || 'N/A'}</td>
                  <td className={`text-right ${r.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{r.change}</td>
                  <td className="text-right">{r.turnover}</td>
                  <td className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${r.type === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {r.type?.toUpperCase() || 'N/A'}
                    </span>
                  </td>
                  <td className="text-right"><div className="inline-block align-middle"><Sparkline /></div></td>
                  <td className="text-right">
                    <button
                      className="text-xs bg-red-500 text-white px-3 py-1 rounded-full"
                      onClick={(e) => { e.stopPropagation(); handleTrade(r); }}
                    >Trade</button>
                  </td>
                </tr>
              )}) : (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-gray-500">
                    No trades found. {category !== 'Crypto' ? 'Switch to Crypto tab to see your trades.' : 'Start trading to see your history here.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div>{total} results</div>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 rounded border" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>Prev</button>
            <div className="px-3 py-1">{page} / {totalPages}</div>
            <button className="px-2 py-1 rounded border" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}