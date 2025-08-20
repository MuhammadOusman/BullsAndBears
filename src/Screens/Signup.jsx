
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrivacyModal from '../Modals/privacy';
import TermsModal from '../Modals/terms';

const Signup = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    mobile: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.mobile) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!/^\d{11,}$/.test(form.mobile)) {
      newErrors.mobile = 'Enter a valid mobile number.';
    }
    if (!form.firstName) {
      newErrors.firstName = 'First name is required.';
    }
    if (!form.lastName) {
      newErrors.lastName = 'Last name is required.';
    }
    if (!form.email) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!form.terms) {
      newErrors.terms = 'You must agree to the terms.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { id, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      // Submit logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6 gap-4">
          <button
            className="flex-1 py-2 rounded-full font-semibold text-lg border-2 bg-red-600 text-white border-red-600"
            disabled
          >
            Sign up
          </button>
          <button
            className="flex-1 py-2 rounded-full font-semibold text-lg border-2 border-red-600 text-red-600 bg-white hover:bg-red-50 transition"
            onClick={() => navigate('/login')}
          >
            Sign in
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <hr className="w-full border-gray-300" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="mobile" className="block text-gray-700 mb-1">Mobile Number</label>
            <input
              id="mobile"
              type="text"
              required
              placeholder="Enter your mobile number"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.mobile ? 'border-red-500' : ''}`}
              value={form.mobile}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">Enter a valid 11-digit mobile number.</p>
            {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name</label>
              <input
                id="firstName"
                type="text"
                required
                placeholder="Enter your first name"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.firstName ? 'border-red-500' : ''}`}
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-gray-700 mb-1">Last Name</label>
              <input
                id="lastName"
                type="text"
                required
                placeholder="Enter your last name"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.lastName ? 'border-red-500' : ''}`}
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email address"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.email ? 'border-red-500' : ''}`}
              value={form.email}
              onChange={handleChange}
            />
            
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              required
              placeholder="Create a password (min. 8 characters)"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.password ? 'border-red-500' : ''}`}
              value={form.password}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">Use at least 8 characters.</p>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              placeholder="Re-enter your password"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>
          <div className="flex items-center mb-2">
            <input
              id="terms"
              type="checkbox"
              required
              className="mr-2"
              checked={form.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms" className="text-xs text-gray-600">
              I have read and agree to the 
              <button type="button" className="underline text-blue-600 hover:text-blue-800 px-1" onClick={() => setShowTerms(true)}>
                Terms & Conditions
              </button>
              and
              <button type="button" className="underline text-blue-600 hover:text-blue-800 px-1" onClick={() => setShowPrivacy(true)}>
                Privacy Policy
              </button>
              of this application.
            </label>
          </div>
          {errors.terms && <p className="text-xs text-red-500 mb-2">{errors.terms}</p>}
          <button type="submit" className="w-full bg-red-600 text-white rounded-full py-2 text-lg font-semibold hover:bg-red-700">
            Create account
          </button>
  </form>
  {showPrivacy && <PrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />}
  {showTerms && <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />}
      </div>
    </div>
  );
};

export default Signup;