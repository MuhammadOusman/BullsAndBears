import React, { useState, useEffect } from 'react';
import { adminAPI, authUtils } from '../../services/api';

const Funds = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      
      if (!authUtils.isAuthenticated()) {
        setError('Please log in to access admin features');
        return;
      }

      const result = await adminAPI.getAllTransactions();
      if (result.err) {
        throw new Error(result.message);
      }

      setTransactions(result.data || []);
      setError('');
    } catch (err) {
      console.error('Error loading transactions:', err);
      setError(err.message || 'Failed to load transactions');
      
      if (err.status === 401 || err.status === 404) {
        authUtils.logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionAction = async (transactionId, action) => {
    try {
      const result = await adminAPI.approveTransaction(transactionId, action);
      if (result.err) {
        throw new Error(result.message);
      }

      alert(`Transaction ${action}d successfully`);
      
      // Remove from pending list
      setTransactions(prev => prev.filter(t => t._id !== transactionId));
    } catch (err) {
      console.error('Error updating transaction:', err);
      alert(`Failed to ${action} transaction: ` + (err.message || 'Unknown error'));
    }
  };

  // Filter function for search
  const filteredTransactions = transactions.filter(item =>
    item.userId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.purpose?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Funds Management</h1>
        <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Funds Management</h1>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 font-semibold mb-2">Error Loading Transactions</div>
          <div className="text-red-500 text-sm">{error}</div>
        </div>
      </div>
    );
  }

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
            {transactions.filter(item => item.purpose === 'deposit').length}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Pending Withdrawals</div>
          <div className="text-2xl font-bold text-red-600">
            {transactions.filter(item => item.purpose === 'withdraw').length}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Total Fund Requests</div>
          <div className="text-2xl font-bold text-blue-600">{transactions.length}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Total Amount</div>
          <div className="text-2xl font-bold text-purple-600">
            ${transactions.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
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