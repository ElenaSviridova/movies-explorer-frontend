import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Movies({onMovieSearch, onSearchInput, movies, notFoundText, isLoading, addButton, onSaveMovieButtonClick, selectedMoviesCard, onHadleLoadMoreButtonClick}) {
 
  const moviesCardButtonClassName = (
    `movies-card__button ${selectedMoviesCard ? 'red-button' : ''}`
  )
  
  return (
    <>
      <section className="movies">
        <Header navClassName="navigation" navProfile="navigation__profile" headerReg="unvisible"/>
        <SearchForm onMovieSearch={onMovieSearch} onSearchInput={onSearchInput} />
        <FilterCheckbox/>
        <MoviesCardList movies={movies} notFoundText={notFoundText} isLoading={isLoading} addButton={addButton} onSaveMovieButtonClick={onSaveMovieButtonClick} moviesCardButtonClassName={moviesCardButtonClassName} onHadleLoadMoreButtonClick={onHadleLoadMoreButtonClick}/>
        
        {/* <Preloader/>
        <MoviesCard/> */}
      </section>
      <Footer/>
     </> 
  );
}

export default Movies;