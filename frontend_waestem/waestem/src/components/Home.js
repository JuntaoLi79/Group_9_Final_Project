import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo1.png'; 
const getRandomVideo = async () => {
  const response = await axios.get('https://api.pexels.com/videos/search', {
    headers: {
      Authorization: "QjIq8U1oGiRBery44atJYLbeKa99MgNpoCeDy2ucU7Qdjzu7HZ3d89t9",
    },
    params: {
      query: 'travel',
      orientation: 'landscape',
      per_page: 1,
      min_width: 1920,
      min_height: 1080,
    },
  });
  return response.data.videos[0].video_files[0].link;
};

const Home = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const handleViewPostsClick = () => {
    navigate('/pin_board');
  };

  const handleCreatePostClick = () => {
    navigate('/create_post');
  };
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
          <button className="bg-white text-black py-3 px-6 rounded-lg font-bold shadow-lg" onClick={handleViewPostsClick}>
            View Posts
          </button>
          <button className="bg-white text-black py-3 px-6 rounded-lg font-bold shadow-lg" onClick={handleCreatePostClick}>
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
