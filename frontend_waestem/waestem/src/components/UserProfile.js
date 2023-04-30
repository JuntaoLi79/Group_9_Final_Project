import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from './UserContext';
import { FaTrash } from 'react-icons/fa';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const { username } = useParams();
  console.log("username from useParams:", username);
  const [pins, setPins] = useState([]);
  const [search, setSearch] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert('You must be logged in to view this page');
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `https://douvledorm.com/userUp?username=${username}`
        );
        console.log("Fetching user data for:", username);
        console.log("User data:", userResponse.data);
    
        if (userResponse.data && userResponse.data.length > 0) {
          setProfileImg(userResponse.data[0][2]);
          console.log("Profile image URL:", userResponse.data[0][2]);
    
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    
  }, [username]);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
          const formattedUsername = username.replace(/ /g, '%20');
          const pinsResponse = await axios.get(`https://douvledorm.com/posts?username=${formattedUsername}`);
          setPins(pinsResponse.data);
          console.log('Fetching posts for:', username);
          console.log('Posts data:', pinsResponse.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      
    };

    fetchPosts();
  }, [username]);
  
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`https://douvledorm.com//posts/${id}`);
        setPins(pins.filter((pin) => pin.id !== id));
        alert('Post deleted successfully!')
      } catch (error) {
        alert('Something went wrong!')
        console.error(error);
      }
    };
  
  
    const filteredPins = pins.filter((pin) => {
      const searchLower = search.toLowerCase();
      return (
        pin.title.toLowerCase().includes(searchLower) ||
        pin.location.toLowerCase().includes(searchLower) ||
        pin.description.toLowerCase().includes(searchLower)
      );
    });
  
    const handleImageLoad = () => {
      setImageLoaded(true);
    }
  
    return (
      <div className="relative">
      {loading && (
  <div className="flex justify-center items-center h-screen">
    <p>Loading...</p>
  </div>
)}
        <div className="flex justify-center items-center h-screen">
          <div className={`rounded-full border-4 border-white h-64 w-64 overflow-hidden ${imageLoaded ? 'animate-fade-in' : ''}`}>
          <img 
            src={profileImg} 
            alt={username} 
            onLoad={handleImageLoad}
            className="h-full w-full object-cover"
          />
          </div>
        </div>
        <div className="mx-auto max-w-lg pt-4">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full p-2 rounded-md border-2 border-blue-500 focus:outline-none focus:border-blue-700"
            placeholder="Search for pins"
          />
        </div>
        <div className="grid grid-cols-3 gap-8 mt-8">
          {filteredPins.map((pin) => (
            username === pin.username && (
            <a href={`/post/${pin.id}`} key={pin.id} className="bg-white rounded-md shadow-md">
              <div className="relative">
              {user && user.name === pin.username && (
              <FaTrash
      className="absolute top-2 right-2 text-red-500 cursor-pointer"
      onClick={() => handleDelete(pin.id)}
    />)}
                <img src={`data:image/png;base64,${pin.image}`} alt={pin.title} className="w-full rounded-t-md" />
                <img
                  className="rounded-full border-2 border-white absolute bottom-0 left-0 ml-4 mb-4"
                  src={pin.user_image}
                  alt={pin?.username}
                  style={{ width: '40px', height: '40px' }}
                />
              </div>
              <div className="px-4 py-2">
                <h2 className="font-bold text-lg mb-2">{pin.title}</h2>
                <p className="text-gray-500 text-sm mb-1">{pin.location}</p>
                <p className="text-gray-700 text-sm">{pin.description}</p>
              </div>
            </a>)
          ))}
        </div>
      </div>
    );
  };
  

export default UserProfile;
