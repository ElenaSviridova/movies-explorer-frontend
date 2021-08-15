import './SearchForm.css';

function SearchForm() {
  return (
        <section className="search">
            <form className="search__form">
                <input type="text" className="search__bar" placeholder="Фильм" id="searchInput"/>
                <button className="search__button"></button>
                <button className="search__button-blue"></button>
            </form>  
        </section>
  );
}

export default SearchForm;
