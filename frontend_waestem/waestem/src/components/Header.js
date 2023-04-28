import React, { useContext } from 'react';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo1.png';
import { useState } from "react";

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [navbar, setNavbar] = useState(false);

  return (
    <header className="w-full bg-transparent py-3 px-6 fixed top-0 z-10">
    <nav class="bg-gray-800" >
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">

            <button type="button" class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false"onClick={() => setNavbar(!navbar)}>
              {navbar ?(
              <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              ):(
              <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              )}
            </button>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <img class="block h-10 w-auto lg:hidden" src={logo} alt="Waestem Logo" onClick={() => handleNavigation('/')}></img>
              <img class="hidden h-10 w-auto lg:block" src={logo} alt="Waestem Logo" onClick={() => handleNavigation('/')}></img>
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <a onClick={() => handleNavigation('/')} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</a>
                <a onClick={() => handleNavigation('/profiles')} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Profiles</a>
                <a onClick={() => handleNavigation('/create_post')} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Create Post</a>
                <a onClick={() => handleNavigation('/pin_board')} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Pin Board</a>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user ? (
              <div >
                <img
                  src={user.img}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => navigate(`/user/${user.name}`)}
                />
              </div>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <div class="sm:hidden" className = {navbar ? "hidden" : "block"}>
        <div class="space-y-1 px-2 pb-3 pt-2">
          <a onClick={() => handleNavigation('/')} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" >Home</a>
          <a onClick={() => handleNavigation('/profiles')} class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Profiles</a>
          <a onClick={() => handleNavigation('/create_post')} class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Create Post</a>
          <a onClick={() => handleNavigation('/pin_board')} class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Pin Board</a>
        </div>
      </div>
    </nav>
    <script>
      // Grab HTML Elements
      const btn = document.querySelector("button.mobile-menu-button");
      const menu = document.querySelector(".mobile-menu");

      // Add Event Listeners
      
    </script>
    </header>
  );
};

export default Header;
