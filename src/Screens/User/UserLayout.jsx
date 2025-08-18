import React from 'react';
import UserNavbar from '../../Components/UserNavbar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => (
  <>
    <UserNavbar />
    <Outlet />
  </>
);

export default UserLayout;
