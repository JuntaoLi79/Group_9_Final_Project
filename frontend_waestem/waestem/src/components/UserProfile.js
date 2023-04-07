import React, {useState, useEffect} from 'react'

const UserProfile = () => {
  const [user, setUser] = useState([{}])
  useEffect(() => {
    fetch('http://127.0.0.1:5000/traveler_data').then(response => response.json()).then(data => {
      setUser(data);
      console.log(data)
    }
    )
  },[])
  return (
    
    <div>UserProfile</div>
  )
}

export default UserProfile