import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import './SavedMovies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SavedMovies({movies, savedMovies, notFoundText, isLoading, addButton, onSaveMovieButtonClick, onSearchInput, onMovieSearch, onCheckBoxClick, checkbox, onSavedMoviesLinkClick, onMoviesLinkClick}) {
  
  return (
            <section className="saved-movies">
                <Header navClassName="navigation" navProfile="navigation__profile" headerReg="unvisible" onSavedMoviesLinkClick={onSavedMoviesLinkClick} onMoviesLinkClick={onMoviesLinkClick}/>
                <SearchForm onMovieSearch={onMovieSearch} onSearchInput={onSearchInput}/>
                <FilterCheckbox onCheckBoxClick={onCheckBoxClick} checkbox={checkbox}/>
                <MoviesCardList movies={movies} savedMovies = {savedMovies} notFoundText={notFoundText} isLoading={isLoading} addButton={addButton} onSaveMovieButtonClick={onSaveMovieButtonClick} listTypeMovies= {false}/>
                <Footer/>
            </section>
  );
}

export default SavedMovies;
