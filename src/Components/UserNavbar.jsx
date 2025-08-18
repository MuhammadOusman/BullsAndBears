
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileModal from '../Modals/Profile';
import PassChangeModal from '../Modals/PassChange';
import LogoutModal from '../Modals/logout';

const avatarUrl = "https://randomuser.me/api/portraits/men/32.jpg";
const navLinks = [
  { name: "Home", path: "/user/home" },
  { name: "Watchlist", path: "/user/watchlist" },
  { name: "Trade", path: "/user/trade" },
  { name: "Discover", path: "/user/discover" },
  { name: "Wallet", path: "/user/wallet" },
  { name: "Contact", path: "/user/contact" },
];

const UserNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPassChange, setShowPassChange] = useState(false);
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
    <nav className="bg-black p-2">
      <div className="bg-white rounded-b-3xl flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          <span className="font-extrabold text-2xl tracking-wide">LOGO</span>
          <div className="flex gap-4">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-6 py-2 rounded-full font-semibold text-lg transition-all ${location.pathname === link.path ? "bg-red-600 text-white" : "text-black hover:bg-gray-100"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            className="focus:outline-none"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => { setDropdownOpen(false); setShowProfile(true); }}
                  >
                    User Profile
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => { setDropdownOpen(false); setShowPassChange(true); }}
                  >
                    Change Password
                  </button>
                </li>
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
      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
      <PassChangeModal open={showPassChange} onClose={() => setShowPassChange(false)} />
      <LogoutModal open={showLogout} onClose={() => setShowLogout(false)} />
    </nav>
  );
};

export default UserNavbar;

export function Component() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
