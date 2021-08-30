import '../../styles/logo.css';
import '../../styles/login.css'; /*общие блоки стилей находятся в папке styles*/
import logoBlueC from '../../images/logo-blue.svg';
import '../../styles/unvisible.css';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';


function Register({handleRegister}) {

    const [ data , setData] = useState({
        userName: '',
        email: '',
        password: ''
    });
    


   function handleChange(e) {
       const {name, value} = e.target;
       setData({...data, [name]: value})
   }

    function handleSubmit(e) {
        e.preventDefault();
        const {userName, email, password } = data;
        console.log(userName, email, password)
        handleRegister({userName, email, password})
    }

    return (
        <div className="login">
            <img src={logoBlueC} alt="Картинка логотипа" className="header__logo"/>
            <h1 className="login__title">Добро пожаловать!</h1>
            <form className="login__container" onSubmit={handleSubmit}>
                <div className="login__enter">
                    <label className="login__label" htmlFor="userName">Имя</label>
                    <input required id="name" className="login__input" type="text" name="userName" placeholder="Елена" value={data.userName} onChange={handleChange}></input>
                    <span className="login__error"></span>
                    <label className="login__label" htmlFor="email">E-mail</label>
                    <input required id="email" className="login__input" type="email" name="email" placeholder="pochta@yandex.ru" value={data.email} onChange={handleChange}></input>
                    <span className="login__error"></span>
                    <label className="login__label" htmlFor="password">Пароль</label>
                    <input required id="password" className="login__input" type="password" name="password" value={data.password} onChange={handleChange}></input>
                    <span className="login__error unvisible">Что-то пошло не так...</span>
                    </div>
                <div className="login__enter">
                    <button type="submit" className="login__button">Зарегистрироваться</button>
                    <p className="login__caption">Уже зарегестрированы?
                            <NavLink className="login__link" exact to="/signin">Войти</NavLink>
                    </p>
                </div>
            </form>    
            
        </div>
    )

}

export default Register;