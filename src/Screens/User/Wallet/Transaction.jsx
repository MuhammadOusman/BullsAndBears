import React, { useState } from 'react';

const Transaction = () => {
  const [amount, setAmount] = useState('');

  const handleCancel = () => setAmount('');
  const handleDeposit = () => {
    if (!amount) return alert('Please enter an amount');
    console.log('deposit', amount);
  };
  const handleWithdraw = () => {
    if (!amount) return alert('Please enter an amount');
    console.log('withdraw', amount);
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
          <button onClick={handleCancel} className="px-6 py-2 rounded-full border border-red-300 text-red-500 bg-white hover:bg-red-50">Cancel</button>
          <button onClick={handleDeposit} className="px-8 py-2 rounded-full bg-red-500 text-white hover:bg-red-600">Deposit</button>
          <button onClick={handleWithdraw} className="px-8 py-2 rounded-full bg-red-600 text-white hover:bg-red-700">Withdraw</button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;