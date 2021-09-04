import './AboutMe.css';
import '../../styles/landing-title.css';

function AboutMe() {
    return (
            <section className="about-me">
                <h2 className="landing-title">Студент</h2>
                <div className="about-me__about">
                        <h3 className="about-me__name">Елена</h3>
                        <p className="about-me__caption">Фронтенд-разработчик, 27 лет</p>
                        <p className="about-me__description">Я провела дество в городе Волжском,
                        отучилась там в школе и переехала поступать в ВУЗ в Санкт-Птетербург.
                        Закончила факультет гостиничного дела в СпбГЭУ. Недавно начала увлекаться кодом.
                        Прошла курсы веб-разработки.
                        </p>
                        <div className="about-me__social-links">
                            <a className="about-me__social-link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
                            <a className="about-me__social-link" href="https://github.com/ElenaSviridova/" target="_blank" rel="noreferrer">GitHub</a>
                        </div>
                        <img className="about-me__photo" alt="фото Елены" src="https://cut-shot.ru/wp-content/uploads/352CE9F2-6252-4593-ACDC-4A675F5D4421.jpeg"/>
                </div>
            </section>
    )
}

export default AboutMe;