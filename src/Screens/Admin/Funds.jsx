import React, { useState } from 'react';

const Funds = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample deposit/withdrawal data
  const depositWithdrawalData = [
    {
      id: 1,
      userName: 'Shuvo',
      userEmail: 'shuvo@gmail.com',
      prevTotalBalance: 210.67,
      amount: 100.00,
      remainingBalance: 110.67,
      method: 'Deposit',
      status: 'pending'
    },
    {
      id: 2,
      userName: 'Shuja',
      userEmail: 'shuvo@gmail.com',
      prevTotalBalance: 210.67,
      amount: 100.00,
      remainingBalance: 110.67,
      method: 'Withdraw',
      status: 'pending'
    },
    {
      id: 3,
      userName: 'Aliyana',
      userEmail: 'sujana@gmail.com',
      prevTotalBalance: 500.00,
      amount: 500.00,
      remainingBalance: 400.00,
      method: 'Deposit',
      status: 'pending'
    }
  ];

  // Sample added fund history data
  const addedFundHistory = [
    {
      id: 1,
      userId: 2794685,
      userEmail: 'shuvo@gmail.com',
      prevTotalBalance: 1375.29,
      addedFund: 100.00,
      currentTotalBalance: 1475.29,
      dateTime: '01/05/2025',
      time: '6:00 pm'
    },
    {
      id: 2,
      userId: 2794686,
      userEmail: 'shuvo@gmail.com',
      prevTotalBalance: 925.29,
      addedFund: 100.00,
      currentTotalBalance: 954.29,
      dateTime: '05/06/2025',
      time: '2:00 pm'
    },
    {
      id: 3,
      userId: 2794687,
      userEmail: 'sujana@gmail.com',
      prevTotalBalance: 900.00,
      addedFund: 500.00,
      currentTotalBalance: 1400.00,
      dateTime: '11/08/2025',
      time: '1:00 am'
    }
  ];

  // Filter function for search
  const filteredDepositWithdrawal = depositWithdrawalData.filter(item =>
    item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (id, action) => {
    console.log(`${action} action for ID: ${id}`);
    // Implement approve/reject logic here
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Deposit/ Withdrawal</h1>
        
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

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Pending Deposits</div>
          <div className="text-2xl font-bold text-green-600">
            {depositWithdrawalData.filter(item => item.method === 'Deposit').length}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Pending Withdrawals</div>
          <div className="text-2xl font-bold text-red-600">
            {depositWithdrawalData.filter(item => item.method === 'Withdraw').length}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Total Fund Requests</div>
          <div className="text-2xl font-bold text-blue-600">{depositWithdrawalData.length}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Total Added Funds</div>
          <div className="text-2xl font-bold text-purple-600">
            ${addedFundHistory.reduce((sum, item) => sum + item.addedFund, 0).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Deposit/Withdrawal Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-[auto_1fr_1.5fr_1fr_1fr_1fr_1fr_1.5fr] gap-4 text-sm font-semibold text-gray-700">
            <span>#</span>
            <span>User Name</span>
            <span>User Mail</span>
            <span>Prev. Total Balance</span>
            <span>Amount</span>
            <span>Remaining Balance</span>
            <span>Method</span>
            <span>Actions</span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredDepositWithdrawal.length > 0 ? (
            filteredDepositWithdrawal.map((item) => (
              <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-[auto_1fr_1.5fr_1fr_1fr_1fr_1fr_1.5fr] gap-4 items-center">
                  <span className="text-sm font-medium text-gray-900">{item.id}</span>
                  <span className="text-sm font-medium text-gray-900">{item.userName}</span>
                  <span className="text-sm text-gray-600">{item.userEmail}</span>
                  <span className="text-sm font-medium text-gray-900">{item.prevTotalBalance.toFixed(2)}</span>
                  <span className="text-sm font-medium text-gray-900">{item.amount.toFixed(2)}</span>
                  <span className="text-sm font-medium text-gray-900">{item.remainingBalance.toFixed(2)}</span>
                  <span className={`text-sm px-3 py-1 rounded-full text-xs font-medium ${
                    item.method === 'Deposit' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.method}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(item.id, 'approve')}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(item.id, 'reject')}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No transactions found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      {/* Added Fund History Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Added Fund History</h2>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-[auto_1fr_1.5fr_1fr_1fr_1fr_1fr] gap-4 text-sm font-semibold text-gray-700">
              <span>#</span>
              <span>User Id</span>
              <span>User Mail</span>
              <span>Prev. Total Balance</span>
              <span>Added Fund</span>
              <span>Current Total Balance</span>
              <span>Date & Time</span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {addedFundHistory.map((item) => (
              <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-[auto_1fr_1.5fr_1fr_1fr_1fr_1fr] gap-4 items-center">
                  <span className="text-sm font-medium text-gray-900">{item.id}</span>
                  <span className="text-sm font-medium text-gray-900">{item.userId}</span>
                  <span className="text-sm text-gray-600">{item.userEmail}</span>
                  <span className="text-sm font-medium text-gray-900">{item.prevTotalBalance.toFixed(2)}</span>
                  <span className="text-sm font-bold text-green-600">{item.addedFund.toFixed(2)}</span>
                  <span className="text-sm font-medium text-gray-900">{item.currentTotalBalance.toFixed(2)}</span>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">{item.dateTime}</div>
                    <div className="text-xs text-gray-500">{item.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;