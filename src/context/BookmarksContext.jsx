// context/BookmarksContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const BookmarksContext = createContext();

const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem('movieVaultBookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  useEffect(() => {
    localStorage.setItem('movieVaultBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (item) => {
    setBookmarks(prev => [...prev, item]);
  };

  const removeBookmark = (id) => {
    setBookmarks(prev => prev.filter(item => item.id !== id));
  };

  const isBookmarked = (id, type) => {
    return bookmarks.some(item => item.id === id && item.mediaType === type);
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksProvider;
