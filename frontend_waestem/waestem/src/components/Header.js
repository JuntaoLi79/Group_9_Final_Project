import React, { useContext } from 'react';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo1.png';

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="w-full bg-transparent py-3 px-6 fixed top-0 z-10">
      <div className="flex justify-between items-center">
        <img
          src={logo}
          alt="Waestem Logo"
          className="h-10 cursor-pointer"
          onClick={() => handleNavigation('/')}
        />
       <nav>
  <ul className="flex justify-between space-x-4">
    <li
      onClick={() => handleNavigation('/')}
      className="cursor-pointer hover:text-blue-500 transition-all duration-200"
    >
      Home
    </li>
    <li
      onClick={() => handleNavigation('/profiles')}
      className="cursor-pointer hover:text-blue-500 transition-all duration-200"
    >
      Profiles
    </li>
    <li
      onClick={() => handleNavigation('/create_post')}
      className="cursor-pointer hover:text-blue-500 transition-all duration-200"
    >
      Create Post
    </li>
    <li
      onClick={() => handleNavigation('/pin_board')}
      className="cursor-pointer hover:text-blue-500 transition-all duration-200"
    >
      Pin Board
    </li>
  </ul>
</nav>

        {user ? (
          <div className="flex items-center">
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
    </header>
  );
};

export default Header;
