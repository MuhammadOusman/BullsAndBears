import React from 'react';
import { Outlet } from 'react-router-dom';
import WalletSidebar from '../../../Components/WalletSidebar';


const WalletLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-white border-r">
        <WalletSidebar />
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default WalletLayout
