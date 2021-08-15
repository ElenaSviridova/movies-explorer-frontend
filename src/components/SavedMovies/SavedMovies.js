import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import './SavedMovies.css';
import Footer from '../Footer/Footer';

function SavedMovies() {
  
  return (
            <section className="saved-movies">
                <Header navClassName="navigation" navProfile="navigation__profile" headerReg="unvisible"/>
                <MoviesCardList/>
                <Footer/>
            </section>
  );
}

export default SavedMovies;
