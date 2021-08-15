import './Profile.css';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';

function Profile() {

    return (
        <>
        <Header navClassName="navigation" navProfile="navigation__profile" headerReg="unvisible"/>
        <div className="profile">
            <h1 className="profile__title">Привет, Елена!</h1>
            <form className="profile__container">
                <label className="profile__label-name" for="password">Имя</label>
                <input required id="name" className="profile__input" type="text" name="name" placeholder="Елена"></input>
                <label className="profile__label-email" for="email">E-mail</label>
                <input required id="email" className="profile__input" type="email" name="email" placeholder="lenatwi@rambler.ru"></input>
                <button className="profile__button">Редактировать</button>
                <NavLink className="profile__link" exact to="/">Выйти из аккаунта</NavLink>
            </form>
        </div>
        </>
    )

}

export default Profile;