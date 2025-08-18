
import React from 'react';
import { useNavigate } from 'react-router-dom';


const LandingPg = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Landing Page</h1>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/signup')}>Sign Up</button>
    </>
  );
}

export default LandingPg