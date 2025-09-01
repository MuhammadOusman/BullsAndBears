import React, { useState, useEffect } from 'react';
import { adminAPI, tradingAPI } from '../../services/api.js';

const Trade = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Crypto');
  const [selectedAsset, setSelectedAsset] = useState('');
  const [amount, setAmount] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState('');

  // Real asset data - matching backend trading functionality
  const categories = ['Crypto'];
  
  const assets = {
    'Crypto': [
      { name: 'Bitcoin', symbol: 'BTCUSDT', displaySymbol: 'BTC', icon: '₿' },
      { name: 'Ethereum', symbol: 'ETHUSDT', displaySymbol: 'ETH', icon: 'Ξ' },
      { name: 'Cardano', symbol: 'ADAUSDT', displaySymbol: 'ADA', icon: '₳' },
      { name: 'Solana', symbol: 'SOLUSDT', displaySymbol: 'SOL', icon: '◎' },
      { name: 'Binance Coin', symbol: 'BNBUSDT', displaySymbol: 'BNB', icon: 'B' },
      { name: 'XRP', symbol: 'XRPUSDT', displaySymbol: 'XRP', icon: 'X' },
      { name: 'Dogecoin', symbol: 'DOGEUSDT', displaySymbol: 'DOGE', icon: 'D' },
      { name: 'Polygon', symbol: 'MATICUSDT', displaySymbol: 'MATIC', icon: 'M' }
    ]
  };

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await adminAPI.getAllUsers();
      
      if (response.data) {
        // Filter to only show verified users with positive wallet balance
        const verifiedUsers = response.data.filter(user => 
          user.isVerified && user.role === 'user' && user.walletBalance > 0
        );
        
        // If no verified users with balance, show all verified users for testing
        if (verifiedUsers.length === 0) {
          const allVerifiedUsers = response.data.filter(user => 
            user.isVerified && user.role === 'user'
          );
          setUsers(allVerifiedUsers);
          if (allVerifiedUsers.length === 0) {
            setError('No verified users found');
          }
        } else {
          setUsers(verifiedUsers);
        }
      } else {
        setError('No user data received');
      }
    } catch (error) {
      console.error('❌ Error loading users:', error);
      setError(`Failed to load users: ${error.message}`);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleConvert = async () => {
    if (!selectedUser || !selectedAsset || !amount) {
      setError('Please fill in all fields');
      return;
    }
    
    const user = users.find(u => u._id === selectedUser);
    const asset = assets[selectedCategory]?.find(a => a.symbol === selectedAsset);
    const tradeAmount = parseFloat(amount);
    
    if (!user || !asset) {
      setError('Invalid user or asset selection');
      return;
    }
    
    if (tradeAmount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    
    if (tradeAmount > user.walletBalance) {
      setError(`Insufficient balance. User has $${user.walletBalance.toFixed(2)}`);
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Execute trade through backend API
      const tradeData = {
        symbol: asset.symbol,
        usdAmount: tradeAmount,
        email: user.email
      };
      
      const response = await tradingAPI.buyCrypto(tradeData);
      
      if (response.data) {
        alert(`Trade executed successfully! 
               User: ${user.firstname} ${user.lastname}
               Bought: ${response.data.bought.toFixed(6)} ${asset.displaySymbol}
               Price: $${response.data.price.toFixed(2)} per token
               Amount Spent: $${tradeAmount.toFixed(2)}
               New Balance: $${response.data.newWalletBalance.toFixed(2)}`);
        
        // Refresh users to update balances
        await loadUsers();
        
        // Reset form
        setSelectedUser('');
        setSelectedAsset('');
        setAmount('');
      }
    } catch (error) {
      console.error('❌ Trade execution failed:', error);
      
      let errorMessage = 'Trade execution failed';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUserBalance = () => {
    const user = users.find(u => u._id === selectedUser);
    return user ? user.walletBalance : 0;
  };

  const getSelectedAssetInfo = () => {
    return assets[selectedCategory]?.find(a => a.symbol === selectedAsset);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">Trade</h1>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div className="flex-1">
              <span className="text-sm font-medium text-red-800">{error}</span>
              {(error.includes('500') || error.includes('Internal Server Error')) && (
                <div className="text-xs text-red-600 mt-2">
                  <p><strong>Known Issue:</strong> The backend's Binance API service is currently experiencing issues.</p>
                  <p className="mt-1">This is a backend infrastructure problem where the price fetching from Binance API is failing.</p>
                  <p className="mt-1">The frontend is working correctly - this needs to be resolved on the backend server.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Backend Status Warning */}
      <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-yellow-800">Backend Service Status</h4>
            <p className="text-xs text-yellow-700 mt-1">
              The trading functionality depends on real-time crypto prices from Binance API. 
              Currently experiencing: "Failed to fetch price from Binance" - Backend service needs attention.
            </p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loadingUsers ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading users...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Trade Form */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 text-sm font-semibold text-gray-700">
                <span>#</span>
                <span>User Name</span>
                <span>Account Balance</span>
                <span>Asset Category</span>
                <span>Select Asset</span>
                <span>Amount (USD)</span>
                <span>Action</span>
              </div>
            </div>
            
            <div className="px-6 py-6">
              <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 items-center">
                {/* # */}
                <span className="text-sm font-medium text-gray-900">1</span>
                
                {/* User Name Dropdown */}
                <div className="relative">
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                    disabled={loading}
                  >
                    <option value="">Select User</option>
                    {users.map(user => (
                      <option key={user._id} value={user._id}>
                        {user.firstname} {user.lastname}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Account Balance */}
                <div className="text-sm font-medium text-gray-900">
                  ${getCurrentUserBalance().toFixed(2)}
                </div>
                
                {/* Asset Category Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedAsset(''); // Reset asset when category changes
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                    disabled={loading}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Select Asset */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {getSelectedAssetInfo()?.icon || '₿'}
                    </span>
                  </div>
                  <select
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                    disabled={!selectedCategory || loading}
                  >
                    <option value="">Select Asset</option>
                    {selectedCategory && assets[selectedCategory]?.map(asset => (
                      <option key={asset.symbol} value={asset.symbol}>
                        {asset.name} ({asset.displaySymbol})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Amount */}
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount in USD"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    min="0"
                    step="0.01"
                    max={getCurrentUserBalance()}
                    disabled={loading}
                  />
                </div>
                
                {/* Action */}
                <div>
                  <button
                    onClick={handleConvert}
                    disabled={loading || !selectedUser || !selectedAsset || !amount}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Execute Trade
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-sm font-medium text-blue-800">Trading Instructions</h3>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Select a verified user with sufficient wallet balance to execute trades on their behalf</li>
          <li>• Choose from available cryptocurrency assets with real-time pricing from Binance</li>
          <li>• Enter the USD amount to spend on the selected cryptocurrency</li>
          <li>• Click "Execute Trade" to purchase crypto using the user's wallet balance</li>
          <li>• The system will show the amount of crypto purchased and update the user's holdings</li>
        </ul>
      </div>
    </div>
  );
};

export default Trade;