

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, authUtils } from '../services/api';




const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [loginError, setLoginError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    
    if (validate()) {
      try {
        // Call the real API
        const response = await authAPI.login({ email, password });

        // Extract token and user data from response
        const { token, user } = response.data;
        
        // Store token using auth utilities
        authUtils.login(token);
        
        // Determine user role and navigate
        if (user.role === 'admin') {
          if (onLogin) onLogin('admin');
          navigate('/admin');
        } else {
          if (onLogin) onLogin('user');
          navigate('/user');
        }
      } catch (error) {
        console.error('Login error:', error);
        
        // Handle CORS and network errors with user-friendly messages
        if (error.message.includes('CORS') || error.message.includes('fetch')) {
          setLoginError('Unable to connect to server. Please try again later or contact support.');
        } else if (error.status === 401 || error.status === 403) {
          setLoginError('Invalid email or password. Please check your credentials.');
        } else if (error.status === 404) {
          setLoginError('User not found. Please check your email address.');
        } else {
          setLoginError(error.message || 'Login failed. Please try again.');
        }
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6 gap-4">
          <button
            className="flex-1 py-2 rounded-full font-semibold text-lg border-2 border-red-600 text-red-600 bg-white hover:bg-red-50 transition"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </button>
          <button
            className="flex-1 py-2 rounded-full font-semibold text-lg border-2 bg-red-600 text-white border-red-600"
            disabled
          >
            Sign in
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <hr className="w-full border-gray-300" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email address"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.email ? 'border-red-500' : ''}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password "
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.password ? 'border-red-500' : ''}`}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>
          {loginError && <p className="text-xs text-red-500 mt-1 text-center">{loginError}</p>}
          <button 
            type="submit" 
            className="w-full bg-red-600 text-white rounded-full py-2 text-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;