// API Base Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://bulls-bear-backend.vercel.app';

// API Response interface based on backend format: { err, message, data }
class ApiError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

// Main API client class
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('bulls_bear_token');
  }

  // Set auth token
  setAuthToken(token) {
    localStorage.setItem('bulls_bear_token', token);
  }

  // Remove auth token
  removeAuthToken() {
    localStorage.removeItem('bulls_bear_token');
  }

  // Build headers with auth token if available
  getHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  // Main request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.headers),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Check if response is ok first
      if (!response.ok) {
        // Try to parse JSON error response
        try {
          const data = await response.json();
          throw new ApiError(
            data.message || `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            data
          );
        } catch (jsonError) {
          // If JSON parsing fails, throw generic error
          throw new ApiError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            null
          );
        }
      }

      const data = await response.json();

      // Backend format: { err: boolean, message: string, data: any }
      // Note: The backend sometimes returns err: true even for successful empty results
      // We should only throw an error if it's actually an error condition
      if (data.err && response.status >= 400) {
        throw new ApiError(
          data.message || 'Request failed',
          response.status,
          data
        );
      }

      return data; // Return the full response object
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or CORS errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new ApiError(
          'Unable to connect to server. This might be due to CORS policy or network issues. Please ensure the backend server is running and configured to allow requests from this domain.',
          0,
          null
        );
      }
      
      // Other errors
      throw new ApiError(
        error.message || 'Network error occurred',
        0,
        null
      );
    }
  }

  // Convenience methods
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create singleton instance
const apiClient = new ApiClient();

// API endpoint functions organized by feature
export const authAPI = {
  // POST /api/auth/signup
  signup: (userData) => apiClient.post('/api/auth/signup', userData),
  
  // POST /api/auth/login
  login: (credentials) => apiClient.post('/api/auth/login', credentials),
  
  // GET /api/auth/get-user-profile
  getUserProfile: () => apiClient.get('/api/auth/get-user-profile'),
  
  // POST /api/auth/request-password-change
  requestPasswordChange: (passwordData) => 
    apiClient.post('/api/auth/request-password-change', passwordData),
};

export const walletAPI = {
  // GET /api/transaction/
  getTransactions: () => apiClient.get('/api/transaction/'),
  
  // POST /api/transaction/deposit
  requestDeposit: (amount) => apiClient.post('/api/transaction/deposit', { amount }),
  
  // POST /api/transaction/withdraw
  requestWithdraw: (amount) => apiClient.post('/api/transaction/withdraw', { amount }),
};

export const tradingAPI = {
  // POST /api/trade/buy
  buyCrypto: (tradeData) => apiClient.post('/api/trade/buy', tradeData),
  
  // GET /api/trade/my-trades
  getUserTrades: () => apiClient.get('/api/trade/my-trades'),
  
  // GET /api/trade/:id
  getSingleTrade: (id) => apiClient.get(`/api/trade/${id}`),
  
  // GET /api/trade/ (admin only)
  getAllTrades: () => apiClient.get('/api/trade/'),
};

export const watchlistAPI = {
  // GET /api/watchlist/
  getWatchlist: () => apiClient.get('/api/watchlist/'),
  
  // POST /api/watchlist/add-to-watchlist
  addToWatchlist: (watchlistData) => 
    apiClient.post('/api/watchlist/add-to-watchlist', watchlistData),
  
  // PUT /api/watchlist/remove-from-watchlist/:id
  removeFromWatchlist: (id) => 
    apiClient.put(`/api/watchlist/remove-from-watchlist/${id}`),
};

export const adminAPI = {
  // GET /api/admin/users
  getAllUsers: () => apiClient.get('/api/admin/users'),
  
  // GET /api/admin/users (for pending users - filter by status)
  getPendingUsers: () => apiClient.get('/api/admin/users'),
  
  // PUT /api/admin/:id (for user approval)
  approveUser: (userId, action) => apiClient.put(`/api/admin/${userId}`, { action }),
  
  // GET /api/admin/password-requests
  getPasswordRequests: () => apiClient.get('/api/admin/password-requests'),
  
  // GET /api/admin/password-requests (alias for consistency)
  getPasswordChangeRequests: () => apiClient.get('/api/admin/password-requests'),
  
  // PATCH /api/admin/change-password/approve/:id
  approvePasswordChange: (requestId, action) => 
    apiClient.patch(`/api/admin/change-password/approve/${requestId}`, { action }),
  
  // GET /api/admin/get-all-transactions
  getAllTransactions: () => apiClient.get('/api/admin/get-all-transactions'),
  
  // PUT /api/admin/transactions/:id
  approveTransaction: (transactionId, action) => 
    apiClient.put(`/api/admin/transactions/${transactionId}`, { action }),
};

// Export main client and error class
export { apiClient, ApiError };

// Export auth utilities
export const authUtils = {
  isAuthenticated: () => !!apiClient.getAuthToken(),
  
  login: (token) => {
    apiClient.setAuthToken(token);
  },
  
  logout: () => {
    apiClient.removeAuthToken();
    // Only redirect if we're not already on the login page
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  },
  
  getToken: () => apiClient.getAuthToken(),
};
