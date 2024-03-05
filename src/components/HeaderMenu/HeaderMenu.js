import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import HeaderBurger from '../HeaderBurger/HeaderBurger';
import logo from '../../images/logo.png';
import cart from '../../images/cart.svg';
import './HeaderMenu.css';

function HeaderMenu({ handleBurgerHeader, cartData }) {

    // Функция для подсчета товаров в корзине
    const getCountOfCartItems = () => {
        let count = 0;
        // Перебираем все элементы и суммируем их количество
        for (const item of cartData) {
        count += item.quantity;
        }
        return count;
    };

    return (
        <section className="menu">
            <button 
                onClick={handleBurgerHeader}
                className="header__button-burger app__button-opacity"
                aria-label="Бургер">
            </button>
            <div className="header__nav">
                <HeaderBurger />
            </div>
            <Link to="/">
                <img src={logo} alt="Логотип сайта Movie" className="header-menu__logo app__button-opacity"/>
            </Link>
            
            <NavLink className="header-menu__link-button" to="/cart">
                <button 
                    className="header-menu__cart-button app__button-opacity" 
                    type="submit"
                    aria-label="Корзина">
                    <img src={cart} alt="Логотип корзины" className="header__image-button-cart"/>
                    <p className="header__submit-button-counters">{getCountOfCartItems()}</p>
                </button>
            </NavLink>
        </section>
    );
}

export default HeaderMenu;