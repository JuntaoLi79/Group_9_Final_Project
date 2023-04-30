import React, {useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import Home from './components/Home';
import Profiles from './components/Profiles';
import PinBoard from './components/PinBoard';
import UserContext from './components/UserContext';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import ViewPost from './components/ViewPost';
import Privacy from './components/Privacy';
import Footer from './components/Footer';
const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <main className="pt-16">
        <Router>
          <Header />
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="create_post" element={<CreatePost />} />
            <Route path="pin_board" element={<PinBoard />} />
            <Route path="user/:username" element={<UserProfile />} />
            <Route path="view_post" element={<ViewPost />} />
            <Route path="privacy" element={<Privacy />} />
          </Routes>
        <Footer/>
        </Router>
      </main>
    </UserContext.Provider>
  );
}

export default App;
