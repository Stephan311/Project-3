import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_MOVIE } from '../utils/mutations';
import { WATCHED_MOVIE } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';

const SavedMovies = () => {

  const [removeMovie] = useMutation(REMOVE_MOVIE);
  const [watchedMovie] = useMutation(WATCHED_MOVIE);

  const { loading, data } = useQuery(GET_ME);
  console.log(data)
  const userData = data?.myMovies.savedMovies || []
  console.log(userData);

  // create function that accepts the movie's mongo _id value as param and deletes the movie from the database
  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { loading, data } = await removeMovie({
        variables: { movieId }, token
      });
      const updatedUser = data?.data || [];

      // upon success, remove movie's id from localStorage
      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };
  const handleWatchedMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { loading, data } = await watchedMovie({
        variables: { movieId }, token
      });
      const updatedUser = data?.data || [];
      //setUserData(updatedUser);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Saved Movies</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.length
            ? `You have ${userData.length} saved ${userData.length === 1 ? 'movie' : 'movies'}`
            : 'You have no saved movies!'}
        </h2>
        <CardColumns>
          {userData.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p>Year: {movie.year}</p>

                  <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie.movieId)}>
                    Delete this Movie!
                  </Button>
                  <Button className='btn-block btn-danger' onClick={() => handleWatchedMovie(movie.movieId)}>
                    {movie.watched && movie.watched === true
                      ? 'This movie has been marked as watched!'
                      : 'Mark as Watched!'}
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedMovies;
