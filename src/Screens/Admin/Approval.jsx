import React, { useState, useEffect } from 'react';
import { adminAPI, authUtils } from '../../services/api';

const Approval = () => {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPendingUsers();
  }, []);

  const loadPendingUsers = async () => {
    try {
      setLoading(true);
      
      if (!authUtils.isAuthenticated()) {
        setError('Please log in to access admin features');
        return;
      }

      const result = await adminAPI.getPendingUsers();
      
      if (result.err) {
        throw new Error(result.message);
      }

      // Filter for pending users (not yet verified/approved)
      const allUsersData = result.data || [];
      const pendingUsers = allUsersData.filter(user => 
        user.isVerified === false || 
        user.status === 'pending' || 
        user.isApproved === false ||
        !user.hasOwnProperty('isVerified')
      );
      
      console.log('Total users found:', allUsersData.length);
      console.log('Pending users found:', pendingUsers.length);
      if (allUsersData.length > 0) {
        console.log('Sample user fields:', Object.keys(allUsersData[0]));
      }

      setPendingApprovals(pendingUsers);
      setAllUsers(allUsersData);
      setError('');
    } catch (err) {
      console.error('Error loading pending users:', err);
      setError(err.message || 'Failed to load pending users');
      
      if (err.status === 401 || err.status === 404) {
        authUtils.logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const result = await adminAPI.approveUser(id, 'approve');
      if (result.err) {
        throw new Error(result.message);
      }

      // Remove from pending list
      setPendingApprovals(prev => prev.filter(user => user._id !== id));
      alert('User approved successfully!');
    } catch (err) {
      console.error('Error approving user:', err);
      alert('Failed to approve user: ' + (err.message || 'Unknown error'));
    }
  };

  const handleReject = async (id) => {
    try {
      const result = await adminAPI.approveUser(id, 'reject');
      if (result.err) {
        throw new Error(result.message);
      }

      // Remove from pending list
      setPendingApprovals(prev => prev.filter(user => user._id !== id));
      alert('User rejected successfully!');
    } catch (err) {
      console.error('Error rejecting user:', err);
      alert('Failed to reject user: ' + (err.message || 'Unknown error'));
    }
  };

  // Calculate statistics
  const pendingCount = pendingApprovals.length;
  const totalCount = allUsers.length;
  const approvedCount = allUsers.filter(user => user.isVerified === true).length;

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Sign Up Approval Awaiting</h1>
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
        <h1 className="text-3xl font-bold mb-6">Sign Up Approval Awaiting</h1>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 font-semibold mb-2">Error Loading Pending Users</div>
          <div className="text-red-500 text-sm">{error}</div>
        </div>
      </div>
    );
  }

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
          <div className="text-sm text-gray-600">Total Registered</div>
          <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Awaiting Review</div>
          <div className="text-2xl font-bold text-gray-600">{pendingCount}</div>
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
            pendingApprovals.map((user, index) => {
              const dateCreated = new Date(user.createdAt);
              const formatDate = dateCreated.toLocaleDateString();
              const formatTime = dateCreated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              return (
                <div 
                  key={user._id} 
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-[auto_1fr_1.5fr_1fr_1fr_1fr_1.5fr] gap-4 items-center">
                    <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                    <span className="text-sm font-medium text-gray-900">{user.firstname} {user.lastname}</span>
                    <span className="text-sm text-gray-600">{user.email}</span>
                    <span className="text-sm text-gray-900">{user.phone_number || 'N/A'}</span>
                    <span className="text-sm text-gray-900 font-mono">•••••••••</span>
                    <div className="text-sm text-gray-600">
                      <div className="font-medium">{formatDate}</div>
                      <div className="text-xs text-gray-500">{formatTime}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(user._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
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