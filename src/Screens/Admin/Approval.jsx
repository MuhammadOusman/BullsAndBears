import React, { useState } from 'react';

const Approval = () => {
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      name: 'Shuvo',
      userMail: 'shuvo@gmail.com',
      mobileNumber: '123456789',
      password: '123456789',
      requestedOn: '01/05/2025',
      time: '6:00 pm',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Shayan',
      userMail: 'shuvo@gmail.com',
      mobileNumber: '123456789',
      password: '123456789',
      requestedOn: '11/06/2025',
      time: '1:05 pm',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Sujana',
      userMail: 'sujana@gmail.com',
      mobileNumber: '123456789',
      password: '123456789',
      requestedOn: '09/07/2025',
      time: '12:11 am',
      status: 'pending'
    }
  ]);

  const handleApprove = (id) => {
    setPendingApprovals(prev => 
      prev.map(user => 
        user.id === id ? { ...user, status: 'approved' } : user
      )
    );
    console.log(`Approved user with ID: ${id}`);
    alert('User approved successfully!');
  };

  const handleReject = (id) => {
    setPendingApprovals(prev => 
      prev.map(user => 
        user.id === id ? { ...user, status: 'rejected' } : user
      )
    );
    console.log(`Rejected user with ID: ${id}`);
    alert('User rejected successfully!');
  };

  const pendingCount = pendingApprovals.filter(user => user.status === 'pending').length;
  const approvedCount = pendingApprovals.filter(user => user.status === 'approved').length;
  const rejectedCount = pendingApprovals.filter(user => user.status === 'rejected').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold">Sign Up Approval Awaiting</h1>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Pending Approvals</div>
          <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Approved Users</div>
          <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Rejected Users</div>
          <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
        </div>
      </div>

      {/* Approval Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-[auto_1fr_1.5fr_1fr_1fr_1fr_1.5fr] gap-4 text-sm font-semibold text-gray-700">
            <span>#</span>
            <span>Name</span>
            <span>User Mail</span>
            <span>Mobile Number</span>
            <span>Password</span>
            <span>Requested On</span>
            <span>Actions</span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {pendingApprovals.length > 0 ? (
            pendingApprovals.map((user) => (
              <div 
                key={user.id} 
                className={`px-6 py-4 transition-colors ${
                  user.status === 'approved' ? 'bg-green-50' : 
                  user.status === 'rejected' ? 'bg-red-50' : 
                  'hover:bg-gray-50'
                }`}
              >
                <div className="grid grid-cols-[auto_1fr_1.5fr_1fr_1fr_1fr_1.5fr] gap-4 items-center">
                  <span className="text-sm font-medium text-gray-900">{user.id}</span>
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  <span className="text-sm text-gray-600">{user.userMail}</span>
                  <span className="text-sm text-gray-900">{user.mobileNumber}</span>
                  <span className="text-sm text-gray-900 font-mono">{user.password}</span>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">{user.requestedOn}</div>
                    <div className="text-xs text-gray-500">{user.time}</div>
                  </div>
                  <div className="flex gap-2">
                    {user.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No pending approvals found
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-sm font-medium text-blue-800">Approval Guidelines</h3>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Review user information carefully before approving or rejecting</li>
          <li>• Verify that email addresses and mobile numbers are valid</li>
          <li>• Check for duplicate registrations</li>
          <li>• Approved users will receive access to their trading accounts</li>
          <li>• Rejected users can resubmit their applications with corrections</li>
        </ul>
      </div>
    </div>
  );
};

export default Approval;