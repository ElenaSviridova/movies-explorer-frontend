import './Register.css';
import '../../styles/logo.css';
import '../../styles/login.css'; /*общие блоки стилей находятся в папке styles*/
import logoBlueC from '../../images/logo-blue.svg';
import '../../styles/visible.css';
import { NavLink } from 'react-router-dom';


function Register() {

    return (
        <div className="register">
            <img src={logoBlueC} alt="Картинка логотипа" className="header__logo"/>
            <h1 className="login__title">Добро пожаловать!</h1>
            <form className="register__container" >
                <label className="login__label" for="name">Имя</label>
                <input required id="name" className="login__input" type="text" name="name" placeholder="Елена"></input>
                <span className="login__error"></span>
                <label className="login__label" for="email">E-mail</label>
                <input required id="email" className="login__input" type="email" name="email" placeholder="pochta@yandex.ru"></input>
                <span className="login__error"></span>
                <label className="login__label" for="password">Пароль</label>
                <input required id="password" className="login__input login__input_type_error" type="password" name="password"></input>
                <span className="login__error visible">Что-то пошло не так...</span>
                <button type="submit" className="register__button">Зарегистрироваться</button>
                <p className="login__caption">Уже зарегестрированы?
                    <NavLink className="login__link" exact to="/signin">Войти</NavLink>
                </p>
            </form>
        </div>
    )

}

export default Register;