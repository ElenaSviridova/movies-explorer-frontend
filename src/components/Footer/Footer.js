import './Footer.css';

function Footer() {
    return (
            <footer className="footer">
                <p className="footer__author">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <p className="footer__year">&copy;2021</p>
                <nav className="footer__navbar">
                    <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                    <a className="footer__link" href="https://github.com/" target="_blank" rel="noreferrer">Github</a>
                    <a className="footer__link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
                </nav>
            </footer>
    )
};

export default Footer;