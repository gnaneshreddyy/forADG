// BookmarksPage.jsx
import React, { useContext } from 'react';
import { BookmarksContext } from './context/BookmarksContext';
import { Link } from 'react-router-dom';

const BookmarksPage = ({ apiKey }) => {
  const { bookmarks } = useContext(BookmarksContext);
  
  return (
    <div className="pt-20 px-4 md:px-8 lg:px-16">
      <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <p className="text-gray-400">You haven't bookmarked any movies or TV shows yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {bookmarks.map((item) => (
            <Link to={`/${item.mediaType}/${item.id}`} key={item.id}>
              <div className="relative h-64 rounded-md overflow-hidden group transition duration-300 transform hover:scale-105">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
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
    </div>
  );
};
