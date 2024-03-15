import React from 'react';
import { useTranslation } from 'react-i18next';
import MyGoogleMap from '../../utils/MyGoogleMap';
import './Contact.css';

function Contacts({ aboutUs, language }) {

    const { t } = useTranslation();

    // Если aboutUs еще не загружены или данные некорректны, отображаем сообщение загрузки
    // Проверяем, загружены ли данные aboutUs
    if (!aboutUs || !Array.isArray(aboutUs) || aboutUs.length === 0) {
        return null;
    }

    // Деструктурируем delivery из aboutUs
    const { restaurants, delivery } = aboutUs[0];

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
                    {aboutUs.map(cityInfo => (
                        cityInfo.restaurants.map((restaurant) => {
                            return (
                                <div key={restaurant.id} className="contact__container">
                                    <p className="contact__description">{cityInfo.city}</p>
                                    <p className="contact__description">{restaurant.address}</p>
                                    <p className="contact__description">{t('contacts.time', 'Рабочее время')}: {restaurant.open_time} - {restaurant.close_time}</p>
                                    <p className="contact__description">{t('contacts.phone', 'Телефон для заказов')}: {restaurant.phone}</p>
                                    <div className="contact__map">
                                        <MyGoogleMap locations={locations} />
                                    </div>
                                </div>
                            )
                        })
                    ))}
                </div>
                <div className="contacts__delivery">
                    {
                        aboutUs.flatMap(({ delivery }) => delivery.map(deliveryItem => (
                            <div key={deliveryItem.id} className="contacts__delivery-item">
                                <p className="contacts__delivery-description">
                                    {deliveryItem.translations[language]?.description}
                                </p>
                            </div>
                        )))
                    }
                </div>
            </div>
        </>
    );
}

export default Contacts;