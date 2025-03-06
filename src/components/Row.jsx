// components/Row.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [scrollX, setScrollX] = useState(0);
  
  useEffect(() => {
    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
      })
      .catch(err => console.error(err));
  }, [fetchUrl]);

  const slideLeft = () => {
    const slider = document.getElementById('slider-' + title.replace(/\s+/g, ''));
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const scroll = Math.max(scrollX - 500, 0);
    slider.scrollTo({ left: scroll, behavior: 'smooth' });
    setScrollX(scroll);
  };

  const slideRight = () => {
    const slider = document.getElementById('slider-' + title.replace(/\s+/g, ''));
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const scroll = Math.min(scrollX + 500, maxScroll);
    slider.scrollTo({ left: scroll, behavior: 'smooth' });
    setScrollX(scroll);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="relative group">
        <div 
          className="absolute left-0 top-0 bottom-0 z-40 flex items-center opacity-0 group-hover:opacity-100 transition duration-300"
          onClick={slideLeft}
        >
          <button className="bg-black/80 p-2 rounded-full hover:bg-black">
            <ChevronLeftIcon size={30} />
          </button>
        </div>
        
        <div 
          id={`slider-${title.replace(/\s+/g, '')}`}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {movies.map(movie => (
            <Link 
              to={`/${movie.media_type || (title.includes('TV') ? 'tv' : 'movie')}/${movie.id}`} 
              key={movie.id}
              className="min-w-[180px] h-64 relative rounded-md overflow-hidden transition duration-300 transform hover:scale-110 hover:z-10"
            >
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title || movie.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full p-2 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition duration-300">
                <h3 className="text-sm font-semibold">{movie.title || movie.name}</h3>
                <p className="text-xs text-gray-300">{movie.vote_average.toFixed(1)} ★</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div 
          className="absolute right-0 top-0 bottom-0 z-40 flex items-center opacity-0 group-hover:opacity-100 transition duration-300"
          onClick={slideRight}
        >
          <button className="bg-black/80 p-2 rounded-full hover:bg-black">
            <ChevronRightIcon size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};
