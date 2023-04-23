import React from 'react'
import { useLocation } from 'react-router-dom';




const ViewPost = () => {
  const location = useLocation();
  const { pin } = location.state;
  console.log(pin.location + " " + pin.title + " " + pin.description);


  return (
    <div className="m-10 container grid grid-cols-2 shadow-lg divide-gray-100">
      <div className="rounded-md">
        <img src={`data:image/png;base64,${pin.image}`} alt={pin.title}  />
      </div>
      <div class="rounded-md">
        <h2 className="font-bold text-xl">{pin.title}</h2>
        <p className="text-gray-500 text-md">{pin.location}</p>
        <p className="text-gray-700 text-md">{pin.description}</p>
      </div>
    </div>
  )
}


export default ViewPost