import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import HeaderBurger from '../HeaderBurger/HeaderBurger';
import logo from '../../images/logo.jpeg';
import cart from '../../images/cart.svg';
import './HeaderMenu.css';

function HeaderMenu({ handleBurgerHeader }) {
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
                    <p className="header__submit-button-counters">0</p>
                </button>
            </NavLink>
        </section>
    );
}

export default HeaderMenu;