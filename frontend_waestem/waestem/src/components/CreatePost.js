import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from './UserContext';


const OPENAI_API_KEY_CURRENT = process.env.REACT_APP_OPENAI_API_KEY;
console.log('OPENAI_API_KEY_CURRENT:', OPENAI_API_KEY_CURRENT);
const CreatePost = () => {
  const[typing, setTyping] = useState(false);
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      alert('You need to login first!');
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    console.log({ title, description, image, location });
  }, [title, description, image, location]);
  if (!user) {
    return null;
  }
const handleRecommendation = async (e) => {
    e.preventDefault();

   if(location.length===0){
      alert("location is required")
      return
  }
   if(description.length===0){
      alert("Description is required")
      return
  }
  setTyping(true);
    const prompt = `What places do you recommend for me to go in/around ${location}? Based on my description: ${description}`;
    const systemMessage = {role: "system", content: "Be like a travel agent and explain everything clearly that is related to traveling."};
    let apiMessage = {role: "user", content: prompt};
    let apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        apiMessage],
    }
  try{
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers:{
        "Authorization": "Bearer " + OPENAI_API_KEY_CURRENT,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data)=>{
      return data.json()
    }).then((response)=>{
      console.log(response);
      setRecommendations(response.choices[0].message.content);
    }
    )}catch(error){
      alert("Something went wrong!")
      console.log(error);
    }

    
      
      
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(title.length===0){
        alert("Title is required")
        return
    }
    else if(description.length===0){
        alert("Description is required")
        return
    }
    else if(image.length===0){
        alert("Image is required")
        return
    }
    else if(location.length===0){
        alert("location is required")
        return
    }


    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('location', location);
    formData.append('username', user.name);
    formData.append('user_image', user.img);
    console.log(formData)
    try {
      console.log(formData);
      await axios.post(' https://douvledorm.com/posts', formData);
      alert('Post created successfully!');
      navigate('/pin_board');
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };


  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center">
        <div className="mb-4 w-full">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
            Image Upload
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleRecommendation}
        >
          AI Recommendation
        </button>
        {typing ? <p>Thinking... (It will take a few minutes)</p> : null }
        {recommendations && <p>{recommendations}</p>}
    </div>
  )
}

export default CreatePost