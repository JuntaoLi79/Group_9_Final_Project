import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import Home from './components/Home';
import Profiles from './components/Profiles';
import PinBoard from './components/PinBoard';


const App= () => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
        <Route path="profiles" element={<Profiles />} />
        <Route path="create_post" element={<CreatePost />} />
        <Route path="pin_board" element={<PinBoard />} />
      </Routes>
    </Router>
  );
}

export default App;