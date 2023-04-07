import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  function handleCallbackResponse(response) {
  
  }
  useEffect(() => {
    /* global google */
    google?.accounts.id.initialize({client_id:"796000480028-i74bcc0m3jmcl64hpem9ruuu063hs87t.apps.googleusercontent.com", callback:handleCallbackResponse})
  }, []
  );
  google?.accounts.id.renderButton(document.getElementById('signin'), {theme: 'dark', size: 'large', longtitle: true, onsuccess: ()=>{console.log("success")}, onfailure: ()=>{console.log("failure")}});
  return (
    <div>

      <div id="signin"> Sign In</div>
    </div>
  )
}

export default Login