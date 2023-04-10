import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios';

const Login = () => {
  const[user, setUser] = useState([{}])
  const[data, setData] = useState([{}])
  const navigate = useNavigate();
  const handlePost = async (e) => {
    console.log(e)
    const response = await axios.post('http://127.0.0.1:5000/userUp', {e });
    setData(response.data);
    console.log(data)
  };
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential);
    var userObject = jwt_decode(response.credential);
    var name = userObject.name;
    var img = userObject.picture;
    var email = userObject.email;
    setUser([name, img, email]);
    handlePost(user);
  }
  useEffect(() => {
    /* global google */
    google?.accounts.id.initialize({client_id:"796000480028-i74bcc0m3jmcl64hpem9ruuu063hs87t.apps.googleusercontent.com", callback:handleCallbackResponse});
    google?.accounts.id.renderButton(document.getElementById('signin'), {class:'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex-auto', onsuccess: ()=>{console.log("success")}, onfailure: ()=>{console.log("failure")}});
  }, []
  );
  return (
    <div className="flex justify-center items-center h-screen">

      <div id="signin"> Sign In</div>
    </div>
  )
}

export default Login