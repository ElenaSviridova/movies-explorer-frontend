import './Portfolio.css';
import { NavLink } from 'react-router-dom';

function Portfolio() {
    return (
            <section className="portfolio">
                <h4 className="portfolio__title">Портфолио</h4>
                <ul className="portfolio__links">
                    <li className="portfolio__li"><NavLink exact to="/" className="portfolio__link">Статичный сайт</NavLink>&#8599;</li>
                    <li className="portfolio__li"><NavLink exact to="/" className="portfolio__link">Адаптивный сайт</NavLink>&#8599;</li>
                    <li className="portfolio__li"><NavLink exact to="/" className="portfolio__link">Одностраничное приложение</NavLink>&#8599;</li>
                </ul>
            </section>
    )
}

export default Portfolio;