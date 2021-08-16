import React from 'react';
import logoBlueC from '../../images/logo-blue.svg';
import './Header.css';
import '../../styles/logo.css';
import '../../styles/unvisible.css';
import Navigation from '../Navigation/Navigation';
import { NavLink } from 'react-router-dom';

function Header({navClassName, navProfile, headerReg}) {

    return (
        <header className="header">
              <NavLink exact to="/" className="header__link">
                <img src={logoBlueC} alt="Картинка логотипа" className="header__logo"/>
              </NavLink>
              <Navigation navClassName={navClassName} navProfileClassName={navProfile}/>
              <div className={headerReg}>
                <NavLink className="header__register" exact to="/register">Регистрация</NavLink>
                <NavLink exact to="/signin"  className='header__button'>Войти</NavLink>
              </div>
        </header> 
    )
};

export default Header;