import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import { filterData } from '../Filtering';


function Movies({onMovieSearch, onSearchInput, movies, notFoundText, isLoading, addButton, onSaveMovieButtonClick, onHadleLoadMoreButtonClick, savedMovies, onCheckBoxClick, checkbox, onSavedMoviesLinkClick, onMoviesLinkClick}) {
  
  return (
    <>
      <section className="movies">
        <Header navClassName="navigation" navProfile="navigation__profile" headerReg="unvisible" onSavedMoviesLinkClick={onSavedMoviesLinkClick} onMoviesLinkClick={onMoviesLinkClick}/>
        <SearchForm onMovieSearch={onMovieSearch} onSearchInput={onSearchInput} />
        <FilterCheckbox onCheckBoxClick={onCheckBoxClick} checkbox={checkbox}/>
        <MoviesCardList movies={movies} savedMovies={savedMovies} notFoundText={notFoundText} isLoading={isLoading} addButton={addButton} onSaveMovieButtonClick={onSaveMovieButtonClick} onHadleLoadMoreButtonClick={onHadleLoadMoreButtonClick} listTypeMovies= {true}/>
      </section>
      <Footer/>
     </> 
  );
}

export default Movies;