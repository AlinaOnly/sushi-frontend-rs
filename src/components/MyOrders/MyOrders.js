import React, {useContext, useState} from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import { useTranslation } from 'react-i18next';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './MyOrders.css';

function MyOrders({ orders, onAddToCart }) {

    const { t, i18n } = useTranslation();

    const [clickedBtns, setClickedBtns] = useState({});

    //const currentUser = useContext(CurrentUserContext);

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

    const translateDish = (translations, key) => {
        if (!translations) return 'Название не найдено';
        const translation = translations[currentLanguage] || translations['ru'] || {};
        return translation[key] || translation['short_name'] || 'Название не найдено';
    };

    function handleAddToCartClick(order) {
        order.orderdishes.forEach(orderDish => {
            console.log('Adding My order to cart:', order);
            // Вычисляем final_price на основе количества и общей суммы
            const finalPrice = orderDish.quantity > 1
                ? parseFloat(orderDish.amount) / orderDish.quantity
                : parseFloat(orderDish.amount);
            // Создаем объект с блюдом для добавления в корзину.
            const cartDish = {
                article: orderDish.dish.article,
                id: orderDish.dish.id,
                image: orderDish.dish.image,
                translations: orderDish.dish.translations,
                final_price: finalPrice,
                quantity: orderDish.quantity
            };
            onAddToCart(cartDish);
        });
        // Обновим состояние clickedBtns для UI
        setClickedBtns(prev => ({
            ...prev,
            [order.order_number]: true
        }));
    }

    return (
        <>
            <ProfileNav />
            <section className="orders">
                <h2 className="orders__title">{t('orders.order_history', 'История заказов')}</h2>
                <div className="orders__container">
                    {lastFiveOrders.length > 0 ? (
                        lastFiveOrders.map(order => (
                            <div className="order" key={order.order_number}>
                                <h3 className="order__status">{t(`orders.statuses.${order.status.toLowerCase()}`, order.status)}</h3>
                                {order.orderdishes.map((item) => (
                                    <div key={`${order.order_number}-${item.dish.article}`} className="order__dishes">
                                        <img src={item.dish.image} alt={translateDish(item.dish.translations, 'short_name')}  className="order__dish-image" />
                                        <p className="order_item-name">{translateDish(item.dish.translations, 'short_name')} </p>
                                        <p className="order_item-text">{translateDish(item.dish.translations, 'text')}</p>
                                        <p>{`${t('orders.quantity', 'Количество')}: ${ item.quantity }`}</p>
                                        <p>{t('orders.amount', 'Стоимость')}:&nbsp;
                                            <span style={{ color: 'red' }}>{item.amount} RSD</span> 
                                        </p>
                                    </div>
                                ))}
                                <p className="order__created">{`${t('orders.created', 'Заказ создан')}: ${formatDate(order.created)}`}</p>
                                <p className="order__amount">
                                    {t('orders.final_amount', 'Финальная сумма заказа')}:&nbsp; 
                                        <span style={{ color: 'red' }}>{order.final_amount_with_shipping} RSD</span> 
                                </p>
                                <button 
                                    onClick={() => handleAddToCartClick(order)}
                                    className={clickedBtns[order.order_number] ? "app__button-opacity order__submit-button_active" : "order__submit-button"}
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