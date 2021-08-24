import './Profile.css';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';
import '../../styles/login.css';

function Profile() {

    return (
        <>
        <Header navClassName="navigation" navProfile="navigation__profile" headerReg="unvisible"/>
        <div className="profile">
            <h1 className="profile__title">Привет, Елена!</h1>
            <form className="profile__container">
                <div className="login__enter">
                    <label className="profile__label-name" htmlFor="password">Имя</label>
                    <input required id="name" className="profile__input" type="text" name="name" placeholder="Елена"></input>
                    <label className="profile__label-email" htmlFor="email">E-mail</label>
                    <input required id="email" className="profile__input" type="email" name="email" placeholder="lenatwi@rambler.ru"></input>
                </div>
                <div className="login__enter">
                    <button className="profile__button">Редактировать</button>
                    <NavLink className="profile__link" exact to="/">Выйти из аккаунта</NavLink>
                </div>
            </form>
        </div>
        </>
    )

}

export default Profile;