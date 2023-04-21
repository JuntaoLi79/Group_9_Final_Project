import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import UserContext from './UserContext';

const Login = () => {
  const [data, setData] = useState([{}]);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePost = async (userObject) => {
    const { name, picture: img, email } = userObject;
    const response = await axios.post('http://127.0.0.1:5000/userUp', { name, img, email });
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
  }

  useEffect(() => {
    /* global google */
    google?.accounts.id.initialize({
      client_id:
        '796000480028-i74bcc0m3jmcl64hpem9ruuu063hs87t.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });
    google?.accounts.id.renderButton(
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
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div id="signin"> Sign In</div>
    </div>
  );
};

export default Login;
