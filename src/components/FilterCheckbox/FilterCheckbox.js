import './FilterCheckbox.css';
import React from 'react';


function FilterCheckbox({onCheckBoxClick, checkbox}) {
  
  function handleCheckBoxClick(event) {
  onCheckBoxClick(event);
  console.log(checkbox.checked)
  }
// onClick={handleCheckBoxClick} checked={checkbox.checked}
    return (
      <section className="filter-checkbox">
            <label htmlFor="checkboxButton" className="filter-checkbox__label">
                <input type="checkbox" className="filter-checkbox__button" id="checkboxButton" onChange={handleCheckBoxClick} checked={checkbox.checked}/>
                <span className="filter-checkbox__slider-round"></span>
                <p className="filter-checkbox__caption">Короткометражки</p>
            </label>
      </section>
    );
  }
  
  export default FilterCheckbox;