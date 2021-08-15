import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import './SavedMovies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SavedMovies() {
  
  return (
            <section className="saved-movies">
                <Header navClassName="navigation" navProfile="navigation__profile" headerReg="unvisible"/>
                <SearchForm/>
                <FilterCheckbox/>
                <MoviesCardList/>
                <Footer/>
            </section>
  );
}

export default SavedMovies;
