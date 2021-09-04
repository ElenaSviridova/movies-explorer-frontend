import './Navigation.css';
import '../../styles/unvisible.css';
import '../../styles/unvisible.css';
import '../../styles/navigation-profile.css';
import { NavLink } from 'react-router-dom';

function Navigation({navClassName, navProfileClassName, onSavedMoviesLinkClick, onMoviesLinkClick}) {

  function handleSavedMoviesLinkClick() {
    onSavedMoviesLinkClick();
  }

  function handleMoviesLinkClick() {
    onMoviesLinkClick();
  }

    return (
            <div className={navClassName}>
                <ul className="navigation__menu">
                        <li className="navigation__li">
                          <button className="navigation__link" type="button" onClick={handleMoviesLinkClick}>
                            <NavLink activeClassName="bold" className="navigation__profile-link" exact to="/movies">Фильмы</NavLink>
                          </button>
                        </li>
                        <li className="navigation__li">
                          <button className="navigation__link" type="button" onClick={handleSavedMoviesLinkClick} >
                            <NavLink activeClassName="bold" className="navigation__profile-link" exact to="/saved-movies">Сохраненные фильмы</NavLink>
                          </button>
                        </li>
                </ul> 
                <div className={navProfileClassName}>
                    <NavLink  activeClassName="bold" className="navigation__profile-link" exact to="/profile">Аккаунт</NavLink>
                    <button className="navigation__profile-button"></button>
                </div>  
                <div className="navigation__burger-menu">
                <input id="menu-toggle" type="checkbox" />
                <label className="navigation__menu-btn" htmlFor="menu-toggle">
                  <span></span>
                </label>
                <div className="navigation__background">
                  <ul className="navigation__menubox">
                          <li className="nav__li"><NavLink className="navigation__menubox-link" exact to="/"><button className="navigation__menu-item" type="button">Главная</button></NavLink></li>
                          <li className="nav__li"><NavLink className="navigation__menubox-link" exact to="/movies"><button className="navigation__menu-item" type="button" onClick={handleMoviesLinkClick}>Фильмы</button></NavLink></li>
                          <li className="nav__li"><NavLink className="navigation__menubox-link" exact to="/saved-movies"><button className="navigation__menu-item" type="button" onClick={handleSavedMoviesLinkClick}>Сохранённые фильмы</button></NavLink></li>
                          <li className="navigation__profile-link-burger">
                              <NavLink className="navigation__profile-link" exact to="/profile">Аккаунт</NavLink>
                              <button className="navigation__profile-button"></button>
                          </li>
                  </ul>
                </div>
              </div>
            </div>
      
    )
};

export default Navigation;