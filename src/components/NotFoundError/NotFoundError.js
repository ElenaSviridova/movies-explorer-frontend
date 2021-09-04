import './NotFoundError.css';
import { useHistory } from 'react-router-dom';

function NotFoundError() {
  const history = useHistory(); 

  return (
        <section className="not-found-error">
            <h2 className="not-found-error__title">404</h2>
            <p className="not-found-error__caption">Страница не найдена</p>
            <button className="not-found-error__back-button" onClick={() => history.goBack()}>Назад</button>
        </section>
  );
}

export default NotFoundError;
