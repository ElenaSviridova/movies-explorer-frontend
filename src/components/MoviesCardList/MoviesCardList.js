import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import '../../styles/unvisible.css';
import React, { useState } from 'react';
// import imageCardPath from '../../images/movies-card-first.png';
// import imageCardSecondPath from '../../images/movies-card-second.png';
// import imageCardThirdPath from '../../images/movies-card-third.png';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({movies, notFoundText, isLoading, addButton, onSaveMovieButtonClick, moviesCardButtonClassName}) {



const moviesCardListButtonClassName = (
  `movies-card-list__button ${addButton ? '' : 'unvisible'}`
);

function handleLoadMoreButtonClick() {

}


  
  // const classMoviesCardRed = 'movies-card__button red-button';
  // const classMoviesCard = 'movies-card__button';
  // const savedMovies = 'movies-card__button save-button';

  return (
        <section className="movies-cards">
          {isLoading && <Preloader />}
            <p className="movies-card__not-found">{notFoundText}</p>
            <div className="movies-card-list">
              {movies.map((movie) => (<MoviesCard key={movie.id} movie={movie} onSaveMovieButtonClick={onSaveMovieButtonClick} moviesCardButtonClassName={moviesCardButtonClassName}/>))}
            </div>
            <button className={moviesCardListButtonClassName}>Ещё</button>
        </section>
  );
}

export default MoviesCardList;
