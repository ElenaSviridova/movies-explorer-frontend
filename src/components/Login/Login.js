import '../../styles/logo.css';
import '../../styles/login.css'; /*общие блоки стилей находятся в папке styles*/
import logoBlueC from '../../images/logo-blue.svg';
import '../../styles/visible.css';
import { NavLink } from 'react-router-dom';


function Login() {
    // добавляем login__input_type_error и visible для того чтобы появиоась валидация
    return (
        <div className="login">
            <img src={logoBlueC} alt="Картинка логотипа" className="header__logo"/>
            <h1 className="login__title">Рады видеть!</h1>
            <form className="login__container" >
                <div className="login__enter">
                <label className="login__label" for="email">E-mail</label>
                <input required id="email" className="login__input" type="email" name="email" placeholder="pochta@yandex.ru"></input>
                <span className="login__error"></span>
                <label className="login__label" for="password">Пароль</label>
                <input required id="password" className="login__input login__input_type_error" type="password" name="password"></input> 
                <span className="login__error visible">Что-то пошло не так...</span>
                </div>
                
                <div className="login__enter">
                    <button type="submit" className="login__button">Войти</button>
                    <p className="login__caption">Ещё не зарегистрированы?
                        <NavLink className="login__link" exact to="/signup">Регистрация</NavLink>
                    </p>
                </div>
                
            </form>
        </div>
    )

}

export default Login;