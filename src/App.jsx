/* MovieVault React App Structure (App.jsx)
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieList from './components/MovieList';
import TVShowList from './components/TVShowList';
import SearchResults from './components/SearchResults';
import MovieDetail from './components/MovieDetail';
import TVShowDetail from './components/TVShowDetail';
import Bookmarks from './components/Bookmarks';
import Footer from './components/Footer';
import Totest from './components/Totest'; 

const API_KEY = "690511732eb22607936680ec14479359"; // Replace with your TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTVShow, setSelectedTVShow] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem('movieVaultBookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    fetchTrendingMovies();
    fetchTrendingTVShows();
  }, []);

  useEffect(() => {
    localStorage.setItem('movieVaultBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
      const data = await response.json();
      setTrendingMovies(data.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const fetchTrendingTVShows = async () => {
    try {
      const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
      const data = await response.json();
      setTrendingTVShows(data.results);
    } catch (error) {
      console.error("Error fetching trending TV shows:", error);
    }
  };

  const searchContent = async (query, type = 'multi') => {
    if (!query) {
      setIsSearching(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.results);
      setIsSearching(true);
      setSelectedMovie(null);
      setSelectedTVShow(null);
    } catch (error) {
      console.error("Error searching content:", error);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`);
      const data = await response.json();
      setSelectedMovie(data);
      setSelectedTVShow(null);
      setIsSearching(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchTVShowDetails = async (tvId) => {
    try {
      const response = await fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&append_to_response=videos,credits`);
      const data = await response.json();
      setSelectedTVShow(data);
      setSelectedMovie(null);
      setIsSearching(false);
    } catch (error) {
      console.error("Error fetching TV show details:", error);
    }
  };

  const addToBookmarks = (item) => {
    const existingBookmark = bookmarks.find(bookmark => 
      bookmark.id === item.id && bookmark.media_type === item.media_type
    );

    if (!existingBookmark) {
      setBookmarks([...bookmarks, item]);
    }
  };

  const removeFromBookmarks = (item) => {
    setBookmarks(bookmarks.filter(bookmark => 
      !(bookmark.id === item.id && bookmark.media_type === item.media_type)
    ));
  };

  const isBookmarked = (item) => {
    return bookmarks.some(bookmark => 
      bookmark.id === item.id && bookmark.media_type === item.media_type
    );
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    setSelectedMovie(null);
    setSelectedTVShow(null);
    setIsSearching(false);
  };

  return (
    <div className="app">
      <Navbar 
        onSearch={searchContent} 
        onNavigate={handleNavigate}
        activeTab={activeTab}
      />
      
      {activeTab === 'home' && !selectedMovie && !selectedTVShow && !isSearching && (
        <>
          <Hero 
            featuredContent={trendingMovies[0] || trendingTVShows[0]} 
            onSelectMovie={fetchMovieDetails}
            onSelectTVShow={fetchTVShowDetails}
          />
          <MovieList 
            movies={trendingMovies} 
            onSelectMovie={fetchMovieDetails}
            addToBookmarks={addToBookmarks}
            removeFromBookmarks={removeFromBookmarks}
            isBookmarked={isBookmarked}
          />
          <TVShowList 
            tvShows={trendingTVShows} 
            onSelectTVShow={fetchTVShowDetails}
            addToBookmarks={addToBookmarks}
            removeFromBookmarks={removeFromBookmarks}
            isBookmarked={isBookmarked}
          />
        </>
      )}

      {isSearching && (
        <SearchResults 
          results={searchResults} 
          onSelectMovie={fetchMovieDetails}
          onSelectTVShow={fetchTVShowDetails}
          addToBookmarks={addToBookmarks}
          removeFromBookmarks={removeFromBookmarks}
          isBookmarked={isBookmarked}
        />
      )}

      {selectedMovie && (
        <MovieDetail 
          movie={selectedMovie} 
          addToBookmarks={addToBookmarks}
          removeFromBookmarks={removeFromBookmarks}
          isBookmarked={isBookmarked({ ...selectedMovie, media_type: 'movie' })}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {selectedTVShow && (
        <TVShowDetail 
          tvShow={selectedTVShow} 
          addToBookmarks={addToBookmarks}
          removeFromBookmarks={removeFromBookmarks}
          isBookmarked={isBookmarked({ ...selectedTVShow, media_type: 'tv' })}
          onClose={() => setSelectedTVShow(null)}
        />
      )}

      {activeTab === 'bookmarks' && (
        <Bookmarks 
          bookmarks={bookmarks} 
          onSelectMovie={fetchMovieDetails}
          onSelectTVShow={fetchTVShowDetails}
          removeFromBookmarks={removeFromBookmarks}
        />
      )}

      <Footer />
      <Totest/>
    </div>
  );
}

export default App;
*/




// App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Row from './components/Row';
import MovieDetail from './components/MovieDetail';
import BookmarksPage from './pages/BookmarksPage';
import SearchPage from './pages/SearchPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookmarksProvider from './context/BookmarksContext';

const App = () => {
  const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual TMDB API key
  
  return (
    <BookmarksProvider>
      <Router>
        <div className="bg-black text-white min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <main>
                <Hero apiKey={API_KEY} />
                <Row title="Trending Movies" fetchUrl={`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`} />
                <Row title="Popular TV Shows" fetchUrl={`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`} />
                <Row title="Top Rated Movies" fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`} />
                <Row title="Upcoming Releases" fetchUrl={`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`} />
                <Row title="Action Movies" fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`} />
                <Row title="Comedy Movies" fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`} />
              </main>
            } />
            <Route path="/movie/:id" element={<MovieDetail apiKey={API_KEY} type="movie" />} />
            <Route path="/tv/:id" element={<MovieDetail apiKey={API_KEY} type="tv" />} />
            <Route path="/bookmarks" element={<BookmarksPage apiKey={API_KEY} />} />
            <Route path="/search" element={<SearchPage apiKey={API_KEY} />} />
          </Routes>
        </div>
      </Router>
    </BookmarksProvider>
  );
};

export default App;