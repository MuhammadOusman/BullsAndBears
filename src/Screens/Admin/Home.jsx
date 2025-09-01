import React, { useState } from 'react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample user data
  const usersData = [
    { id: 1, userName: 'Shuvo', amount: '$1,250,000', totalAssets: 245 },
    { id: 2, userName: 'Shuvaye', amount: '$1,250,000', totalAssets: 385 },
    { id: 3, userName: 'Sujana', amount: '$1,250,000', totalAssets: 150 }
  ];

  // Filter users based on search term
  const filteredUsers = usersData.filter(user =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Additional Stats or Summary Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Total Users</div>
          <div className="text-2xl font-bold text-gray-900">{usersData.length}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Total Portfolio Value</div>
          <div className="text-2xl font-bold text-green-600">$3,750,000</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Total Assets</div>
          <div className="text-2xl font-bold text-blue-600">780</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-4 text-sm font-semibold text-gray-700">
            <div>#</div>
            <div>User Name</div>
            <div>Amount</div>
            <div>Number Of Total Assets</div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-4 items-center">
                  <div className="text-sm font-medium text-gray-900">{user.id}</div>
                  <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                  <div className="text-sm font-medium text-gray-900">{user.amount}</div>
                  <div className="text-sm font-medium text-gray-900">{user.totalAssets}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No users found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Home;