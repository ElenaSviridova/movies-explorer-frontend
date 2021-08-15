import './AboutProject.css';
import '../../styles/landing-title.css';

function AboutProject() {
    return (
        <>
            <section className="about-project" id="aboutproject">
                <h2 className="landing-title">О проекте</h2>
                <div className="about-project__elements">
                    <article className="about-project__element">
                        <h3 className="about-project__element-header">Дипломный проект включал 5 этапов</h3>
                        <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </article>
                    <article className="about-project__element">
                        <h3 className="about-project__element-header">На выполнение диплома ушло 5 недель</h3>
                        <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </article>
                </div>
                <div className="about-project__schema">
                    <div className="about-project__backend">
                        <div className="about-project__background-backend">
                            <p className="about-project__duration color">1 неделя</p>
                        </div>
                        <p className="about-project__caption">Back-end</p>
                    </div>
                    <div className="about-project__frontend">
                        <div className="about-project__background-frontend">
                            <p className="about-project__duration">4 недели</p>
                        </div>
                        <p className="about-project__caption">Frontend</p>
                    </div>
                </div>
            </section>

        </>
    )
}

export default AboutProject;