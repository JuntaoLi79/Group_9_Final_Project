import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PinBoard = () => {
  const [pins, setPins] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPin, setSelectedPin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://douvledorm.com//posts').then((response) => {
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

  const openModal = (pin) => {
    setSelectedPin(pin);
  };

  const closeModal = () => {
    setSelectedPin(null);
  };

  const handleClickedPost = (pin) => {
    navigate('/view_post', { state: { pin } });
  };


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
          <div key={pin.id} className="bg-white rounded-md shadow-md cursor-pointer" onClick={() => handleClickedPost(pin)}>
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
      {selectedPin && (
        <Modal
          isOpen={!!selectedPin}
          onRequestClose={closeModal}
          contentLabel="Selected Pin"
          className="absolute inset-0 mx-auto my-8 p-4 md:p-8 overflow-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
        >
          <div className="bg-white w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-4 md:mx-0 md:rounded-md shadow-lg">
            <div className="relative">
              <img src={`data:image/png;base64,${selectedPin.image}`} alt={selectedPin.title} className="w-full rounded-t-md" />
              <img
                className="rounded-full border-2 border-white absolute bottom-0 left-0 ml-4 mb-4"
                src={selectedPin.user_image}
                alt={selectedPin?.username}
                style={{ width: '40px', height: '40px' }}
              />
            </div>
            <div className="px-4 py-2">
              <h2 className="font-bold text-lg mb-2">{selectedPin.title}</h2>
              <p className="text-gray-500 text-sm mb-1">{selectedPin.location}</p>
              <p className="text-gray-700 text-sm">{selectedPin.description}</p>
            </div>
            <div className="my-4 mx-4">
              <iframe
                src={`/post/${selectedPin.id}`}
                title={`Post ${selectedPin.id}`}
                className="w-full h-96 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={closeModal}
              className="block ml-auto mr-4 mb-4 text-white bg-red-500 hover:bg-red-600 rounded-md px-4 py-2"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PinBoard;

