import React from 'react';
/// new lines next
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// new lines end
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchMovies from './pages/SearchMovies';
import MovieDetail from './pages/MovieDetail';
import SavedMovies from './pages/SavedMovies';
import Navbar from './components/Navbar';
//import  from './pages/HomeView';
import MovieView from './pages/MovieView';
import ShowsView from './pages/ShowsView';
import Dashboard from './pages/Dashboard';

import SearchesPage from './pages/SearchesPage';
// import BottomNav from './components/BottomNav';
import Watched from './pages/Watched';
import Wishlist from './pages/Wishlist';

// new lines next
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// new lines end

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
        <Navbar />
       
        <Switch>


          <Route exact path='/' component={SearchMovies} />
        

          <Route path='/detail/:movieId' component={MovieDetail} />

          <Route path="/" exact>
       
          <Dashboard />
          </Route>

          <Route path="/saved" exact>
          <SavedMovies />
          </Route>


          <Route path="/movies" exact>
          <SearchMovies />
          </Route>

          <Route path="/watched" exact>
          <Watched />
          </Route>

          <Route path="/wishlist" exact>
          <Wishlist />
          </Route>
        </Switch>

        
        {/* <BottomNav/> */}
    </Router>
    </ApolloProvider>
  );
}

export default App;
