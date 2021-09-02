import './MoviesCard.css';
// import React, { useState, useEffect } from 'react';

function MoviesCard({movie, savedMovies, onSaveMovieButtonClick, listTypeMovies}) {

 
  
  const isSaved =  savedMovies.some(m => m.movieId === movie.movieId);
    
  const moviesCardButtonClassName = (
    `movies-card__button ${isSaved ? 'red-button' : ''}`
  )


  function handleSaveClick(e) {
    e.preventDefault();
    onSaveMovieButtonClick(movie);
  }

  var declOfNum = function(number, titles)
{  
    var  cases = [2, 0, 1, 1, 1, 2];  
    return titles[ 
            (number % 100 > 4 && number % 100 < 20) 
            ? 
            2 
            : 
            cases[(number % 10 < 5) ? number % 10 : 5] 
    ];  
} 
 
  return (
            <article className="movies-card">
              <div className="movies-card__description">
                <p className="movies-card__caption">{movie.nameRU}</p>
                <span className="movies-card__time">{movie.duration} {declOfNum(movie.duration, ['минута', 'минуты', 'минут'])}</span>
              </div>
                <a href = {movie.trailer} target="_blank" rel="noreferrer">
                  <img className="movies-card__image" src={movie.image} alt="фото фильма"/>
                </a>
                <button type="button" className={listTypeMovies ? moviesCardButtonClassName : 'movies-card__button save-button'} onClick={handleSaveClick}>Сохранить
                </button>
            </article>
  );
}

export default MoviesCard;
