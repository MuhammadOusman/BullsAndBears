import React, { useState } from 'react';

const Trade = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('');
  const [amount, setAmount] = useState('');

  // Sample data
  const users = [
    { id: 1, name: 'Shuvo', balance: 5000.00 },
    { id: 2, name: 'Shuja', balance: 3500.00 },
    { id: 3, name: 'Aliyana', balance: 7500.00 }
  ];

  const categories = ['Crypto', 'Stocks', 'Forex', 'Commodities'];
  
  const assets = {
    'Crypto': ['Bitcoin (BTC)', 'Ethereum (ETH)', 'Cardano (ADA)', 'Solana (SOL)'],
    'Stocks': ['Apple (AAPL)', 'Microsoft (MSFT)', 'Google (GOOGL)', 'Tesla (TSLA)'],
    'Forex': ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD'],
    'Commodities': ['Gold', 'Silver', 'Oil', 'Natural Gas']
  };

  const handleConvert = () => {
    if (!selectedUser || !selectedCategory || !selectedAsset || !amount) {
      alert('Please fill in all fields');
      return;
    }
    
    console.log('Converting trade:', {
      user: selectedUser,
      category: selectedCategory,
      asset: selectedAsset,
      amount: amount
    });
    
    // Add conversion logic here
    alert('Trade conversion initiated successfully!');
  };

  const getCurrentUserBalance = () => {
    const user = users.find(u => u.name === selectedUser);
    return user ? user.balance : 0;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">Trade</h1>

      {/* Trade Form */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 text-sm font-semibold text-gray-700">
            <span>#</span>
            <span>User Name</span>
            <span>Account Balance</span>
            <span>Asset Category</span>
            <span>Select Asset</span>
            <span>Amount</span>
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
              >
                <option value="">Select User Name</option>
                {users.map(user => (
                  <option key={user.id} value={user.name}>{user.name}</option>
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
              >
                <option value="">Crypto</option>
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
                <span className="text-white text-xs font-bold">₿</span>
              </div>
              <select
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                disabled={!selectedCategory}
              >
                <option value="">Select Asset</option>
                {selectedCategory && assets[selectedCategory]?.map(asset => (
                  <option key={asset} value={asset}>{asset}</option>
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
                placeholder="Select Amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                min="0"
                step="0.01"
              />
            </div>
            
            {/* Action */}
            <div>
              <button
                onClick={handleConvert}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
              >
                Convert
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions or Additional Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-sm font-medium text-blue-800">Trading Instructions</h3>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Select a user from the dropdown to view their account balance</li>
          <li>• Choose an asset category (Crypto, Stocks, Forex, Commodities)</li>
          <li>• Select the specific asset you want to trade</li>
          <li>• Enter the amount to convert/trade</li>
          <li>• Click "Convert" to execute the trade</li>
        </ul>
      </div>
    </div>
  );
};

export default Trade;