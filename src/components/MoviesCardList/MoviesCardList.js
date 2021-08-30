import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import '../../styles/unvisible.css';
import React, { useState } from 'react';
// import imageCardPath from '../../images/movies-card-first.png';
// import imageCardSecondPath from '../../images/movies-card-second.png';
// import imageCardThirdPath from '../../images/movies-card-third.png';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({movies, savedMovies, notFoundText, isLoading, addButton, onSaveMovieButtonClick, onHadleLoadMoreButtonClick, listTypeMovies}) {



const moviesCardListButtonClassName = (
  `movies-card-list__button ${addButton ? '' : 'unvisible'}`
);

function handleLoadMoreButtonClick() {
    onHadleLoadMoreButtonClick();
}


  
  // const classMoviesCardRed = 'movies-card__button red-button';
  // const classMoviesCard = 'movies-card__button';
  // const savedMovies = 'movies-card__button save-button';

  return (
        <section className="movies-cards">
          {isLoading && <Preloader />}
            <p className="movies-card__not-found">{notFoundText}</p>
            <div className="movies-card-list">
              {movies.map((movie) => (<MoviesCard key={movie.id} movie={movie} onSaveMovieButtonClick={onSaveMovieButtonClick} savedMovies={savedMovies} listTypeMovies= {listTypeMovies}/>))}
            </div>
            <button className={moviesCardListButtonClassName} onClick={handleLoadMoreButtonClick}>Ещё</button>
        </section>
  );
}

export default MoviesCardList;
