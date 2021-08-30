import React, { useState, useEffect } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import './App.css';
import Register from '../Register/Register';
import NotFoundError from '../NotFoundError/NotFoundError';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import { Route, Switch, useHistory } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import ProtectedRoute from '../ProtectedRoute';



function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [movieSearchQuery, setMovieSearchQuery] = useState(''); //фильм введенный в поисковую строку
  const [movies, setMovies] = useState([]);
  const [searchError, setSearchError] = useState('');//state переменная, если запрос не дал результатов
  const [search, setSearch] = useState(false); //осуществление поиска
  const [isLoading, setIsLoading] = useState(false); //загрузка прелоадера
  const [moviesToShow, setMoviesToShow] = useState([]);//карточки, которые нужно отобразить до кнопки Ещё
  const [addLoadMoreButton, setAddLoadMoreButton] = useState(false);// добавляет кнопку ещё
  // const [selectedMoviesCard, setSelectedMoviesCard] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  // const [email, setEmail] = useState('');
  const [moviesCountIndex, setMoviesCountIndex] = useState(3);
  const history = useHistory();

  const handleError = (error) => console.error(error); 
  
  console.log(movies)
  function filterMovie(movie, query) {
    const regexp = new RegExp(query, "gi");
    return movie.nameRU.match(regexp);
  }

  useEffect(() => {
    if(loggedIn) {
        Promise.all([mainApi.getSavedMovies(), mainApi.getProfileInfo()])
        .then(([data, userData]) => {
            setCurrentUser(userData);
            setSavedMovies(data);
            console.log('initialSavedMovies:',data)
        })
        .catch(handleError)
    }  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [loggedIn]);

useEffect(() => {
  checkToken()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

useEffect(() => {
  if(loggedIn) {
      history.push('/movies')
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [loggedIn])

function checkToken() {
  const token = localStorage.getItem('token')
  if (token) {
      auth.getContent(token)
      .then(res => {
          // setEmail(res.email)
          setLoggedIn(true)
      })
      .catch(handleError)
  }
}

  function checkSearch() {
    console.log('kuku')
    if (movies.length === 0) {
      setSearchError('Ничего не найдено');
    }
  }
//отрисовка карточек
  useEffect(() => {
    if(search) {
      checkSearch();
      changeMoviesCardList();
      // localStorage.setItem('filteredMovies',JSON.stringify(filteredMovies));
    } 
     
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [search, moviesCountIndex, savedMovies])


//добавляем кнопку ещё и, в зависимости от размера экрана количетсво карточек
function changeMoviesCardList() {
  if (movies.length < moviesCountIndex) {
    setAddLoadMoreButton(false);
    console.log(movies.length, moviesCountIndex)
  } 
  else {
    setAddLoadMoreButton(true);
  }
  
  setMoviesToShow(movies.slice(0, moviesCountIndex));
  // setSavedMovies(movies.slice(0, moviesCountIndex));


}

//клик по кнопке "Ещё"
function handleLoadMoreButtonClick() {
  if (document.documentElement.clientWidth > 1280) {
    setMoviesCountIndex(moviesCountIndex + 3)
  }
  else if ((document.documentElement.clientWidth > 320) && (document.documentElement.clientWidth < 1280)) {
    setMoviesCountIndex(moviesCountIndex + 2)
  }
  // setMoviesToShow(movies.slice(0, moviesCountIndex));
}

function setFistMoviesCountIndex() {
  if (document.documentElement.clientWidth > 1280) {
    setMoviesCountIndex(12)
  }
  if ((document.documentElement.clientWidth > 320)&&(document.documentElement.clientWidth <= 480)) {
    setMoviesCountIndex(5)
  }
  else if ((document.documentElement.clientWidth > 480) && (document.documentElement.clientWidth <= 768)) {
    setMoviesCountIndex(8)
  }
}


//сабмит кнопи search
  function handleSearchSubmit(e) {
    setFistMoviesCountIndex();
    setSearchError('');
    setMoviesToShow([]);
    setIsLoading(true);
    setSearch(false);
      moviesApi.getMovies()
       .then((data) => {
         setIsLoading(false);
         const filteredMovies = data.filter(movie => filterMovie(movie, movieSearchQuery));
         console.log('dadad',filteredMovies)
         filteredMovies.map((m) => {
           m.thumbnail = 'https://api.nomoreparties.co'+ m.image.formats.thumbnail.url;
           m.image ='https://api.nomoreparties.co' + m.image.url;
           m.trailer = m.trailerLink;
           m.movieId = m.id
          });
         setMovies(filteredMovies);
         setSearch(true); 

       })
       .catch((error) => {
         console.log(error)
         setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
         setIsLoading(false)
       });
}

  //функция которая слушет запрос на поиск
  function handleMovieInput(e) {
    setMovieSearchQuery(e.target.value);
  }

//по клику на кнопку сохранить происходит запрос на сохранение или удаление карточки из списка сохраненных
  function handleSaveMovieButtonClick(movie) {
    const isSaved = savedMovies.some(m => m.movieId === movie.movieId);
    // const movie_id_to_delete = savedMovies.find(m => {
    //   if (m.movieId === movie.movieId) {
    //     return movie._id
    //   }
    // })
    console.log("issaved ", isSaved)
    // console.log("m.movieId ", m.movieId)
    console.log("movie.movieId ", movie.id)
    
    if (!isSaved) {
      mainApi.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie])
        // setMoviesToShow((state) => state.map((m) => m.movieId !== movie.movieId ? m : newMovie))
        console.log('newMovie',newMovie)
        console.log('afterAdd',savedMovies)
        console.log("movie._id ", movie._id)
      })
      .catch(handleError) 
    } else {
      // mainApi.get_id(movie.movieID)
      const movie_to_delete = savedMovies.find((m) => (m.movieId === movie.movieId))
      mainApi.removeMovie(movie_to_delete._id)
      .then((deletedMovie) => {
        console.log('movie to delete',deletedMovie)
        // setSavedMovies((state) => state.filter((m) => ((m._id !== movie._id)) || (m._id !== movie_to_delete._id)));
        // setSavedMovies((state) => state.filter((m) => (m._id !== movie._id)));
        setSavedMovies((state) => state.filter((m) => (m._id !== movie_to_delete._id)));
         console.log('afterDelete',savedMovies)
      })
        .catch(handleError)
    }
    
     
  // if (selectedMoviesCard === true) {
  //   mainApi.removeMovie(movie.id)
  //   .then(() => {
  //     // setSelectedMoviesCard(false);
      
  //   })
  //   .catch(handleError)
  // }
  
  }


  function handleLogin({email, password}) {
    auth.authorize(email, password)
    .then(data => {
        const {token} = data; 
        localStorage.setItem('token', token);
        setLoggedIn(true);
        // setEmail(email);
    })
    .catch(handleError)
}

function handleLogout() {
    // setEmail('');
    setLoggedIn(false);
    localStorage.removeItem('token');
}

function handleRegister({userName, email, password}) {
    auth.register(userName, email, password)
    .then((res) => {
        console.log(res)
    })
    .catch(handleError);
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
          <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          {/* <Route path="/movies">
            <Movies onMovieSearch={handleSearchSubmit} onSearchInput={handleMovieInput} movies={moviesToShow} notFoundText={searchError} isLoading={isLoading} onSaveMovieButtonClick={handleSaveMovieButtonClick} addButton={addLoadMoreButton} selectedMoviesCard={selectedMoviesCard} onHadleLoadMoreButtonClick={handleLoadMoreButtonClick}/>
          </Route>
          <Route path="/saved-movies">
            <SavedMovies movies={getSavedMovies} notFoundText={searchError} isLoading={isLoading} onSaveMovieButtonClick={handleSaveMovieButtonClick} addButton={addLoadMoreButton}/>
          </Route> */}
          <ProtectedRoute path="/movies" loggedIn={loggedIn} component={Movies} savedMovies={savedMovies} onMovieSearch={handleSearchSubmit} onSearchInput={handleMovieInput} movies={moviesToShow} notFoundText={searchError} isLoading={isLoading} onSaveMovieButtonClick={handleSaveMovieButtonClick} addButton={addLoadMoreButton} savedMovies={savedMovies} onHadleLoadMoreButtonClick={handleLoadMoreButtonClick}/>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} component={SavedMovies} movies={savedMovies} savedMovies={savedMovies} notFoundText={searchError} isLoading={isLoading} onSaveMovieButtonClick={handleSaveMovieButtonClick} addButton={addLoadMoreButton} onHadleLoadMoreButtonClick={handleLoadMoreButtonClick}/>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin}/>
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister}/>
          </Route>
          <Route path="*">
            <NotFoundError />
          </Route>
          </Switch>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
