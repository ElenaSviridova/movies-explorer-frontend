import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Movies({onMovieSearch, onSearchInput, movies, notFoundText, isLoading, addButton, onSaveMovieButtonClick, onHadleLoadMoreButtonClick, savedMovies}) {
  
  return (
    <>
      <section className="movies">
        <Header navClassName="navigation" navProfile="navigation__profile" headerReg="unvisible"/>
        <SearchForm onMovieSearch={onMovieSearch} onSearchInput={onSearchInput} />
        <FilterCheckbox/>
        <MoviesCardList movies={movies} savedMovies={savedMovies} notFoundText={notFoundText} isLoading={isLoading} addButton={addButton} onSaveMovieButtonClick={onSaveMovieButtonClick} onHadleLoadMoreButtonClick={onHadleLoadMoreButtonClick} listTypeMovies= {true}/>
        
        {/* <Preloader/>
        <MoviesCard/> */}
      </section>
      <Footer/>
     </> 
  );
}

export default Movies;