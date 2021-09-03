import '../../styles/logo.css';
import '../../styles/login.css'; /*общие блоки стилей находятся в папке styles*/
import logoBlueC from '../../images/logo-blue.svg';
import '../../styles/unvisible.css';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { useFormWithValidation } from '../Validator';


function Register({handleRegister}) {

    const {values, errors, isValid, handleChange} = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        const {userName, email, password } = values;
        console.log(userName, email, password)
        handleRegister({userName, email, password});
    }

    function setInputClassName(error) {
      return  !error ? "login__input" : "login__input login__input_type_error";
    }
    function setErrorClassName(error) {
        return  !error ? "login__error unvisible" : "login__error"
    } 


    return (
        <div className="login">
            <NavLink exact to="/" className="header__link">
                <img src={logoBlueC} alt="Картинка логотипа" className="header__logo"/>
            </NavLink>
            <h1 className="login__title">Добро пожаловать!</h1>
            <form className="login__container" onSubmit={handleSubmit}>
                <div className="login__enter">
                    <label className="login__label" htmlFor="userName">Имя</label>
                    <input required id="name" className={setInputClassName(errors.userName)} type="text" name="userName" placeholder="Елена" value={values.userName} onChange={handleChange}></input>
                    <span className={setErrorClassName(errors.userName)}>{isValid ? "" : errors.userName}</span>
                    <label className="login__label" htmlFor="email">E-mail</label>
                    <input required id="email" className={setInputClassName(errors.email)} type="email" name="email" placeholder="pochta@yandex.ru" value={values.email} onChange={handleChange}></input>
                    <span className={setErrorClassName(errors.email)}>{isValid ? '' : errors.email}</span>
                    <label className="login__label" htmlFor="password">Пароль</label>
                    <input required id="password" className={setInputClassName(errors.password)} type="password" name="password" value={values.password} onChange={handleChange} minLength='4'></input>
                    <span className={setErrorClassName(errors.password)}>{isValid ? '' : errors.password}</span>
                </div>
                <div className="login__enter">
                    <button type="submit" className="login__button" disabled = {!isValid ? true : false}>Зарегистрироваться</button>
                    <p className="login__caption">Уже зарегестрированы?
                            <NavLink className="login__link" exact to="/signin">Войти</NavLink>
                    </p>
                </div>
            </form>    
            
        </div>
    )

}

export default Register;