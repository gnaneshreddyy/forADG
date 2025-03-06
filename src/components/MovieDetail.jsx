// components/MovieDetail.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PlayIcon, BookmarkIcon, StarIcon, XIcon } from 'lucide-react';
import { BookmarksContext } from '../context/BookmarksContext';

const MovieDetail = ({ apiKey, type }) => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked } = useContext(BookmarksContext);
  
  useEffect(() => {
    // Fetch movie or TV show details
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setDetails(data);
      })
      .catch(err => console.error(err));
    
    // Fetch cast
    fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setCast(data.cast.slice(0, 10));
      })
      .catch(err => console.error(err));
    
    // Fetch trailers
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const trailers = data.results.filter(video => 
          video.type === 'Trailer' || video.type === 'Teaser'
        );
        if (trailers.length > 0) {
          setTrailer(trailers[0]);
        }
      })
      .catch(err => console.error(err));
  }, [id, apiKey, type]);

  if (!details) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const handleBookmark = () => {
    const isAlreadyBookmarked = isBookmarked(id, type);
    
    if (isAlreadyBookmarked) {
      removeBookmark(id);
    } else {
      addBookmark({
        id,
        mediaType: type,
        title: details.title || details.name,
        poster_path: details.poster_path
      });
    }
  };

  return (
    <>
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div className="absolute w-full h-screen">
          <img 
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            alt={details.title || details.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative pt-32 px-4 md:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="md:w-1/3 lg:w-1/4">
              <img 
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                alt={details.title || details.name}
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            
            {/* Details */}
            <div className="md:w-2/3 lg:w-3/4">
              <h1 className="text-4xl font-bold">{details.title || details.name}</h1>
              
              <div className="flex items-center mt-2 space-x-4">
                <p className="text-gray-300">{new Date(details.release_date || details.first_air_date).getFullYear()}</p>
                <div className="flex items-center">
                  <StarIcon size={16} className="text-yellow-500 mr-1" />
                  <p>{details.vote_average.toFixed(1)}</p>
                </div>
                <p className="text-gray-300">{details.runtime ? `${details.runtime} min` : `${details.episode_run_time?.[0] || '–'} min / episode`}</p>
              </div>
              
              <p className="mt-6 text-lg text-gray-300">{details.overview}</p>
              
              <div className="mt-6 flex space-x-4">
                {trailer && (
                  <button 
                    onClick={() => setShowTrailer(true)}
                    className="bg-white text-black px-6 py-2 rounded flex items-center hover:bg-gray-300 transition"
                  >
                    <PlayIcon size={20} className="mr-2" />
                    Play Trailer
                  </button>
                )}
                
                <button 
                  onClick={handleBookmark}
                  className={`px-6 py-2 rounded flex items-center transition ${
                    isBookmarked(id, type) 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-700 text-white hover:bg-gray-800'
                  }`}
                >
                  <BookmarkIcon size={20} className="mr-2" />
                  {isBookmarked(id, type) ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>
              
              {/* Genres */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {details.genres.map(genre => (
                    <span key={genre.id} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Cast */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <div className="flex gap-4 overflow-x-scroll scrollbar-hide pb-4">
                  {cast.map(person => (
                    <div key={person.id} className="min-w-[120px]">
                      <img 
                        src={person.profile_path 
                          ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                          : '/placeholder-person.jpg'
                        }
                        alt={person.name}
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <p className="text-sm font-medium mt-1">{person.name}</p>
                      <p className="text-xs text-gray-400">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center">
          <div className="relative w-full max-w-5xl aspect-video">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white"
            >
              <XIcon size={24} />
            </button>
            <iframe
              title="trailer"
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};