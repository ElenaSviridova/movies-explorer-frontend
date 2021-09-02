import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import '../../styles/unvisible.css';
import React from 'react';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({movies, savedMovies, notFoundText, isLoading, addButton, onSaveMovieButtonClick, onHadleLoadMoreButtonClick, listTypeMovies}) {

const moviesCardListButtonClassName = (
  `movies-card-list__button ${addButton ? '' : 'unvisible'}`
);

function handleLoadMoreButtonClick() {
    onHadleLoadMoreButtonClick();
}

  return (
        <section className="movies-cards">
          {isLoading && <Preloader />}
            <p className="movies-card__not-found">{notFoundText}</p>
            <div className="movies-card-list">
              {movies.map((movie) => (<MoviesCard key={movie.movieId} movie={movie} onSaveMovieButtonClick={onSaveMovieButtonClick} savedMovies={savedMovies} listTypeMovies= {listTypeMovies}/>))}
            </div>
            <button className={moviesCardListButtonClassName} onClick={handleLoadMoreButtonClick}>Ещё</button>
        </section>
  );
}

export default MoviesCardList;
