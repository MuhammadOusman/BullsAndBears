import React from 'react';

const transactionData = [
  { id: 1, usdAmount: '$5,000.00', amount: '$300', action: 'Deposited', date: '09/05/2025', time: '8:00 pm' },
  { id: 2, usdAmount: '$2,500.50', amount: '$200', action: 'Withdraw', date: '08/04/2025', time: '3:00 pm' },
  { id: 3, usdAmount: '$3,500.50', amount: '$50', action: 'Deposited', date: '10/8/2024', time: '1:00 am' },
];

const tradeData = [
  { id: 1, category: 'Crypto', asset: '₿', amount: '100', date: '08/05/2018', time: '8:00 pm' },
  { id: 2, category: 'Stocks', asset: '●', amount: '200', date: '08/05/2025', time: '3:00 pm' },
  { id: 3, category: 'Commodities', asset: '◆', amount: '50', date: '11/08/2025', time: '1:00 am' },
];

const History = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Transaction History Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">#</th>
                <th>USD Amount</th>
                <th>Amount</th>
                <th>Action</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map(row => (
                <tr key={row.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{row.id}</td>
                  <td className="font-medium">{row.usdAmount}</td>
                  <td>{row.amount}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      row.action === 'Deposited' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {row.action}
                    </span>
                  </td>
                  <td className="text-gray-600">{row.date} {row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trade History Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Trade History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">#</th>
                <th>Asset Category</th>
                <th>Selected Asset</th>
                <th>Amount</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {tradeData.map(row => (
                <tr key={row.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{row.id}</td>
                  <td className="font-medium">{row.category}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-bold">
                        {row.asset}
                      </div>
                    </div>
                  </td>
                  <td>{row.amount}</td>
                  <td className="text-gray-600">{row.date} {row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;