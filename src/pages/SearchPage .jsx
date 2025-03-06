// SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const SearchPage = ({ apiKey }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`)
        .then(res => res.json())
        .then(data => {
          setResults(data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv'));
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [query, apiKey]);

  return (
    <div className="pt-20 px-4 md:px-8 lg:px-16">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <>
          {results.length === 0 ? (
            <p className="text-gray-400">No results found for "{query}"</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {results.map((item) => (
                <Link to={`/${item.media_type}/${item.id}`} key={item.id}>
                  <div className="relative h-64 rounded-md overflow-hidden group transition duration-300 transform hover:scale-105">
                    <img 
                      src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/placeholder.jpg'} 
                      alt={item.title || item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 w-full p-2 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-sm font-semibold">{item.title || item.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
