import './SearchForm.css';
import React, { useState, useEffect } from 'react';

function SearchForm({onMovieSearch, onSearchInput}) {

  const [isValid, setIsValid] = useState('');
  const [searchError, setSearchError] = useState('');


  function handleSubmit(e) {
    e.preventDefault(); 
    checkInputValidity();  
  }

  function checkInputValidity() {
    if (!isValid) {
      setSearchError('Нужно ввести ключевое слово');
    } else {
      setSearchError('');
      onMovieSearch();
    }
  }

  function handleMovieInput(e) {
    setIsValid(e.target.validity.valid);
    onSearchInput(e);
  }

  return (
        <section className="search">
            <form className="search__form" onSubmit={handleSubmit} noValidate>
                <input type="text" required className="search__bar" placeholder="Фильм" id="search-bar" onChange={handleMovieInput} name="movie"/>
                <span className="search__bar-error">{searchError}</span>
                <button className="search__button" onSubmit={handleSubmit}></button>
                <button className="search__button-blue" onSubmit={handleSubmit}></button>
            </form>  
        </section>
  );
}

export default SearchForm;
