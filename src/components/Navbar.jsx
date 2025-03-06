// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon, BookmarkIcon, HomeIcon } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className={`fixed w-full z-50 px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}`}>
      <div className="flex items-center">
        <Link to="/" className="text-red-600 font-bold text-3xl mr-8">MovieVault</Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
          <Link to="/search?query=movie" className="text-gray-300 hover:text-white transition">Movies</Link>
          <Link to="/search?query=tv" className="text-gray-300 hover:text-white transition">TV Shows</Link>
          <Link to="/bookmarks" className="text-gray-300 hover:text-white transition">My List</Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-full w-32 md:w-64 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button type="submit" className="absolute right-3 top-2.5">
            <SearchIcon size={18} className="text-gray-400" />
          </button>
        </form>
        <div className="md:hidden flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            <HomeIcon size={24} />
          </Link>
          <Link to="/bookmarks" className="text-gray-300 hover:text-white">
            <BookmarkIcon size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
};
