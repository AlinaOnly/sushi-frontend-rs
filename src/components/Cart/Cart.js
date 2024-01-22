import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import empty from '../../images/empty-cart.svg';
import imbir from '../../images/imbir.jpg';
import './Cart.css';


function Cart({ dish }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="cart">
                <h2 className="cart__title">В Вашей корзине пусто!</h2>
                <img src={empty} className="cart__img-empty" alt="Пустая корзина"/>
                <p className="cart__text">Добавьте что-нибудь из нашего меню!</p>
                <button 
                    onClick={() => navigate('/')}
                    aria-label="Назад в меню"
                    type="button"
                    className="cart__btn-back app__button-opacity">Назад в меню
                </button>
            </div> 



            <div className="cart">
                <h2 className="cart__title">В Вашей корзине</h2>
                <div className="cart__products">
                    <img className="cart__product-image" src={imbir} alt="Фото заказанного товара" />
                    <p className="cart__product-name">Умаки</p>
                    <div className="cart__container-count">
                        <p className="cart__product-price">1000 RSD</p>
                        <button
                            aria-label="Плюс"
                            type="button"
                            className="cart__btn-product_delete app__button-opacity">
                        </button>
                        <p className="cart__product-count">1</p>
                        <button
                            aria-label="Минус"
                            type="button"
                            className="cart__btn-product_add app__button-opacity">
                        </button>
                    </div>
                </div>    
                    <button
                        aria-label="Очистить корзину"
                        type="button"
                        className="cart__btn-products_clean app__button-opacity">Очистить корзину
                    </button>

                <div className="cart__slider">
                    <p className="cart__text-slider">Добавьте к себе в заказ:</p>
                    <Carousel/>
                </div>
                
                <div className="cart__promo">
                    <label className="cart__promo-label" htmlFor="promo">Промокод:
                        <input
                            id="promo"
                            className="cart__promo-input"
                            name="promo"
                            type="text"/>
                        </label>
                    <button 
                        aria-label="Применить"
                        type="submit"
                        className="cart__btn-promo app__button-opacity">Применить
                    </button>
                </div>
                <div className="cart__results">
                    <p className="cart__text-price">Итого заказ: </p>
                    <p className="cart__product-price">3000 RSD</p>
                </div>
                <div className="cart__delivery">
                    <p className="cart__order-text">Оформить заказ</p>
                    <Link to="/delivery">
                        <button 
                            aria-label="Доставка"
                            type="button"
                            className="cart__btn-delivery app__button-opacity">Доставка
                        </button>
                    </Link>
                    <Link to="/pickup">
                        <button 
                            aria-label="Заберу сам"
                            type="button"
                            className="cart__btn-pickup app__button-opacity">Заберу сам
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Cart;