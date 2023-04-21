import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const PinBoard = () => {
  const [pins, setPins] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/posts').then((response) => {
      setPins(response.data);
    });
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleGoCreate = () => {
    navigate('/create_post');
  };

  const filteredPins = pins.filter((pin) => {
    const searchLower = search.toLowerCase();
    return (
      pin.title.toLowerCase().includes(searchLower) ||
      pin.location.toLowerCase().includes(searchLower) ||
      pin.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="relative">
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
          <div key={pin.id} className="bg-white rounded-md shadow-md">
            <div className="relative">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinBoard;
