
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// Screens
import LandingPg from './screens/LandingPg';
import Login from './screens/Login';
import Signup from './screens/Signup';


// Admin Screens
import AdminLayout from './screens/Admin/AdminLayout';
import AdminHome from './screens/Admin/Home';
import Approval from './screens/Admin/Approval';
import Funds from './screens/Admin/Funds';
import Logout from './Modals/logout';
import Pass from './screens/Admin/Pass';
import Trade from './screens/Admin/Trade';

// User Screens
import UserHomePage from './screens/User/HomePage';
import UserLayout from './Screens/User/UserLayout';
import Contact from './screens/User/Contact';
import Discover from './screens/User/Discover';
import WatchList from './screens/User/WatchList';

// Wallet Screens
import WalletLayout from './screens/User/Wallet/WalletLayout';
import WalletHistory from './screens/User/Wallet/History';
import WalletOverview from './screens/User/Wallet/Overview';
import WalletTransaction from './screens/User/Wallet/Transaction';

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
            <Route path="history" element={<WalletHistory />} />
            <Route path="transaction" element={<WalletTransaction />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}


export default App;
