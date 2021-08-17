import './NotFoundError.css';
import { NavLink } from 'react-router-dom';

function NotFoundError() {
  return (
        <section className="not-found-error">
            <h2 className="not-found-error__title">404</h2>
            <p className="not-found-error__caption">Страница не найдена</p>
            <NavLink className="not-found-error__back-button" exact to="/">Назад</NavLink>
        </section>
  );
}

export default NotFoundError;
