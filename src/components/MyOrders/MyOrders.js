import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import './MyOrders.css';


function MyOrders({ orders }) {
    return (
        <>
            <ProfileNav />
            <section className="orders" >
                <h2 className="orders__title">История заказов</h2>
                <div className="orders__container">
                    <p className="orders__text">У Вас пока нет заказов</p>
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
                                Повторить этот заказ
                            </button>
                        </div>
                    ))
                }    
            </section>
        </>
        
    );
}

export default MyOrders;