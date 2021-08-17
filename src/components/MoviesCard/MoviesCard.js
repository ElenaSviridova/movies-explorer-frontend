import './MoviesCard.css';

function MoviesCard({srcImage, moviesCardButtonClassName}) {

// const [selectedMoviesCard, setSelectedMoviesCard] = useState(false);

// const moviesCardButtonClassName = (
//   `movies-card__button ${selectedMoviesCard ? 'red-button' : ''}`
// );

// function handleMoviesCardClick() {
//   setSelectedMoviesCard(true);

// }

  return (
            <article className="movies-card">
                <p className="movies-card__caption">В погоне за Бенкси
                <span className="movies-card__time">27 минут</span>
                </p>
                <img className="movies-card__image" src={srcImage} alt="фото фильма"/>
                <button type="button" className={moviesCardButtonClassName}>Сохранить
                </button>
            </article>
  );
}

export default MoviesCard;
