import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import UserContext from './UserContext';
import logo from '../images/logo1.png'; 
const Login = () => {
  const [data, setData] = useState([{}]);
  const { setUser } = useContext(UserContext);
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();
  const getRandomVideo = async () => {
    const response = await axios.get('https://api.pexels.com/videos/search', {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PEXELS_API_KEY}`,
      },
      params: {
        query: 'travel',
        orientation: 'landscape',
        per_page: 10,
        min_width: 1920,
        min_height: 1080,
      },
    });
    const randomIndex = Math.floor(Math.random() * response.data.videos.length);
    return response.data.videos[randomIndex].video_files[0].link; 
  };

  const handlePost = async (userObject) => {
    const { name, picture: img, email } = userObject;
    const response = await axios.post(' https://douvledorm.com/userUp', { name, img, email });
    setData(response.data);
    console.log(data);
  };

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token' + response.credential);
    var userObject = jwt_decode(response.credential);
    var name = userObject.name;
    var img = userObject.picture;
    var email = userObject.email;
    setUser({ name, img, email });
    handlePost(userObject);
    navigate(`/user/${name}`);
  }

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id:
            '796000480028-i74bcc0m3jmcl64hpem9ruuu063hs87t.apps.googleusercontent.com',
          callback: handleCallbackResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById('signin'),
          {
            class:
              'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex-auto',
            onsuccess: () => {
              console.log('success');
            },
            onfailure: () => {
              console.log('failure');
            },
          }
        );
      } else {
        setTimeout(initializeGoogleSignIn, 100);
      }
    };
  
    initializeGoogleSignIn();
  }, []);
  useEffect(() => {
    const loadVideo = async () => {
      const url = await getRandomVideo();
      setVideoUrl(url);
    };
    loadVideo();
  }, []);

  return (
    <div className="relative h-screen">
      <video
        src={videoUrl}
        autoPlay
        muted
        loop
        className="absolute inset-0 object-cover w-full h-full"
      ></video>
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <img src={logo} alt="logo" border="0" className="w-1/4" />
        <h1 className="text-5xl font-bold text-white mb-10">Welcome!</h1>
        <div className="flex space-x-4">
          <div id="signin"> Sign In</div>
        </div>
      </div>
    </div>

      
  
  );
};

export default Login;
