import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from './UserContext';
import { FaTrash } from 'react-icons/fa';

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [pins, setPins] = useState([]);
    const [search, setSearch] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);
  
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!user) {
        alert('You must be logged in to view this page');
        navigate('/login');
      }
    }, [user, navigate])
  
    useEffect(() => {
      axios.get(`http://82.180.160.49/posts?username=${user?.name}`).then((response) => {
        setPins(response.data);
      });
    }, [user]);
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://82.180.160.49//posts/${id}`);
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
        <div className="flex justify-center items-center h-screen">
          <div className={`rounded-full border-4 border-white h-64 w-64 overflow-hidden ${imageLoaded ? 'animate-fade-in' : ''}`}>
            <img 
              src={user?.img} 
              alt={user?.name} 
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
            <a href={`/post/${pin.id}`} key={pin.id} className="bg-white rounded-md shadow-md">
              <div className="relative">
              <FaTrash
      className="absolute top-2 right-2 text-red-500 cursor-pointer"
      onClick={() => handleDelete(pin.id)}
    />
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
            </a>
          ))}
        </div>
      </div>
    );
  };
  

export default UserProfile;