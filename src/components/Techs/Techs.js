import './Techs.css';
import '../../styles/landing-title.css';

function Techs() {
    return (
            <section className="techs">
                <h2 className="landing-title">Технологии</h2>
                <h3 className="techs__title">7 технологий</h3>
                <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__list">
                    <li className="techs__li">HTML</li>
                    <li className="techs__li">CSS</li>
                    <li className="techs__li">JS</li>
                    <li className="techs__li">React</li>
                    <li className="techs__li">Git</li>
                    <li className="techs__li">Express.js</li>
                    <li className="techs__li">mongoDB</li>
                </ul>
            </section>
    )
}

export default Techs;