import './MoviesCard.css';
import React, { useState, useEffect } from 'react';

function MoviesCard({movie, onSaveMovieButtonClick, moviesCardButtonClassName}) {


function handleSaveClick(e) {
  e.preventDefault();
  onSaveMovieButtonClick(movie);
}

const adress = 'https://api.nomoreparties.co';

  return (
            <article className="movies-card">
              <div className="movies-card__description">
                <p className="movies-card__caption">{movie.nameRU}</p>
                <span className="movies-card__time">{movie.duration} минут</span>
              </div>
                
                <img className="movies-card__image" src={adress+movie.image.url} alt="фото фильма"/>
                <button type="button" className={moviesCardButtonClassName} onClick={handleSaveClick}>Сохранить
                </button>
            </article>
  );
}

export default MoviesCard;
