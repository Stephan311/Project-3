import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import '../css/search.css'
import Auth from '../utils/auth';
import { searchMovies } from '../utils/API';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_MOVIE } from '../utils/mutations';


const SearchMovies = () => {
  // create state for holding returned google api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  const [searchedInput, setSearchedInput] = useState('');
  // create state to hold saved MovieId values
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_PROFILE mutation
  const [saveMovie] = useMutation(SAVE_MOVIE);

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  // create method to search for Movies and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {

      const response = await searchMovies(searchInput)

      if (!response.ok) {
        throw new Error('oh crap')
      }

      const { Search } = await response.json();   // "Search" is the inner object inside the returned respobse object

      const movieData = Search.map((movie) => ({
        movieId: movie.imdbID,
        type: movie.Type,
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster,
      }));

      console.log(movieData)

      setSearchedMovies(movieData);
      setSearchedInput(searchInput)

    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a Movie to our database
  const handleSaveMovie = async (movieId) => {
    // find the movie in `searchedMovies` state by the matching id
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveMovie({
        variables: { movieData: { ...movieToSave } },
      });

      if (!data) {
        throw new Error('something went wrong while saving movie!');
      }
      // if movie successfully saves to user's account, save movie id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="carousel-slide">
        <Carousel className="viewed-imgs">
          <Carousel.Item className="item">
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450_1280.jpg"
              alt="First slide"
            />
            <Container>
              <Carousel.Caption className="caption">
                <h1>Movie Mania</h1>
                <p>Entertainment Unplugged...</p>
              </Carousel.Caption>

            </Container>

          </Carousel.Item>

          <Carousel.Item className="item">
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2016/04/14/13/06/landscape-1328858_1280.jpg"
              alt="Second slide"
            />

            <Container>
              <Carousel.Caption className="caption">
                <h1>Movie Mania</h1>
                <p>Rediscover entertainment in a new dimension</p>
              </Carousel.Caption>
            </Container>

          </Carousel.Item>

          <Carousel.Item className="item">
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2017/09/04/09/37/cinema-strip-2713352_1280.jpg"
              alt="Third slide"
            />

            <Container>
              <Carousel.Caption className="caption">
                <h1>Movie Mania</h1>
                <p>Entertainment at your doorstep</p>
              </Carousel.Caption>
            </Container>

          </Carousel.Item>

          <Carousel.Item className="item">
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2017/09/04/09/37/cinema-strip-2713352_1280.jpg"
              alt="Fourth slide"
            />

            <Container>
              <Carousel.Caption className="caption">
                <h1>Movie Mania</h1>
                <p>Entertainment at your doorstep</p>
              </Carousel.Caption>
            </Container>

          </Carousel.Item>



        </Carousel>
        <Container className="searchform">
          <Form onSubmit={handleFormSubmit}>
            <h3>{searchedMovies.length
              ? `Viewing ${searchedMovies.length} results for ${searchedInput}`
              : 'Search for a movie to begin...'}
            </h3>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a movie'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='info' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>


      </div>

      <Container>
        <CardColumns>
          {searchedMovies.map((movie) => {
            return (
              <Card className="card" key={movie.movieId} border='dark'>
                {movie.image ? (
                  <Card.Img className="image" src={movie.image} alt={`The cover for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title className="movietitle">{movie.title}</Card.Title>
                  <p className='small'>  Year : {movie.year}</p>

                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'This movie has already been saved!'
                        : 'Save this movie!'}
                    </Button>
                  )}

                </Card.Body>
                <Button className="readmorebtn">
                  <Link className="link" to={{ pathname: `/detail/${movie.movieId}` }} >Read More</Link>
                </Button>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchMovies;
