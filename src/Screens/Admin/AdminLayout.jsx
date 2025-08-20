import React from 'react';
import AdminNavbar from '../../Components/AdminNavbar';
import AdminSidebar from '../../Components/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex min-h-screen">
        <div className="w-16 bg-white border-r md:w-64">
          <AdminSidebar />
        </div>
        <div className="flex-1 p-8 md:ml-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
