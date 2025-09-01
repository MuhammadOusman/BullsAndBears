import React, { useState, useEffect } from 'react';
import { walletAPI, tradingAPI, authUtils } from '../../../services/api';

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('transactions');

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        
        if (!authUtils.isAuthenticated()) {
          setError('Please log in to view your history');
          return;
        }

        // Load transactions and trades in parallel
        const [transactionsRes, tradesRes] = await Promise.all([
          walletAPI.getTransactions().catch(err => ({ data: [] })), // Handle gracefully if no transactions
          tradingAPI.getUserTrades().catch(err => ({ data: [] })) // Handle gracefully if no trades
        ]);

        setTransactions(transactionsRes.data || []);
        setTrades(tradesRes.data || []);
        setError('');
      } catch (err) {
        console.error('Error loading history:', err);
        setError(err.message || 'Failed to load history');
        
        if (err.status === 401 || err.status === 404) {
          authUtils.logout();
        }
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (loading) {
    return (
      <div className="p-6 space-y-8">
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
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 font-semibold mb-2">Error Loading History</div>
          <div className="text-red-500 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('transactions')}
          className={`pb-2 px-1 font-medium ${
            activeTab === 'transactions'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Transactions ({transactions.length})
        </button>
        <button
          onClick={() => setActiveTab('trades')}
          className={`pb-2 px-1 font-medium ${
            activeTab === 'trades'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Trades ({trades.length})
        </button>
      </div>

      {/* Transaction History Section */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3">#</th>
                  <th>Amount</th>
                  <th>Purpose</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? transactions.map((transaction, index) => {
                  const datetime = formatDate(transaction.createdAt);
                  return (
                    <tr key={transaction._id} className="border-b hover:bg-gray-50">
                      <td className="py-3">{index + 1}</td>
                      <td className="font-medium">${transaction.amount.toFixed(2)}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.purpose === 'deposit' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {transaction.purpose}
                        </span>
                      </td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'approved' 
                            ? 'bg-green-100 text-green-700' 
                            : transaction.status === 'rejected'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="text-gray-600">{datetime.date} {datetime.time}</td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      No transactions found. Make a deposit or withdrawal to see history here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Trade History Section */}
      {activeTab === 'trades' && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Trade History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3">#</th>
                  <th>Asset</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>USD Value</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {trades.length > 0 ? trades.map((trade, index) => {
                  const datetime = formatDate(trade.createdAt);
                  return (
                    <tr key={trade._id} className="border-b hover:bg-gray-50">
                      <td className="py-3">{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs">
                            {trade.symbol}
                          </div>
                          <span className="font-medium">{trade.asset}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          trade.type === 'buy' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </td>
                      <td>{trade.cryptoAmount.toFixed(6)}</td>
                      <td>${trade.pricePerToken.toFixed(2)}</td>
                      <td className="font-medium">${trade.usdAmount.toFixed(2)}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          trade.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {trade.status}
                        </span>
                      </td>
                      <td className="text-gray-600">{datetime.date} {datetime.time}</td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500">
                      No trades found. Start trading to see your history here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;