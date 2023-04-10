import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const CreatePost = () => {
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState('');

  const handleRecommendation = async (e) => {
    e.preventDefault();
   if(location.length===0){
      alert("location is required")
      return
  }
    const prompt = `What places do you recommend for me to go in/around ${location}?`;
    
    const response = await openai.createCompletion()({
      model: "text-davinci-003",
      prompt: prompt,
    }) 
      console.log(response.data.choices[0].text);
      setRecommendations(response.data.choices[0].text);
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
    console.log(formData)
    try {
      console.log(formData);
      await axios.post('http://localhost:5000/posts', formData);
      alert('Post created successfully!');
      navigate('/pin_board');
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };
  useEffect(() => {
    console.log({ title, description, image, location });
  }, [title, description, image, location]);

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
        {recommendations && <p>{recommendations}</p>}
    </div>
  )
}

export default CreatePost