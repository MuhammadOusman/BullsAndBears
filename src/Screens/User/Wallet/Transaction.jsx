import React, { useState } from 'react';
import { walletAPI, authUtils } from '../../../services/api';

const Transaction = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCancel = () => setAmount('');
  
  const handleDeposit = async () => {
    if (!amount) return alert('Please enter an amount');
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return alert('Please enter a valid amount');
    }

    try {
      setLoading(true);
      
      if (!authUtils.isAuthenticated()) {
        alert('Please log in to make a deposit');
        return;
      }

      const result = await walletAPI.requestDeposit(numAmount);
      
      if (result.err) {
        throw new Error(result.message);
      }

      alert('Deposit request submitted successfully! Please wait for admin approval.');
      setAmount('');
    } catch (error) {
      console.error('Deposit error:', error);
      alert('Deposit failed: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  const handleWithdraw = async () => {
    if (!amount) return alert('Please enter an amount');
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return alert('Please enter a valid amount');
    }

    try {
      setLoading(true);
      
      if (!authUtils.isAuthenticated()) {
        alert('Please log in to make a withdrawal');
        return;
      }

      const result = await walletAPI.requestWithdraw(numAmount);
      
      if (result.err) {
        throw new Error(result.message);
      }

      alert('Withdrawal request submitted successfully! Please wait for admin approval.');
      setAmount('');
    } catch (error) {
      console.error('Withdrawal error:', error);
      alert('Withdrawal failed: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-start justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-1">Withdrawal Details</h2>
        <p className="text-sm text-gray-500 mb-6">Please Provide The Amount You Wish To Withdraw. Double-Check For Accuracy.</p>

        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="500$"
          className="w-full border border-gray-200 rounded-md px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-300"
        />

        <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
        <p className="text-xs text-gray-400 mb-6">A small network fee (e.g., blockchain gas fee) may apply to the total withdrawal amount.</p>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleCancel} 
            className="px-6 py-2 rounded-full border border-red-300 text-red-500 bg-white hover:bg-red-50 disabled:opacity-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            onClick={handleDeposit} 
            className="px-8 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Deposit'}
          </button>
          <button 
            onClick={handleWithdraw} 
            className="px-8 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Withdraw'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;