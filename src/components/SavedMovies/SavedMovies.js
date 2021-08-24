import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import './SavedMovies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SavedMovies({movies, notFoundText, isLoading, addButton, onSaveMovieButtonClick, moviesCardButtonClassName}) {
  


  return (
            <section className="saved-movies">
                <Header navClassName="navigation" navProfile="navigation__profile" headerReg="unvisible"/>
                <SearchForm/>
                <FilterCheckbox/>
                <MoviesCardList movies={movies} notFoundText={notFoundText} isLoading={isLoading} addButton={addButton} onSaveMovieButtonClick={onSaveMovieButtonClick} moviesCardButtonClassName='movies-card__button save-button' />
                <Footer/>
            </section>
  );
}

export default SavedMovies;
