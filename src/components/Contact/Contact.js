import React from 'react';
import { useTranslation } from 'react-i18next';
import MyGoogleMap from '../../utils/MyGoogleMap';
import './Contact.css';

function Contacts({ aboutUs, language }) {
    const { t } = useTranslation();

    // Если aboutUs еще недоступен, отображаем сообщение загрузки
    if (!aboutUs) {
        return null;
    }

    // Деструктурируем delivery из aboutUs
    const { restaurants, delivery } = aboutUs;

    // Созданем массив координат ресторанов для карты
    const locations = restaurants.map(restaurant => ({
        lat: restaurant.coordinates.latitude,
        lng: restaurant.coordinates.longitude,
    }));

    return (
        <>
        <div className="contacts">
            <h2 className="contacts__title">{t('contacts.title', 'О нас')}</h2>
            <div className="contacts__container">
                {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="contact__container">
                    <p className="contact__article">{restaurant.short_name}</p>
                    <p className="contact__description">{restaurant.city}</p>
                    <p className="contact__description">{restaurant.address}</p>
                    <p className="contact__description">{t('contacts.time', 'Рабочее время:')} {restaurant.work_hours}</p>
                    <p className="contact__description">{t('contacts.phone', 'Телефон для заказов:')} {restaurant.phone}</p>
                        {restaurant.coordinates && (
                            <div className="contact__coordinats">
                                <MyGoogleMap locations={locations} /> 
                            </div>
                        )}
                        {restaurant.image && (
                            <img src={restaurant.image} alt={`Изображение ${restaurant.short_name}`} className="contact__image"/>
                        )}
                </div>
                ))}
            </div>
                <div className="contacts__delivery">
                    {delivery.map((item) => (
                        <div key={item.id} className="contacts__delivery-item">
                            <p className="contacts__delivery-description">
                                {item.translations[language]?.description}
                            </p>
                            {item.image && (
                                <img src={item.image} alt="Изображение доставки" className="contact__image"/>
                            )}
                        </div>
                    ))}
                </div>
        </div>
        </>
    );
}

export default Contacts;