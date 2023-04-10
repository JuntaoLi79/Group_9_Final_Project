import React, {useState, useEffect} from 'react'

const Profiles = () => {
  const [user, setUser] = useState([{}])
  const [users, setUsers] = useState([{}])
  useEffect(() => {
    fetch('http://127.0.0.1:5000/userUp').then(response => response.json()).then(data => {
      setUsers(data);
      console.log(data)
    }
    )
  },[])
  return (
    
    <div className="grid grid-cols-3 gap-4 p-4">
      {users.map(user => (
        <div key={user[0]} className="bg-white rounded-lg shadow-md">
          <img src={user[2]} alt={user[1]} className="w-full h-64 object-cover rounded-t-lg" />
          <div className="p-4">
            <h2 className="font-bold text-2xl">{user[1]}</h2>
            <p className="text-gray-500 text-lg">{user[3]}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Profiles