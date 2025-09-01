import React, { useState, useEffect } from 'react';
import { adminAPI, authUtils } from '../../services/api';

const Pass = () => {
  const [passwordRequests, setPasswordRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPasswordRequests();
  }, []);

  const loadPasswordRequests = async () => {
    try {
      setLoading(true);
      
      if (!authUtils.isAuthenticated()) {
        setError('Please log in to access admin features');
        return;
      }

      const result = await adminAPI.getPasswordChangeRequests();
      if (result.err) {
        throw new Error(result.message);
      }

      setPasswordRequests(result.data || []);
      setError('');
    } catch (err) {
      console.error('Error loading password requests:', err);
      setError(err.message || 'Failed to load password change requests');
      
      if (err.status === 401 || err.status === 404) {
        authUtils.logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const result = await adminAPI.approvePasswordChange(id, 'approve');
      if (result.err) {
        throw new Error(result.message);
      }

      // Remove from pending list
      setPasswordRequests(prev => prev.filter(req => req._id !== id));
      alert('Password change request approved successfully!');
    } catch (err) {
      console.error('Error approving password change:', err);
      alert('Failed to approve password change: ' + (err.message || 'Unknown error'));
    }
  };

  const handleReject = async (id) => {
    try {
      const result = await adminAPI.approvePasswordChange(id, 'reject');
      if (result.err) {
        throw new Error(result.message);
      }

      // Remove from pending list
      setPasswordRequests(prev => prev.filter(req => req._id !== id));
      alert('Password change request rejected successfully!');
    } catch (err) {
      console.error('Error rejecting password change:', err);
      alert('Failed to reject password change: ' + (err.message || 'Unknown error'));
    }
  };

  const pendingCount = passwordRequests.filter(request => request.status === 'pending').length;
  const approvedCount = passwordRequests.filter(request => request.status === 'approved').length;
  const rejectedCount = passwordRequests.filter(request => request.status === 'rejected').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold">Password Change Request</h1>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Pending Requests</div>
          <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Approved Requests</div>
          <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Rejected Requests</div>
          <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
        </div>
      </div>

      {/* Password Change Requests Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-[auto_1fr_1.5fr_1fr_1fr_1.5fr] gap-4 text-sm font-semibold text-gray-700">
            <span>#</span>
            <span>User Name</span>
            <span>User Mail</span>
            <span>Requested On</span>
            <span>Password</span>
            <span>Actions</span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {passwordRequests.length > 0 ? (
            passwordRequests.map((request, index) => (
              <div 
                key={request._id || request.id || index} 
                className={`px-6 py-4 transition-colors ${
                  request.status === 'approved' ? 'bg-green-50' : 
                  request.status === 'rejected' ? 'bg-red-50' : 
                  'hover:bg-gray-50'
                }`}
              >
                <div className="grid grid-cols-[auto_1fr_1.5fr_1fr_1fr_1.5fr] gap-4 items-center">
                  <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                  <span className="text-sm font-medium text-gray-900">{request.userId?.firstname} {request.userId?.lastname}</span>
                  <span className="text-sm text-gray-600">{request.userId?.email || request.userEmail}</span>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">{new Date(request.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500">{new Date(request.createdAt).toLocaleTimeString()}</div>
                  </div>
                  <span className="text-sm text-gray-900 font-mono">
                    {request.newPassword ? '••••••••' : 'N/A'}
                  </span>
                  <div className="flex gap-2">
                    {request.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApprove(request._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No password change requests found
            </div>
          )}
        </div>
      </div>

      {/* Security Guidelines */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-sm font-medium text-yellow-800">Security Guidelines</h3>
        </div>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Verify user identity before approving password change requests</li>
          <li>• Check for suspicious activity or multiple requests from the same user</li>
          <li>• Ensure the new password meets security requirements</li>
          <li>• Notify users via email when their password change requests are processed</li>
          <li>• Log all password change activities for security audit purposes</li>
        </ul>
      </div>
    </div>
  );
};

export default Pass;