import './MoviesCard.css';
// import React, { useState, useEffect } from 'react';

function MoviesCard({movie, savedMovies, onSaveMovieButtonClick, listTypeMovies}) {
  
  const isSaved =  savedMovies.some(m => m.movieId === movie.movieId);
    
  
  // moviesCardButtonClassName='movies-card__button save-button'
  const moviesCardButtonClassName = 
  (
    `movies-card__button ${isSaved ? 'red-button' : ''}`
  )
  console.log("is saved",isSaved)
  function handleSaveClick(e) {
    e.preventDefault();
    onSaveMovieButtonClick(movie);
  }
 
  // const adress = 'https://api.nomoreparties.co';

  return (
            <article className="movies-card">
              <div className="movies-card__description">
                <p className="movies-card__caption">{movie.nameRU}</p>
                <span className="movies-card__time">{movie.duration} минут</span>
              </div>
                
                <img className="movies-card__image" src={movie.image} alt="фото фильма"/>
                <button type="button" className={listTypeMovies ? moviesCardButtonClassName : 'movies-card__button save-button'} onClick={handleSaveClick}>Сохранить
                </button>
            </article>
  );
}

export default MoviesCard;
