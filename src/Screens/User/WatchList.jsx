import React, { useState, useEffect } from 'react';
import { watchlistAPI, authUtils } from '../../services/api';

const WatchList = () => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      setLoading(true);
      
      if (!authUtils.isAuthenticated()) {
        setError('Please log in to view your watchlist');
        return;
      }

      const response = await watchlistAPI.getWatchlist();
      console.log('📊 Watchlist API response:', response);
      
      // Handle the case where user has no watchlist items (404 is normal)
      if (response.err && response.message && response.message.includes('No watchlist found')) {
        console.log('📝 Empty watchlist - this is normal');
        setWatchlistItems([]);
        setError('');
        return;
      }
      
      if (response.err) {
        throw new Error(response.message);
      }

      setWatchlistItems(response.data || []);
      setError('');
      console.log('✅ Watchlist loaded successfully:', response.data);
    } catch (err) {
      console.error('❌ Error loading watchlist:', err);
      console.error('❌ Error details:', {
        status: err.response?.status,
        message: err.message,
        response: err.response?.data
      });
      
      // Handle different types of errors appropriately
      if (err.response?.status === 404 || 
          err.status === 404 || 
          err.message?.includes('No watchlist found') ||
          err.message?.includes('404')) {
        // 404 just means empty watchlist - this is normal, not an auth error
        console.log('📝 404 error treated as empty watchlist');
        setWatchlistItems([]);
        setError(''); // Don't show error for empty watchlist
      } else if (err.response?.status === 401 || err.status === 401) {
        // Only logout on actual authentication errors (401)
        console.log('🚪 401 error - logging out user');
        setError('Session expired. Please log in again.');
        authUtils.logout();
      } else {
        // Other errors (network, server errors, etc.)
        console.log('⚠️ Other error:', err.message);
        setError(err.message || 'Failed to load watchlist');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (itemId) => {
    try {
      const response = await watchlistAPI.removeFromWatchlist(itemId);
      if (response.err) {
        throw new Error(response.message);
      }

      // Remove item from local state
      setWatchlistItems(prev => prev.filter(item => item._id !== itemId));
      alert('Item removed from watchlist successfully!');
    } catch (err) {
      console.error('Error removing from watchlist:', err);
      alert('Failed to remove item: ' + (err.message || 'Unknown error'));
    }
  };

  const iconFor = (symbol) => {
    if (symbol?.includes('BTC')) return '₿';
    if (symbol?.includes('ETH')) return '◆';
    if (symbol?.includes('USDT')) return '◎';
    if (symbol?.includes('BNB')) return '◈';
    if (symbol?.includes('SOL')) return '◉';
    if (symbol?.includes('ADA')) return '◈';
    return '◈';
  };

  // Helper to chunk watchlist items into groups of 4
  const chunkWatchlist = (items, size = 4) => {
    const chunks = [];
    for (let i = 0; i < items.length; i += size) {
      chunks.push(items.slice(i, i + size));
    }
    return chunks;
  };

  if (loading) {
    return (
      <div className="px-8 py-8 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold">Hello Trader !</h1>
            <p className="text-gray-500 mt-1">Manage your tracked assets efficiently.</p>
          </div>
          <div className="animate-pulse bg-gray-200 h-8 w-32 rounded-full"></div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-start gap-3 p-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-8 py-8 max-w-6xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold">Hello Trader !</h1>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 font-semibold mb-2">Error Loading Watchlist</div>
          <div className="text-red-500 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  const watchlistChunks = chunkWatchlist(watchlistItems);

  return (
    <div className="px-8 py-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold">Hello Trader !</h1>
          <p className="text-gray-500 mt-1">Manage your tracked assets efficiently.</p>
        </div>

        <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
          {watchlistItems.length} Total Assets
        </div>
      </div>

      {/* Overview header */}
      <div>
        <h2 className="text-lg font-semibold">Watchlist Overview</h2>
        <p className="text-gray-500 text-sm mt-1">Summary of your tracked assets.</p>
      </div>

      {/* Watchlist Content */}
      <div className="space-y-4">
        {watchlistItems.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-sm border text-center">
            <div className="text-gray-400 text-lg mb-2">Your watchlist is empty</div>
            <div className="text-gray-500 text-sm">Add coins to track their performance</div>
          </div>
        ) : (
          watchlistChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {chunk.map((item) => (
                  <div key={item._id} className="flex items-start gap-3 p-3 bg-transparent">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                      <span className="text-orange-600 font-bold">{iconFor(item.symbol)}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">{item.symbol}</div>
                          <div className="text-xs text-gray-400">{item.name || item.symbol}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-medium">
                            ${parseFloat(item.price || 0).toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <div className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                              parseFloat(item.change || 0) >= 0 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-600'
                            }`}>
                              {parseFloat(item.change || 0) >= 0 ? '+' : ''}
                              {parseFloat(item.change || 0).toFixed(2)}%
                            </div>
                            <button
                              onClick={() => handleRemoveFromWatchlist(item._id)}
                              className="text-red-500 hover:text-red-700 transition-colors ml-1"
                              title="Remove from watchlist"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Fill empty slots in the chunk to maintain grid structure */}
                {chunk.length < 4 && Array.from({ length: 4 - chunk.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="p-3"></div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WatchList;