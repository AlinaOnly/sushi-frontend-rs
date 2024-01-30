import React from 'react';
import './Banner.css';

function Banner() {
    return (
        <section className="banner">
            <p className="banner__title">Уважаемые пользователи, на сайте ведутся технические работы, прием заказов через сайт не доступен.
                Заказы принимаются через телефон и
                <a className="banner__href"
                    target="_blank"
                    href="https://t.me/YUME_SUSHI_bot"
                    rel="noreferrer noopener">&nbsp;телеграм 
                </a>
            </p>
        </section>
    );
}

export default Banner;