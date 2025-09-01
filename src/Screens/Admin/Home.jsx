import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api.js';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPortfolioValue: 0,
    totalAssets: 0
  });

  // Load users and calculate stats
  useEffect(() => {
    loadUsersAndStats();
  }, []);

  const loadUsersAndStats = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllUsers();
      
      if (response.data) {
        const allUsers = response.data;
        
        // Filter only verified users for the table
        const verifiedUsers = allUsers.filter(user => user.isVerified && user.role === 'user');
        
        // Calculate stats
        const totalPortfolioValue = verifiedUsers.reduce((sum, user) => sum + (user.walletBalance || 0), 0);
        const totalAssets = verifiedUsers.reduce((sum, user) => {
          const cryptoAssets = user.cryptoHoldings ? user.cryptoHoldings.length : 0;
          return sum + cryptoAssets;
        }, 0);
        
        setUsers(verifiedUsers);
        setStats({
          totalUsers: verifiedUsers.length,
          totalPortfolioValue,
          totalAssets
        });
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Home</h1>
        
        {/* Search Bar */}
        <div className="relative w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search users by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-sm font-medium text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">Total Users</div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">Total Portfolio Value</div>
              <div className="text-2xl font-bold text-green-600">
                ${stats.totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">Total Assets</div>
              <div className="text-2xl font-bold text-blue-600">{stats.totalAssets}</div>
            </div>
          </div>
        </>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-4 text-sm font-semibold text-gray-700">
            <div>#</div>
            <div>User Name</div>
            <div>Wallet Balance</div>
            <div>Crypto Holdings</div>
          </div>
        </div>
        
        {loading ? (
          <div className="px-6 py-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <span className="ml-3 text-gray-600">Loading users...</span>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div key={user._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-4 items-center">
                    <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                    <div className="text-sm font-medium text-gray-900">
                      {user.firstname} {user.lastname}
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(user.walletBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {user.cryptoHoldings ? user.cryptoHoldings.length : 0} assets
                      {user.cryptoHoldings && user.cryptoHoldings.length > 0 && (
                        <div className="text-xs text-gray-500">
                          {user.cryptoHoldings.slice(0, 2).map(holding => holding.symbol).join(', ')}
                          {user.cryptoHoldings.length > 2 && ` +${user.cryptoHoldings.length - 2} more`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                {searchTerm ? `No users found matching "${searchTerm}"` : 'No verified users found'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;