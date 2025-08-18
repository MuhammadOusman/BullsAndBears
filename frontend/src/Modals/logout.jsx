

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    onClose && onClose();
    navigate('/login');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="text-center">
          <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to log out?
          </h3>
          <div className="flex justify-center gap-4">
            <button
              className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
              onClick={handleLogout}
            >
              Yes, log me out
            </button>
            <button
              className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
              onClick={onClose}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
