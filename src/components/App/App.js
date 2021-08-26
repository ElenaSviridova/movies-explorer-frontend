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
  // const [moviesIsFiltered, setMoviesIsFiltered] = useState([]);//отфильтрованные фильмы
  const [isLoading, setIsLoading] = useState(false); //загрузка прелоадера
  const [moviesToShow, setMoviesToShow] = useState([]);//карточки, которые нужно отобразить до кнопки Ещё
  const [addLoadMoreButton, setAddLoadMoreButton] = useState(false);// добавляет кнопку ещё
  const [selectedMoviesCard, setSelectedMoviesCard] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(null);
  // const [email, setEmail] = useState('');
  const [moviesCountIndex, setMoviesCountIndex] = useState(3);
  const history = useHistory();

  const handleError = (error) => console.error(error); 
  const filteredMovies = movies.filter(movie => filterMovie(movie, movieSearchQuery));

  function filterMovie(movie, query) {
    const regexp = new RegExp(query, "gi");
    return movie.nameRU.match(regexp);
  }

//   useEffect(() => {
//     if(loggedIn) {
//         Promise.all([moviesApi.getMovies(), mainApi.getProfileInfo()])
//         .then(([data, userData]) => {
//             setCurrentUser(userData);
//             setMovies(data);
//         })
//         .catch(handleError)
//     }  
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [loggedIn]);


//   useEffect(() => {
//     checkToken()
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [])

// useEffect(() => {
//   if(loggedIn) {
//       history.push('/')
//   }
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [loggedIn])

// function checkToken() {
//   const token = localStorage.getItem('token')
//   if (token) {
//       auth.getContent(token)
//       .then(res => {
//           setEmail(res.email)
//           setLoggedIn(true)
//       })
//       .catch(handleError)
//   }
// }

  function checkSearch() {
    if (filteredMovies.length === 0) {
      setSearchError('Ничего не найдено');
    }
    if (filteredMovies.length < moviesCountIndex) {
      setAddLoadMoreButton(false);
      setMoviesToShow(filteredMovies);
      console.log(filteredMovies.length, moviesCountIndex)
    }
    
  }
//отрисовка карточек
  useEffect(() => {
    if(search) {
      checkSearch();
      changeMoviesCardListScroll();
      // localStorage.setItem('filteredMovies',JSON.stringify(filteredMovies));
    } 
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [search, moviesCountIndex])



//добавляем кнопку ещё и, в зависимости от размера экрана количетсво карточек
function changeMoviesCardListScroll() {
  if (document.documentElement.clientWidth > 1280) {
    setMoviesToShow(filteredMovies.slice(0, moviesCountIndex));
    setAddLoadMoreButton(true);
  } 
  
  // if (document.documentElement.clientWidth > 768) {
  //   setMoviesCountIndex(moviesCountIndex + 2);
  //   setMoviesToShow(filteredMovies.slice(0,2));
  //   console.log(filteredMovies)
  //   console.log(moviesToShow)
  //   setAddLoadMoreButton(true);
  // }
  // if ((document.documentElement.clientWidth < 490)&&(filteredMovies.length > 1)) {
  //   setMoviesToShow(filteredMovies.slice(0,1));
  //   console.log(filteredMovies)
  //   console.log(moviesToShow)
  //   setAddLoadMoreButton(true);
  // }

  else {
    setAddLoadMoreButton(false);
    moviesToShow(filteredMovies);
  }
}

//клик по кнопке "Ещё"
function handleLoadMoreButtonClick() {
  setMoviesCountIndex(moviesCountIndex + 3);
  setMoviesToShow(filteredMovies.slice(0, moviesCountIndex));
}


//сабмит кнопи search
  function handleSearchSubmit(e) {
    setSearchError('')
    setMoviesToShow([]);
    setIsLoading(true);
    setSearch(false);
      moviesApi.getMovies()
       .then((data) => {
         setIsLoading(false)
         setMovies(data);
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

//функция которая возвращает массив сохранненых карточек
  function getSavedMovies() {
      mainApi.getSavedMovies()
      .then((savedMovies) => {
        console.log(savedMovies)
        return savedMovies
      })
      .catch(handleError)
 
  }
  
//по клику на кнопку сохранить происходит запрос на сохранение или удаление карточки из списка сохраненных
  function handleSaveMovieButtonClick(movie) {
    mainApi.saveMovie(movie)
    .then(() => {
      setSelectedMoviesCard(true); 
    })
    .catch(handleError)  
  if (selectedMoviesCard === true) {
    mainApi.removeMovie(movie.id)
    .then(() => {
      setSelectedMoviesCard(false);
      
    })
    .catch(handleError)
  }
  
  }


//   function handleLogin({email, password}) {
//     auth.authorize(email, password)
//     .then(data => {
//         const {token} = data; 
//         //localStorage.setItem('token', token);
//         setLoggedIn(true);
//         setEmail(email);
//     })
//     .catch(handleError)
// }

// function handleLogout() {
//     setEmail('');
//     setLoggedIn(false);
//     localStorage.removeItem('token');
// }

// function handleRegister({userName, email, password}) {
//     auth.register(userName, email, password)
//     .then(() => {
        
//     })
//     .catch(handleError);
// }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
          <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="/movies">
            <Movies onMovieSearch={handleSearchSubmit} onSearchInput={handleMovieInput} movies={moviesToShow} notFoundText={searchError} isLoading={isLoading} onSaveMovieButtonClick={handleSaveMovieButtonClick} addButton={addLoadMoreButton} selectedMoviesCard={selectedMoviesCard} onHadleLoadMoreButtonClick={handleLoadMoreButtonClick}/>
          </Route>
          <Route path="/saved-movies">
            <SavedMovies movies={getSavedMovies} notFoundText={searchError} isLoading={isLoading} onSaveMovieButtonClick={handleSaveMovieButtonClick} addButton={addLoadMoreButton}/>
          </Route>
          {/* <ProtectedRoute path="/movies" loggedIn={loggedIn} component={Movies} onMovieSearch={handleSearchSubmit} onSearchInput={handleMovieInput} movies={moviesToShow} notFoundText={searchError} isLoading={isLoading} onSaveMovieButtonClick={handleSaveMovieButtonClick} addButton={addLoadMoreButton} selectedMoviesCard={selectedMoviesCard}/> */}
          {/* <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} component={SavedMovies} movies={getSavedMovies} notFoundText={searchError} isLoading={isLoading} onSaveMovieButtonClick={handleSaveMovieButtonClick} addButton={addLoadMoreButton}/> */}
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/signin">
            {/* <Login handleLogin={handleLogin}/> */}
          </Route>
          <Route path="/signup">
            {/* <Register handleRegister={handleRegister}/> */}
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
