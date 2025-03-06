// components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, InfoIcon } from 'lucide-react';

const Hero = ({ apiKey }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        // Get a random movie from the trending list
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setMovie(data.results[randomIndex]);
      })
      .catch(err => console.error(err));
  }, [apiKey]);

  if (!movie) return <div className="h-screen"></div>;

  return (
    <div className="relative h-screen w-full">
      <div className="absolute w-full h-full">
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      <div className="relative pt-48 px-4 md:px-8 lg:px-16 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold max-w-2xl">{movie.title || movie.name}</h1>
        <p className="text-lg mt-4 max-w-xl text-gray-300">{movie.overview.substring(0, 150)}...</p>
        <div className="flex space-x-4 mt-6">
          <Link to={`/${movie.media_type}/${movie.id}`} className="bg-white text-black px-6 py-2 rounded flex items-center hover:bg-gray-300 transition">
            <PlayIcon size={20} className="mr-2" />
            Play
          </Link>
          <Link to={`/${movie.media_type}/${movie.id}`} className="bg-gray-600 text-white px-6 py-2 rounded flex items-center hover:bg-gray-700 transition">
            <InfoIcon size={20} className="mr-2" />
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
};