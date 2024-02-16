import React from 'react';
import map from '../../images/map.jpg';
import { useTranslation } from 'react-i18next';
import './Contact.css';


function Contacts() {

    const { t } = useTranslation();

    return (
        <>
            <div className="contacts">
            <h2 className="contacts__title">{t('contacts.title', 'О нас')}</h2>
                <div className="contacts__container">
                    <p className="contacts__article">Телефон для заказов: +381 61 2714798
                        Рабочее время: 09:00-23:00
                        Адреса: Милована Миловановича 4, г. Белград, Сербия.
                    </p>
                    <p className="contacts__description">Бесплатная доставка в районы Стари Град, Врачар, Дорчол, Белград на Води.
                        Бесплатная доставка доступна для всех заказов на сумму от 2400 RSD. 
                        В другие районы доставка также возможна, но необходимо предварительно уточнить у администратора.
                    </p>
                </div>
                <img src={map} alt="Карта Доставки" className="contacts__image"/>
            </div>
        </>
    );
}

export default Contacts;