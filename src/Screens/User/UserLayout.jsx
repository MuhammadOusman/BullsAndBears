import React from 'react';
import UserNavbar from '../../Components/UserNavbar';
import UserFooter from '../../Components/UserFooter';
import { Outlet } from 'react-router-dom';

const UserLayout = () => (
  <>
    <UserNavbar />
    <Outlet />
    <UserFooter />
  </>
);

export default UserLayout;
