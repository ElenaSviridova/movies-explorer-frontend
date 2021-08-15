// import React, { useState } from 'react';
import Main from '../Main/Main';
// import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import './App.css';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
// import NotFoundError from '../NotFoundError/NotFoundError';
import { Route, Switch } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';

// import Preloader from '../Preloader/Preloader';
// import SavedMovies from '../SavedMovies/SavedMovies';

function App() {


  return (
    <div className="page">
      <Switch>
      <Route exact path="/">
        <Main/>
      </Route>
      <Route path="/movies">
        <Movies/>
      </Route>
      <Route path="/saved-movies">
        <SavedMovies/>
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/signin">
        <Login/>
      </Route>
      <Route path="/signup">
        <Register/>
      </Route>
      </Switch>
      {/* <Movies/> */}
      {/* <Login/>
      <Register/>
      <Profile/>
      <NotFoundError/> */}
      {/* <SavedMovies/> */}
      {/* <Preloader/> */}
    </div>
  );
}

export default App;
