import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
      <section className="filter-checkbox">
            <label htmlFor="checkboxButton" className="filter-checkbox__label">
                <input type="checkbox" className="filter-checkbox__button" id="checkboxButton"/>
                <span className="filter-checkbox__slider-round"></span>
                <p className="filter-checkbox__caption">Короткометражки</p>
            </label>
      </section>
    );
  }
  
  export default FilterCheckbox;