import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import { useTranslation } from 'react-i18next';
import './MyOrders.css';


function MyOrders({ orders }) {

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

export default MyOrders;