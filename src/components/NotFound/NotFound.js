import React from 'react';
import { useNavigate } from 'react-router-dom';
import notfound from '../../images/404.jpeg';
import './NotFound.css';

function NotFound () {
    const navigate = useNavigate();
    return (
        <section className="not-found">
            <div className="not-found__container">
            <img className="not-found__image" src={notfound} alt="Черно-белый логотип страницы 404 не найдено" />
                <h1 className="not-found__title">404</h1>
                <p className="not-found__subtitle">Страница не найдена</p>
                <button
                    className="not-found__button app__text-opacity"
                    onClick={() => navigate(-1)}>
                    Назад
                </button>
            </div>
        </section>
    );
}

export default NotFound;