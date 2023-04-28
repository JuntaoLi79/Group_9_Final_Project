import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo1.png';
import background from '../images/Great-Wall-Of-China.png';
const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleViewPostsClick = () => {
    navigate('/pin_board');
  };

  const handleCreatePostClick = () => {
    navigate('/create_post');
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="relative h-screen">
 
 <img src={background} alt="background" style={{objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}} />

      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <img src={logo} alt="logo" border="0" className="w-1/4" />
        <h1 className="text-5xl font-bold text-white mb-10">Welcome to Waestem!</h1>
        <div></div>
        <p className='text-white'>Waestem is a revolutionary travel social media website that allows you to connect with fellow travelers from across the world. Join us by creating an account today to show us and the world the travels you've been on.</p>
      </div>
    </div>
  );
};

export default Home;
