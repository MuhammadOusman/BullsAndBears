
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// Screens
import LandingPg from './Screens/LandingPg';
import Login from './Screens/Login';
import Signup from './Screens/Signup';

// Admin Screens
import AdminLayout from './Screens/Admin/AdminLayout';
import AdminHome from './Screens/Admin/Home';
import Approval from './Screens/Admin/Approval';
import Funds from './Screens/Admin/Funds';
import Logout from './Modals/logout';
import Pass from './Screens/Admin/Pass';
import Trade from './Screens/Admin/Trade';

// User Screens
import UserHomePage from './Screens/User/HomePage';
import UserLayout from './Screens/User/UserLayout';
import Contact from './Screens/User/Contact';
import Discover from './Screens/User/Discover';
import WatchList from './Screens/User/WatchList';

// Wallet Screens
import WalletLayout from './Screens/User/Wallet/WalletLayout';
import WalletHistory from './Screens/User/Wallet/History';
import WalletOverview from './Screens/User/Wallet/Overview';
import WalletTransaction from './Screens/User/Wallet/Transaction';
import Deposit from './Screens/User/Wallet/Deposit';

function App() {
  // Persist auth state in localStorage
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem('auth');
    return stored ? JSON.parse(stored) : { isLoggedIn: false, role: null };
  });

  const handleLogin = (role) => {
    const newAuth = { isLoggedIn: true, role };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
  };
  const handleLogout = () => {
    setAuth({ isLoggedIn: false, role: null });
    localStorage.removeItem('auth');
  };

  // Protected route wrapper
  function ProtectedRoute({ isAllowed, children }) {
    if (!isAllowed) {
      return <Navigate to="/login" replace />;
    }
    return children ? children : <Outlet />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPg />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup />} />
      

      {/* Protected Admin routes */}
      <Route element={<ProtectedRoute isAllowed={auth.isLoggedIn && auth.role === 'admin'} />}> 
        <Route path="/admin" element={<AdminLayout onLogout={handleLogout} />} >
          <Route index element={<AdminHome />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="approval" element={<Approval />} />
          <Route path="funds" element={<Funds />} />
          <Route path="logout" element={<Logout />} /> 
          <Route path="pass" element={<Pass />} />
          <Route path="trade" element={<Trade />} />
        </Route>
      </Route>

      {/* Protected User routes */}
      <Route element={<ProtectedRoute isAllowed={auth.isLoggedIn && auth.role === 'user'} />}> 
        <Route path="/user" element={<UserLayout />} >
          <Route index element={<UserHomePage />} />
          <Route path="home" element={<UserHomePage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="discover" element={<Discover />} />
          <Route path="watchlist" element={<WatchList />} />

          <Route path="wallet" element={<WalletLayout />} >
            <Route index element={<WalletOverview />} />
            <Route path="overview" element={<WalletOverview />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="history" element={<WalletHistory />} />
            <Route path="transaction" element={<WalletTransaction />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}


export default App;
