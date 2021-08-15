import Promo from '../Promo/Promo';
import './Main.css'
import Header from '../Header/Header';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Porfolio';
import Footer from '../Footer/Footer';

function Main() {
    return (
        <>
            
            <main className='main'>
                <Header navClassName="unvisible" navProfile="unvisible" headerReg="header__right-side"/>
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