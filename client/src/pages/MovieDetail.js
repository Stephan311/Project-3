import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import axios from 'axios';
import '../css/search.css'
import Auth from '../utils/auth';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';

// new lines
// Import the `useMutation()` hook from Apollo Client
import { useMutation } from '@apollo/client';
// Import the GraphQL mutation
import { SAVE_MOVIE } from '../utils/mutations';
// new lines end

const MovieDetail = () => {
  // create state for holding returned google api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
 // const [searchInput, setSearchInput] = useState('');
  const [movie, setMovie] = useState('');
  // create state to hold saved MovieId values
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());
  //new lines
  // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_PROFILE mutation
  const [saveMovie] = useMutation(SAVE_MOVIE);
  // new lines en
  // set up useEffect hook to save `savedMovieIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
 /* useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });*/
  //const { movieId } = this.props.match.params;
  const params = useParams();

  // create method to search for Movies and set state on form submit
  //const handleFormSubmit = async (movie_id) => {
  /*const handleGet = async () => {
    //e.preventDefault();
    if (!searchInput) {
      return false;
    }
    try {
      const response = await searchMovieDetail(searchInput);
      //const response = fetch(`http://www.omdbapi.com/?apikey=f3511f7c&type=movie&i=${searchInput}`);
      if (!response.ok) {
        throw new Error('oh crap')
      }
      movie = await response.json();
      //console.log(movie);
      setSearchedMovies(movie);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };*/
 
  useEffect(()=> {
    
    axios.get(`https://www.omdbapi.com/?apikey=f3511f7c&type=movie&i=${params.movieId}`)
    .then(res => {
       // console.log("resp : " + res.data)
        setMovie(res.data);
        //console.log(movie);
       // setSearchedMovies(res.data)
        setSearchedMovies(movie)
    })
    .catch(err =>{
        console.log(err)
    })
    saveMovieIds(savedMovieIds);
}, [params.movieId])

  // create function to handle saving a Movie to our database
  const handleSaveMovie = async (movieId) => {
    // find the movie in `searchedMovies` state by the matching id
    //const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
    const movieToSave = {movieId:movieId, type: movie.Type, title:movie.Title, image:movie.Poster, year:movie.Year }
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    
        try {
          //const response = await saveMovie(movieToSave, token);
          const { data } = await saveMovie({
            variables:{ movieData: {...movieToSave} },
          });
          if (!data) {
            throw new Error('something went wrong!');
          }
          // if movie successfully saves to user's account, save movie id to state
          setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
        } catch (err) {
          console.error(err);
        }
  };
  
  return (
    <>

      <Container className="moviec">
        <h2 className="title">
          {movie.Title}
        </h2>
        <CardColumns>

          <Card  className="movimg" key={movie.imdbID} border='dark' style={{ width: '40rem' }}>
            {movie.Poster ? (
              <Card.Img src={movie.Poster} alt={`The cover for ${movie.Title}`} variant='top' />
            ) : null}
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <p className='small'>Plot: {movie.Plot}</p>
              <p>Genres: {movie.Genre}</p>
              <p>Language: {movie.Language}, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Runtime : {movie.Runtime}</p>
              <p >Rated: {movie.Rated},   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      Year : {movie.Year}</p>
              <Card.Text>Release Date : {movie.Released}</Card.Text>
              <p>Actors: {movie.Actors}</p>
              <p>Director: {movie.Director}</p>
              <p>Writerr: {movie.Writer}</p>
              <p>Production: {movie.Production}</p>
              {Auth.loggedIn() && (
                <Button
                  disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.imdbID)}
                  className='btn-block btn-info'
                  onClick={() => handleSaveMovie(movie.imdbID)}>
                  {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.imdbID)
                    ? 'This movie has already been saved!'
                    : 'Save this movie!'}
                </Button>
              )}
            </Card.Body>
          </Card>

        </CardColumns>

      </Container>
    </>
  );
};

export default MovieDetail;
