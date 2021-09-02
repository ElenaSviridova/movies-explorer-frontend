import './Navigation.css';
import '../../styles/unvisible.css';
import '../../styles/unvisible.css';
import '../../styles/navigation-profile.css';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Navigation({navClassName, navProfileClassName, onSavedMoviesLinkClick, onMoviesLinkClick}) {
  const history = useHistory();
  const navigateToMain = () => history.push('/');

  function handleSavedMoviesLinkClick() {
    history.push('/saved-movies');
    onSavedMoviesLinkClick();
  }

  function handleMoviesLinkClick() {
    history.push('/movies');
    onMoviesLinkClick();
  }

    return (
            <div className={navClassName}>
                <ul className="navigation__menu">
                        <li className="navigation__li"><button className="navigation__link" type="button" onClick={handleMoviesLinkClick}>Фильмы</button></li>
                        <li className="navigation__li"><button className="navigation__link" type="button" onClick={handleSavedMoviesLinkClick} >Сохраненные фильмы</button></li>
                </ul> 
                <div className={navProfileClassName}>
                    <NavLink className="navigation__profile-link" exact to="/profile">Аккаунт</NavLink>
                    <button className="navigation__profile-button"></button>
                </div>  
                <div className="navigation__burger-menu">
                <input id="menu-toggle" type="checkbox" />
                <label className="navigation__menu-btn" htmlFor="menu-toggle">
                  <span></span>
                </label>
                <div className="navigation__background">
                  <ul className="navigation__menubox">
                          <li className="nav__li"><button className="navigation__menu-item" type="button" onClick={navigateToMain}>Главная</button></li>
                          <li className="nav__li"><button className="navigation__menu-item" type="button" onClick={handleMoviesLinkClick}>Фильмы</button></li>
                          <li className="nav__li"><button className="navigation__menu-item" type="button" onClick={handleSavedMoviesLinkClick}>Сохранённые фильмы</button></li>
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