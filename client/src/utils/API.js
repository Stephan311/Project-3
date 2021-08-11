import axios from 'axios';
const BASEURL = process.env.REACT_APP_BASEURL_TITLE;
const BASEURLID = process.env.REACT_APP_BASEURL_ID;
const BASEURLSTRING = process.env.REACT_APP_BASEURL_STRING;

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save book data for a logged in user
export const saveBook = (bookData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};


export const searchMovies = (query) => {
  return fetch(`https://www.omdbapi.com/?apikey=f3511f7c&type=movie&s=${query}`);
};
export const searchMovieDetail = (query) => {
  return fetch(`https://www.omdbapi.com/?apikey=f3511f7c&type=movie&i=${query}`);
};
