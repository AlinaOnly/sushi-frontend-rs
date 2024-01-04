import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import './MyOrders.css';


function MyOrders() {
    return (
        <>
            <ProfileNav />
            <section className="orders" >
                <h2 className="orders__title">История Ваших заказов</h2>
                <div className="orders__container">
                    <p className="orders__text">У Вас пока нет заказов</p>
                </div>
            </section>
        </>
        
    );
}

export default MyOrders;