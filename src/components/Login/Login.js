import '../../styles/logo.css';
import React from 'react';
import '../../styles/login.css'; /*общие блоки стилей находятся в папке styles*/
import logoBlueC from '../../images/logo-blue.svg';
import '../../styles/unvisible.css';
import { NavLink } from 'react-router-dom';
import { useFormWithValidation } from '../Validator';


function Login({handleLogin}) {

    const {values, errors, isValid, handleChange, resetForm} = useFormWithValidation();

    function handleSubmit(e){
        e.preventDefault();
        // здесь обрабатываем вход в систему
        if(!values.email || !values.password) {
            return
        }
        const { email, password } = values;
        handleLogin({ email, password });
        // resetForm();
    }
    
    function setInputClassName(input) {
        return  !input ? "login__input" : "login__input login__input_type_error"
      }

    function setErrorClassName(error) {
        return  !error ? "login__error unvisible" : "login__error"
    } 

    return (
        <div className="login">
            <NavLink exact to="/" className="header__link">
                <img src={logoBlueC} alt="Картинка логотипа" className="header__logo"/>
            </NavLink>
            <h1 className="login__title">Рады видеть!</h1>
            <form className="login__container" onSubmit={handleSubmit} >
                <div className="login__enter">
                <label className="login__label" htmlFor="email">E-mail</label>
                <input required id="email" className={setInputClassName(errors.email)} type="email" name="email" placeholder="pochta@yandex.ru" value={values.email} onChange={handleChange}></input>
                <span className={setErrorClassName(errors.email)}>{isValid ? '' : errors.email}</span>
                <label className="login__label" htmlFor="password">Пароль</label>
                <input required id="password" className={setInputClassName(errors.password)} type="password" name="password" value={values.password} onChange={handleChange}></input> 
                <span className={setErrorClassName(errors.password)}>{isValid ? '' : errors.password}</span>
                </div>
                <div className="login__enter">
                    <button type="submit" className="login__button" disabled = {!isValid ? true : false}>Войти</button>
                    <p className="login__caption">Ещё не зарегистрированы?
                        <NavLink className="login__link" exact to="/signup">Регистрация</NavLink>
                    </p>
                </div>
                
            </form>
        </div>
    )

}

export default Login;