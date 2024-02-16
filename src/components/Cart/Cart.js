import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import empty from '../../images/empty-cart.svg';
//import imbir from '../../images/imbir.jpg';
import { useTranslation } from 'react-i18next';
import './Cart.css';


function Cart({ dishes, dish }) {
    const navigate = useNavigate();

    const { t } = useTranslation();

    return (
        <>
            <div className="cart">
                <h2 className="cart__title">{t('cart.empty', 'В корзине пусто!')}</h2>
                <img src={empty} className="cart__img-empty" alt="Пустая корзина"/>
                <p className="cart__text">{t('cart.add', 'Добавьте что-нибудь из нашего меню!')}</p>
                <button 
                    onClick={() => navigate('/')}
                    aria-label="Назад в меню"
                    type="button"
                    className="cart__btn-back app__button-opacity">{t('cart.back', 'Назад в меню')}
                </button>
            </div>

             <div className="cart">
                <h2 className="cart__title">{t('cart.in_your_cart', 'В Вашей корзине')}</h2>
                <div className="cart__products">
                    <img className="cart__product-image" src={dishes.image} alt="Фото заказанного товара" />
                    <p className="cart__product-name">{dishes.short_name_rus}</p>
                    <div className="cart__container-count">
                        <p className="cart__product-price">{dishes.final_price} RSD</p>
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
                        className="cart__btn-products_clean app__button-opacity">{t('cart.clear_cart', 'Очистить корзину')}
                    </button>

                <div className="cart__slider">
                    <p className="cart__text-slider">{t('cart.add_to_your_order', 'Добавьте к себе в заказ:')}</p>
                    <Carousel/>
                </div>
                
                <div className="cart__promo">
                    <label className="cart__promo-label" htmlFor="promo">{t('cart.promo_code', 'Промокод:')}
                        <input
                            id="promo"
                            className="cart__promo-input"
                            name="promo"
                            type="text"/>
                        </label>
                    <button 
                        aria-label="Применить"
                        type="submit"
                        className="cart__btn-promo app__button-opacity">{t('cart.apply', 'Применить')}
                    </button>
                </div>
                <div className="cart__results">
                    <p className="cart__text-price">{t('cart.total', 'Итого:')}</p>
                    <p className="cart__product-price">{dishes.final_price} RSD</p>
                </div>
                <div className="cart__delivery">
                    <p className="cart__order-text">{t('cart.checkout', 'Оформить заказ')}</p>
                    <Link to="/delivery">
                        <button 
                            aria-label="Доставка"
                            type="button"
                            className="cart__btn-delivery app__button-opacity">{t('cart.delivery', 'Доставка')}
                        </button>
                    </Link>
                    <Link to="/pickup">
                        <button 
                            aria-label="Заберу сам"
                            type="button"
                            className="cart__btn-pickup app__button-opacity">{t('cart.pick_up_myself', 'Заберу сам')}
                        </button>
                    </Link>
                </div>
            </div> 
        </>
    );
}

export default Cart;