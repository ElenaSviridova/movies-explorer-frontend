import React from 'react';
import Promo from '../Promo/Promo';
import './Main.css'
import Header from '../Header/Header';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Porfolio';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/currentUserContext';

function Main({loggedIn}) {
    const currentUser = React.useContext(CurrentUserContext);

    const navClassName = loggedIn ? "navigation" : "unvisible";
    const navProfile = loggedIn ? "navigation__profile" : "unvisible";
    const headerReg = loggedIn ? 'unvisible' : "header__right-side";

    return (
        <>
            <main className='main'>
                <Header navClassName={navClassName} navProfile={navProfile} headerReg={headerReg}/>
                <Promo />
                <AboutProject/>
                <Techs/>
                <AboutMe/>
                <Portfolio/> 
            </main>    
            <Footer/>
        </>
    )
}

export default Main;