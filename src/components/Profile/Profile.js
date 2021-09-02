import './Profile.css';
import React, {useEffect} from 'react';
import Header from '../Header/Header';
import '../../styles/login.css';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import { useFormWithValidation } from '../Validator';
import '../../styles/login.css';
import '../../styles/unvisible.css';

function Profile({handleAccountClick, onEditClick, onSavedMoviesLinkClick, onMoviesLinkClick}) {

    const {setValues, values, errors, isValid, handleChange, resetForm} = useFormWithValidation();

    const currentUser = React.useContext(CurrentUserContext);
    useEffect(() => {
        if(currentUser.name && currentUser.email) {
            setValues({userName: currentUser.name, email: currentUser.email});

          }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]); 


    function activateButton() {
        if ((values.userName === currentUser.name)||(values.email === currentUser.email)||!isValid) {
            return true;
        } else  {
            return false;
        }
    }

    function handleEditClick(e) {
        e.preventDefault();
        const { userName, email } = values;
        onEditClick({userName, email});
    }

    function setErrorClassName(error) {
        return  !error ? "login__error unvisible" : "login__error"
      } 

    return (
        <>
        <Header navClassName="navigation" navProfile="navigation__profile" headerReg="unvisible" onSavedMoviesLinkClick={onSavedMoviesLinkClick} onMoviesLinkClick={onMoviesLinkClick}/>
        <div className="profile">
            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
            <form className="profile__container" onSubmit={handleEditClick}>
                <div className="login__enter">
                    <div className="profile__form-group">
                        <label className="profile__label" htmlFor="userName">Имя</label>
                        <input required id="userName" className="profile__input" type="text" name="userName" value={values.userName} placeholder='Имя' onChange={handleChange}></input>
                        <span className={setErrorClassName(errors.userName)}>{isValid ? '' : errors.userName}</span>
                    </div>
                    <div className="profile__form-group">
                        <label className="profile__label" htmlFor="email">E-mail</label>
                        <input required id="email" className="profile__input noborder" type="email" name="email" value={values.email} placeholder='pochta@yandex.ru' onChange={handleChange}></input>
                        <span className={setErrorClassName(errors.email)}>{isValid ? '' : errors.email}</span>
                    </div>
                </div>
                <div className="login__enter">
                    <button className="profile__button" type="submit" disabled={activateButton()}>Редактировать</button>
                    <button className="profile__button red-text" type="button" onClick={handleAccountClick}>Выйти из аккаунта</button>
                </div>
            </form>
        </div>
        </>
    )

}

export default Profile;