import './Promo.css';
import promoImagePath from '../../images/landing-logo.svg';


function Promo() {
    return (
            <section className="promo">
                <div className="promo__text">
                    <h1 className="promo__header">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                    <p className="promo__caption">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <button className="promo__button"><a href="#aboutproject" className="promo__link">Узнать больше</a></button>
                </div>
                <img className="promo__image" src={promoImagePath} alt="промо картинка"/>
            </section>

    )
}

export default Promo;