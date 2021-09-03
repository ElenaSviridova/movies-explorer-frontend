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
import { filterData } from '../Filtering';
import { BASE_URL } from '../../config';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [movieSearchQuery, setMovieSearchQuery] = useState(''); //фильм введенный в поисковую строку
  const [movies, setMovies] = useState([]);
  const [searchError, setSearchError] = useState('');//state переменная, если запрос не дал результатов
  const [isLoading, setIsLoading] = useState(false); //загрузка прелоадера
  const [moviesToShow, setMoviesToShow] = useState([]);//карточки, которые нужно отобразить до кнопки Ещё
  const [addLoadMoreButton, setAddLoadMoreButton] = useState(false);// добавляет кнопку ещё
  const [loggedIn, setLoggedIn] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesCountIndex, setMoviesCountIndex] = useState(12);
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([]);
  const [checkbox, setCheckbox] = useState({checked: true});

  const history = useHistory();

  const handleError = (error) => console.error(error); 
  const mainApi = new Api({adress: BASE_URL, token: localStorage.getItem('token')});

  useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function checkToken() {
    const token = localStorage.getItem('token')
    if (token) {
        auth.getContent(token)
        .then((data) => {
            setCurrentUser(data)
            setLoggedIn(true);
            setMovies(JSON.parse(localStorage.getItem('filteredMovies')));
        })
        .catch(handleError)
    }
  }

  useEffect(() => {
    if(loggedIn) {
      history.push('/movies')
        Promise.all([mainApi.getSavedMovies(), mainApi.getProfileInfo()])
        .then(([data, userData]) => {
            setCurrentUser(userData);
            setSavedMovies(data);
        })
        .catch(handleError)
    }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

//поиск карточек
useEffect(() => {
  if (movies.length !== 0) {
    checkForEmpty(filterData(movies, checkbox.checked, movieSearchQuery));
    displayMoviesAndButton(filterData(movies, checkbox.checked, movieSearchQuery));
    checkForEmpty(filterData(savedMovies, checkbox.checked, movieSearchQuery));
    setSavedFilteredMovies(filterData(savedMovies, checkbox.checked, movieSearchQuery));
   } 
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [checkbox])

//  отрисовка карточек
useEffect(() => {
  displayMoviesAndButton(filterData(movies, checkbox.checked, movieSearchQuery));
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [moviesCountIndex])

//отрисовка сохраненных карточек
useEffect(() => {
    setSavedFilteredMovies(filterData(savedMovies, checkbox.checked, movieSearchQuery));
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [savedMovies])

//отрисовка поиска фильмов
useEffect(() => {
  if( movies.length !== 0 ) {
    checkForEmpty(filterData(movies, checkbox.checked, movieSearchQuery));
    displayMoviesAndButton(filterData(movies, checkbox.checked, movieSearchQuery));
    localStorage.setItem('filteredMovies',JSON.stringify(filterData(movies, checkbox.checked, movieSearchQuery))); 
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [movies])

function checkForEmpty(movies) {
  if (movies.length === 0) {
     setSearchError('Ничего не найдено');
  } else {
    setSearchError('');
  }
}

//добавляем кнопку ещё и, в зависимости от размера экрана количетсво карточек
function displayMoviesAndButton(filteredMovies) {
  if (filteredMovies.length < moviesCountIndex) {
    setAddLoadMoreButton(false);
  } 
  else {
    setAddLoadMoreButton(true);
  }
  console.log('in func',moviesCountIndex)
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
function setFirstMoviesCountIndex() {
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

//нажатие кнопки search во вкладке фильмы
function handleSearchSubmit(e) {
  setFirstMoviesCountIndex();
  setSearchError('');
  setMoviesToShow([]);
  setIsLoading(true);
  moviesApi.getMovies()
    .then((data) => {
      setIsLoading(false);
      setMovies(data);
      // eslint-disable-next-line array-callback-return
      data.map((m) => {
        m.thumbnail = 'https://api.nomoreparties.co'+ m.image.formats.thumbnail.url;
        m.image ='https://api.nomoreparties.co' + m.image.url;
        m.trailer = m.trailerLink;
        m.movieId = m.id;
        m.nameEN = m.nameEN ? m.nameEN : m.nameRU;
        m.country = m.country ? m.country : 'нет данных';
      });
    })
    .catch((error) => {
      console.log(error)
      setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      setIsLoading(false)
    });
}

function handleSearchSubmitSavedMovies() {
  setSearchError('');
  setFirstMoviesCountIndex();
  checkForEmpty(filterData(savedMovies, checkbox.checked, movieSearchQuery));
  setSavedFilteredMovies(filterData(savedMovies, checkbox.checked, movieSearchQuery));
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
        setSavedMovies([...savedMovies, newMovie]);
      })
      .catch(handleError) 
    } else {
      const movie_to_delete = savedMovies.find((m) => (m.movieId === movie.movieId))
      mainApi.removeMovie(movie_to_delete._id)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => (m._id !== movie_to_delete._id)));
        setSavedFilteredMovies((state) => state.filter((m) => (m._id !== movie_to_delete._id)));
      })
        .catch(handleError)
    }  
}

function handleLogin({email, password}) {
  auth.authorize(email, password)
  .then(data => {
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
  localStorage.removeItem('filteredMovies');
  history.push('/');
}

function handleRegister({userName, email, password}) {
  auth.register(userName, email, password)
  .then(() => {
    history.push('/');
  })
  .catch(handleError);
}

function handleEditClick(data) {
  const {userName, email} = data;
  mainApi.changeProfileInfo(userName, email)
  .then((res) => {
    console.log('inapp',res)
    setCurrentUser({name: res.name, email: res.email})
  })
  .catch(handleError)
  if (data) {
    alert('информация изменена')
  }
}

function handleCheckBoxClick(event) {
  setCheckbox({ checked: event.target.checked })
}

function handleSavedMoviesLinkClick() {
  setMovieSearchQuery('');
  setSearchError('');
  setCheckbox({checked: true});
}

function handleMoviesLinkClick() {
  setMovieSearchQuery('');
  setSearchError('');
  setCheckbox({checked: true});
}

return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
          <Switch>
            <Route exact path="/">
              <Main loggedIn={loggedIn} 
                onSavedMoviesLinkClick={handleSavedMoviesLinkClick}
                onMoviesLinkClick={handleMoviesLinkClick}/>
            </Route>
            <ProtectedRoute exact path="/movies" loggedIn={loggedIn}
              component={Movies}
              movies={moviesToShow}
              savedMovies={savedMovies} 
              onMovieSearch={handleSearchSubmit} 
              onSearchInput={handleMovieInput}  
              notFoundText={searchError} 
              isLoading={isLoading} 
              onSaveMovieButtonClick={handleSaveMovieButtonClick} 
              addButton={addLoadMoreButton} 
              onHadleLoadMoreButtonClick={handleLoadMoreButtonClick} 
              onCheckBoxClick={handleCheckBoxClick} 
              checkbox={checkbox}
              onSavedMoviesLinkClick={handleSavedMoviesLinkClick}
              onMoviesLinkClick={handleMoviesLinkClick}/>
            <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn} 
              component={SavedMovies} 
              movies={savedFilteredMovies ? savedFilteredMovies : savedMovies} 
              savedMovies={savedMovies}  notFoundText={searchError} 
              isLoading={isLoading} 
              onSaveMovieButtonClick={handleSaveMovieButtonClick} 
              onMovieSearch={handleSearchSubmitSavedMovies} 
              onSearchInput={handleMovieInput} 
              onCheckBoxClick={handleCheckBoxClick} 
              checkbox={checkbox}
              onSavedMoviesLinkClick={handleSavedMoviesLinkClick}
              onMoviesLinkClick={handleMoviesLinkClick}/>
            <ProtectedRoute exact path="/profile" loggedIn={loggedIn} 
              component={Profile} 
              handleAccountClick={handleLogout} 
              onEditClick={handleEditClick}
              onSavedMoviesLinkClick={handleSavedMoviesLinkClick}
              onMoviesLinkClick={handleMoviesLinkClick} />
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
