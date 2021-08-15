import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import imageCardPath from '../../images/movies-card-first.png';
import imageCardSecondPath from '../../images/movies-card-second.png';
import imageCardThirdPath from '../../images/movies-card-third.png';

function MoviesCardList() {
  const classMoviesCardRed = 'movies-card__button red-button';
  const classMoviesCard = 'movies-card__button';
  const savedMovies = 'movies-card__button save-button'
  return (
        <section className="movies-cards">
            <div className="movies-card-list">
                <MoviesCard srcImage={imageCardPath} moviesCardButtonClassName={classMoviesCard} />
                <MoviesCard srcImage={imageCardSecondPath} moviesCardButtonClassName={classMoviesCardRed} />
                <MoviesCard srcImage={imageCardThirdPath} moviesCardButtonClassName={classMoviesCard} />
                <MoviesCard srcImage={imageCardPath} moviesCardButtonClassName={savedMovies}/>
                <MoviesCard srcImage={imageCardPath} moviesCardButtonClassName={savedMovies} />
            </div>
            
            <button className="movies-card-list__button">Ещё</button>
        </section>
  );
}

export default MoviesCardList;
