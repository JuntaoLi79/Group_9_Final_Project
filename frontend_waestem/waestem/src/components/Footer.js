import React from 'react';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
    const navigate = useNavigate();
  
    return (
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto">
          <div
            className="cursor-pointer hover:underline"
            onClick={() => navigate('/privacy')}
          >
            Privacy
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  