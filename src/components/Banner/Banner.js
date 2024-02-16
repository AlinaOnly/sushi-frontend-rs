import React from 'react';
import { useTranslation } from 'react-i18next';
import './Banner.css';

function Banner() {

    const { t } = useTranslation();

    return (
        <section className="banner">
            <p className="banner__title">{t('banner.text', ' Уважаемые пользователи, на сайте ведутся технические работы, прием заказов через сайт не доступен. Заказы принимаются через телефон и')}
                <a className="banner__href"
                    target="_blank"
                    href="https://t.me/YUME_SUSHI_bot"
                    rel="noreferrer noopener">&nbsp;{t('banner.telegram', 'Телеграм')}
                </a>
            </p>
        </section>
    );
}

export default Banner;