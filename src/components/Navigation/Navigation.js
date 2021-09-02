import './Navigation.css';
import '../../styles/unvisible.css';
import '../../styles/unvisible.css';
import '../../styles/navigation-profile.css';
import { NavLink } from 'react-router-dom';

function Navigation({navClassName, navProfileClassName}) {
    return (
            <div className={navClassName}>
                <ul className="navigation__menu">
                        <li className="navigation__li"><NavLink className="navigation__link" exact to="/movies">Фильмы</NavLink></li>
                        <li className="navigation__li"><NavLink className="navigation__link" exact to="/saved-movies">Сохраненные фильмы</NavLink></li>
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
                          <li className="nav__li"><NavLink className="navigation__menu-item" exact to="/">Главная</NavLink></li>
                          <li className="nav__li"><NavLink className="navigation__menu-item" exact to="/movies">Фильмы</NavLink></li>
                          <li className="nav__li"><NavLink className="navigation__menu-item" exact to="/saved-movies">Сохранённые фильмы</NavLink></li>
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