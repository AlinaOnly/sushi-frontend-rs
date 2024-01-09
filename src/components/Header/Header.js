import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.jpeg';
import account from '../../images/account.svg';
import cart from '../../images/cart.svg';
import './Header.css';

function Headers() {
    return (
        <header className="header">
        
            <div className="header__container-links">
                <NavLink className={({ isActive }) => (isActive ? "header__link-active" : "header__link")}
                    to="/">Меню
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? "header__link-active" : "header__link")}
                    to="/contacts">Kонтакты
                </NavLink>  
                <NavLink className={({ isActive }) => (isActive ? "header__link-active" : "header__link")}
                    to="/promo">Промо
                </NavLink>
                
            </div>
            
            <div className="header__logo-container">
                <img src={logo} alt="Логотип сайта Sushi" className="header__logo"/>
            </div>

            <div className="header__container-select">
                <select className="header__select" id="city" name="selectedCity">
                <option className="header__select-city" value="beograd">Beograd</option>
            </select>
            <p className="header__phone">
                    <a  
                        className="header__phone-ref app__text-opacity"
                        href="tel:+381612714798"
                        target="_blank"
                        rel="noreferrer noopener">
                        +381 61 2714798
                    </a>
            </p> 
            <select className="header__select" id="language" name="selectedLanguage">
                <option className="header__select-language" value="sr">Sr</option>
                <option className="header__select-language" value="ru">Ru</option>
                <option className="header__select-language" value="en">En</option>
            </select>
            <NavLink className={({ isActive }) => (isActive ? "header__link-acc header__link-active" : "header__link-acc header__link")}
                to="/auth/users/me/">
                Аккаунт
                <img src={account} alt="Логотип аккаунта" className="header__account-logo app__button-opacity"/>
            </NavLink>
            <NavLink className="header__link-button" to="/cart">
                <button 
                    className="header__cart-button app__button-opacity" 
                    type="submit"
                    aria-label="Корзина">
                    Корзина
                    <img src={cart} alt="Логотип корзины" className="header__image-button-cart"/>
                    <p className="header__submit-button-counters">0</p>
                </button>
            </NavLink>
            </div>
        </header>
    );
}

export default Headers;