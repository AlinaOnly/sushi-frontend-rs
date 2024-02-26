import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import { useTranslation } from 'react-i18next';
import './MyOrders.css';


/*function MyOrders({ orders }) {

    const { t } = useTranslation();

    return (
        <>
            <ProfileNav />
            <section className="orders" >
                <h2 className="orders__title">{t('orders.order_history', 'История заказов')}</h2>
                <div className="orders__container">
                    <p className="orders__text">{t('orders.no_orders_yet', 'У Вас пока нет заказов')}</p>
                </div>
                {orders.map(order => (
                        <div className="order" key={order.id}>
                            <h3 className="order__status">{order.status}</h3>
                            <p className="order__dishes">{order.dishes}</p>
                            <p className="order__amount">{order.amount}</p>
                            <p className="order__created">{order.created}</p>
                        <button 
                            className="app__text-opacity order__submit-button"
                            type="submit"
                            aria-label="Повторить этот заказ">
                                {t('orders.repeat_this_order', 'Повторить этот заказ')}
                            </button>
                        </div>
                    ))
                }    
            </section>
        </>
        
    );
}

export default MyOrders;*/

function MyOrders({ orders, language }) {

    const { t, i18n } = useTranslation();

    const currentLanguage = i18n.language;

    const lastFiveOrders = orders.slice(-5); // Получаем последние 5 заказов

    const formatDate = (dateString) => {
        // Меняем порядок элементов с DD.MM.YYYY в YYYY-MM-DD
        const [day, month, yearAndTime] = dateString.split('.');
        const [year, time] = yearAndTime.split(' ');
        const formattedDate = `${year}-${month}-${day} ${time}`;
        // Преобразование в объект Date и возврат строки в локальном формате
        return new Date(formattedDate).toLocaleString(currentLanguage);
    };

    const translateDish = (translations) => {
        // Предполагаем, что 'translations' - это объект с ключами, соответствующими языковым кодам
        try {
            const translationsObject = JSON.parse(translations);
            return translationsObject[currentLanguage] || translationsObject['default'];
        } catch (error) {
            return ''; // В случае ошибки парсинга возвращаем пустую строку
        }
    };

    return (
        <>
            <ProfileNav />
            <section className="orders">
                <h2 className="orders__title">{t('orders.order_history', 'История заказов')}</h2>
                <div className="orders__container">
                    {lastFiveOrders.length > 0 ? (
                        lastFiveOrders.map(order => (
                            <div className="order" key={order.id}>
                                <h3 className="order__status">{t(`orders.statuses.${order.status.toLowerCase()}`, order.status)}</h3>
                                {order.order_dishes.map((item, index) => (
                                    <div key={index} className="order__dishes">
                                        <img src={item.dish.image} alt={translateDish(item.dish.translations)} className="order__dish-image" />
                                        <p>{translateDish(item.dish.translations)}</p>
                                        <p>{t('orders.quantity', { count: item.quantity })}</p>
                                        <p>{`${t('orders.amount')}: ${item.amount}`}</p>
                                    </div>
                                ))}
                                <p className="order__created">{`${t('orders.created', 'Заказ создан')}: ${formatDate(order.created)}`}</p>
                                <p className="order__amount">{`${t('orders.final_amount', 'Финальная сумма заказа')}: ${order.final_amount_with_shipping}`} RSD</p>
                                <button 
                                    className="app__button-opacity order__submit-button"
                                    type="button" 
                                    aria-label={t('orders.repeat_this_order', 'Повторить этот заказ')}>
                                        {t('orders.repeat_this_order', 'Повторить этот заказ')}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="orders__text">{t('orders.no_orders_yet', 'У Вас пока нет заказов')}</p>
                    )}
                </div>    
            </section>
        </>
    );
}

export default MyOrders;