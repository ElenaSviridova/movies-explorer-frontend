import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies() {
  return (
      <section className="movies">
        <Header navClassName="navigation" navProfile="navigation__profile" headerReg="unvisible"/>
        <SearchForm/>
        <FilterCheckbox/>
        <MoviesCardList/>
        <Footer/>
        {/* <Preloader/>
        <MoviesCard/> */}
      </section>
  );
}

export default Movies;