import React, { useState, useRef, useEffect } from 'react';
import LogoutModal from '../Modals/logout';


const avatarUrl = "https://randomuser.me/api/portraits/men/32.jpg";

const AdminNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-black">
      <div className="bg-white rounded-b-3xl flex items-center justify-between px-8 py-4 w-full">
        <span className="font-extrabold text-2xl tracking-wide">LOGO</span>
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              className="focus:outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <img
                src={avatarUrl}
                alt="Admin Avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      onClick={() => { setDropdownOpen(false); setShowLogout(true); }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <LogoutModal open={showLogout} onClose={() => setShowLogout(false)} />
    </nav>
  );
};

export default AdminNavbar;
