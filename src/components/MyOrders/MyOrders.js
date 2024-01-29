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
                        <div className="carousel" key={order.id}>
                            <h3 className="carousel__title">{order.status}</h3>
                            <p className="carousel__city">{order.dishes}</p>
                            <p className="carousel__text">{order.amount}</p>
                            <p className="carousel__date">{order.created}</p>
                        </div>
                        ))
                    }    
            </section>
        </>
        
    );
}

export default MyOrders;