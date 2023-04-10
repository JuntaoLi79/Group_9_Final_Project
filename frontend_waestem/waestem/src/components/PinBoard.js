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
      <button onClick={handleGoBack} className="fixed top-0 left-0 p-4 text-white bg-blue-500 rounded-full shadow-md">
        <FaHome size={24} />
      </button>
      <div className="mx-auto max-w-lg pt-4">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full p-2 rounded-md border-2 border-blue-500 focus:outline-none focus:border-blue-700"
          placeholder="Search for pins"
        />
      </div>
      <button onClick={handleGoCreate} className="absolute top-0 right-0 mt-4 mr-4 px-4 py-2 text-white bg-red-500 rounded-md shadow-md">
          Create Post
        </button>
      <div className="grid grid-cols-3 gap-4 mt-8" style={{ gridAutoRows: 'minmax(100px, auto)', gridAutoFlow: 'dense' }}>
        {filteredPins.map((pin) => (
          <div
            key={pin.id}
            className="bg-white rounded-md shadow-md"
            style={{ gridColumnEnd: `span ${Math.ceil(pin.image_height / pin.image_width * 3)}` }}
          >
            <img src={`data:image/png;base64,${pin.image}`} alt={pin.title} />
            <div className="p-4">
              <h2 className="font-bold text-lg">{pin.title}</h2>
              <p className="text-gray-500 text-sm">{pin.location}</p>
              <p className="text-gray-700 text-sm">{pin.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinBoard;
