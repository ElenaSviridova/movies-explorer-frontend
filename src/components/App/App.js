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
import Api from '../../utils/MainApi';
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
  const [loggedIn, setLoggedIn] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesCountIndex, setMoviesCountIndex] = useState(3);
  const [savedFilteredMovies, setSavedFilteredMovies] = useState(null);
  const [checkbox, setCheckbox] = useState({checked: true});

  const history = useHistory();

  const handleError = (error) => console.error(error); 
  const mainApi = new Api({adress: 'http://localhost:3000', token: localStorage.getItem('token')});

  
  useEffect(() => {
    checkToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(loggedIn) {
        Promise.all([mainApi.getSavedMovies(), mainApi.getProfileInfo()])
        .then(([data, userData]) => {
            setCurrentUser(userData);
            setSavedMovies(data);
        })
        .catch(handleError)
    }  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [loggedIn]);

useEffect(() => {
  if(loggedIn) {
      history.push('/movies')
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [loggedIn])


const filteredMovies = movies.filter(movie => filterMovie(movie, movieSearchQuery));
console.log("filteredMovies xxx", filteredMovies)

//поиск карточек
useEffect(() => {
  if(search) {
    checkForEmpty(filteredMovies);
    changeMoviesCardList(filteredMovies);
    // localStorage.setItem('filteredMovies',JSON.stringify(filteredMovies));
  } 
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [search, checkbox])

//отрисовка карточек
useEffect(() => {
  changeMoviesCardList(filteredMovies);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [moviesCountIndex, savedMovies])

//отрисовка сохраненных карточек
useEffect(() => {
  if(loggedIn) {
    const filteredSavedMovies = savedMovies.filter(movie => filterMovie(movie, movieSearchQuery));
    setSavedFilteredMovies(filteredSavedMovies);
    // localStorage.setItem('filteredMovies',JSON.stringify(filteredMovies));
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [savedMovies])

//отрисовка сохраненных карточек
useEffect(() => {
  if(loggedIn) {
    const filteredSavedMovies = savedMovies.filter(movie => filterMovie(movie, movieSearchQuery));

    checkForEmpty(filteredSavedMovies);
    setSavedFilteredMovies(filteredSavedMovies);
    // localStorage.setItem('filteredMovies',JSON.stringify(filteredMovies));
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [checkbox])

function checkToken() {
  const token = localStorage.getItem('token')
  if (token) {
      auth.getContent(token)
      .then((data) => {
          setCurrentUser(data)
          setLoggedIn(true)
          //load saved movies from local storage
      })
      .catch(handleError)
  }
}
//фильтрем фильмы с помощью регулярного выражения
function filterMovie(movie, query) {
  const regexp = new RegExp(query, "gi");
  if(checkbox.checked === false) {
    return (movie.nameRU.match(regexp)&&movie.duration<40);
  } else {
    return movie.nameRU.match(regexp);
  }
}

function checkForEmpty(movies) {
  if (movies.length === 0) {
     setSearchError('Ничего не найдено');
  } else {
    setSearchError('');
  }
}

//добавляем кнопку ещё и, в зависимости от размера экрана количетсво карточек
function changeMoviesCardList(filteredMovies) {
  if (filteredMovies.length < moviesCountIndex) {
    setAddLoadMoreButton(false);
    console.log(filteredMovies.length, moviesCountIndex)
  } 
  else {
    setAddLoadMoreButton(true);
  }
  setMoviesToShow(filteredMovies.slice(0, moviesCountIndex));
}

//клик по кнопке "Ещё"
function handleLoadMoreButtonClick() {
  if (document.documentElement.clientWidth > 1280) {
    setMoviesCountIndex(moviesCountIndex + 3)
  }
  else if ((document.documentElement.clientWidth > 320) && (document.documentElement.clientWidth < 1280)) {
    setMoviesCountIndex(moviesCountIndex + 2)
  }
}
//начальное положение карточек в зависимости от ширины экрана
function setFistMoviesCountIndex() {
  if (document.documentElement.clientWidth >= 1280) {
    setMoviesCountIndex(12)
  }
  if ((document.documentElement.clientWidth > 320)&&(document.documentElement.clientWidth <= 480)) {
    setMoviesCountIndex(5)
  }
  else if ((document.documentElement.clientWidth > 480) && (document.documentElement.clientWidth <= 768)) {
    setMoviesCountIndex(8)
  }
}

//сабмит кнопки search в вкладке фиьмы
function handleSearchSubmit(e) {
    setFistMoviesCountIndex();
    setSearchError('');
    setMoviesToShow([]);
    setIsLoading(true);
    setSearch(false);
      moviesApi.getMovies()
       .then((data) => {
         setIsLoading(false);
         setMovies(data)
         // eslint-disable-next-line array-callback-return
         data.map((m) => {
           m.thumbnail = 'https://api.nomoreparties.co'+ m.image.formats.thumbnail.url;
           m.image ='https://api.nomoreparties.co' + m.image.url;
           m.trailer = m.trailerLink;
           m.movieId = m.id
          });
         setSearch(true); 

       })
       .catch((error) => {
         console.log(error)
         setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
         setIsLoading(false)
       });
}

function handleSearchSubmitSavedMovies() {
  setSearchError('');
  setFistMoviesCountIndex();
  const filteredSavedMovies = savedMovies.filter(movie => filterMovie(movie, movieSearchQuery));
  checkForEmpty(filteredSavedMovies);
  setSavedFilteredMovies(filteredSavedMovies);
}

  //функция которая слушет запрос на поиск
function handleMovieInput(e) {
    setMovieSearchQuery(e.target.value);
}

//по клику на кнопку сохранить происходит запрос на сохранение или удаление карточки из списка сохраненных
function handleSaveMovieButtonClick(movie) {
    const isSaved = savedMovies.some(m => m.movieId === movie.movieId);
    if (!isSaved) {
      mainApi.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie])
        // setMovieSearchQuery('');
      })
      .catch(handleError) 
    } else {
      const movie_to_delete = savedMovies.find((m) => (m.movieId === movie.movieId))
      mainApi.removeMovie(movie_to_delete._id)
      .then((deletedMovie) => {
        console.log('movie to delete',deletedMovie)
        setSavedMovies((state) => state.filter((m) => (m._id !== movie_to_delete._id)));
        setSavedFilteredMovies((state) => state.filter((m) => (m._id !== movie_to_delete._id)));
      })
        .catch(handleError)
    }
  
}

function handleLogin({email, password}) {
    auth.authorize(email, password)
    .then(data => {
      console.log('handlelogindata',data)
        const {token} = data; 
        localStorage.setItem('token', token);
        setLoggedIn(true);
    })
    .catch(handleError)
}

function handleLogout() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.removeItem('token');
    setSavedMovies({});
    //remove movies from local storage and memory
    history.push('/');
}

function handleRegister({userName, email, password}) {
    auth.register(userName, email, password)
    .then(() => {
      history.push('/signin');
    })
    .catch(handleError);
}

function handleEditClick({name, email}) {
    mainApi.changeProfileInfo(name, email)
    .then((res) => {
      setCurrentUser({name: res.name, email: res.email})
    })
}

function handleCheckBoxClick(event) {
  setCheckbox({ checked: event.target.checked })
}

return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
          <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn}/>
          </Route>
          <ProtectedRoute path="/movies" loggedIn={loggedIn} component={Movies} movies={moviesToShow} savedMovies={savedMovies} onMovieSearch={handleSearchSubmit} onSearchInput={handleMovieInput}  notFoundText={searchError} isLoading={isLoading} onSaveMovieButtonClick={handleSaveMovieButtonClick} addButton={addLoadMoreButton} onHadleLoadMoreButtonClick={handleLoadMoreButtonClick} onCheckBoxClick={handleCheckBoxClick} checkbox={checkbox}/>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} component={SavedMovies} movies={savedFilteredMovies ? savedFilteredMovies : savedMovies} savedMovies={savedMovies}  notFoundText={searchError} isLoading={isLoading} onSaveMovieButtonClick={handleSaveMovieButtonClick} onMovieSearch={handleSearchSubmitSavedMovies} onSearchInput={handleMovieInput} onCheckBoxClick={handleCheckBoxClick} checkbox={checkbox}/>
          <ProtectedRoute path="/profile" loggedIn={loggedIn} component={Profile} handleAccountClick={handleLogout} onEditClick={handleEditClick} />
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
