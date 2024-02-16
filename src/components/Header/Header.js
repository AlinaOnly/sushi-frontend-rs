import {React, useContext, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import account from '../../images/account.svg';
import cart from '../../images/cart.svg';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/FormValidation';
import i18next from '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import './Header.css';

function Headers({ language, onLanguageChange }) {

    const { t } = useTranslation();

    const currentUser = useContext(CurrentUserContext);
    const { values, setValues } = useFormValidation();

    useEffect(() => {
        setValues({
            first_name: currentUser.first_name,
        });
    }, [currentUser, setValues]);

    const handleLanguageChange = (event) => {
        let selectedLanguage = event.target.value;
        if (selectedLanguage === 'sr') {
            selectedLanguage = 'sr-latn';
        }
        i18next.changeLanguage(selectedLanguage); // Обновление текущего языка в i18next
        onLanguageChange(selectedLanguage);
    };

    return (
        <header className="header">
            <div className="header__container-links">
                <NavLink className={({ isActive }) => (isActive ? "header__link-active app__text-opacity" : "header__link app__text-opacity")}
                    to="/">{t('header.menu', 'Меню')}
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? "header__link-active app__text-opacity" : "header__link app__text-opacity")}
                    to="/contacts">{t('header.about', 'О нас')}
                </NavLink>  
                <NavLink className={({ isActive }) => (isActive ? "header__link-active app__text-opacity" : "header__link app__text-opacity")}
                    to="/promo">{t('header.promo', 'Промо')}
                </NavLink>
                    <p className="header__phone">
                        <a  
                            className="header__phone-ref app__text-opacity"
                            href="tel:+381612714798"
                            target="_blank"
                            rel="noreferrer noopener">
                            +381 61 2714798
                        </a>
                    </p> 
            </div>
            <Link to="/">
                <div className="header__logo-container app__button-opacity">
                    <img src={logo} alt="Логотип сайта Sushi" className="header__logo"/>
                </div>
            </Link>
            <div className="header__container-select">
                <select className="header__select app__text-opacity" id="city" name="selectedCity">
                    <option className="header__select-city" value="beograd">Beograd</option>
                </select>
                <select
                    className="header__select app__text-opacity"
                    id="language"
                    name="selectedLanguage"
                    value={language}
                    onChange={handleLanguageChange}>
                        <option className="header__select-language" value="ru">Ru</option>
                        <option className="header__select-language" value="sr-latn">Sr</option>
                        <option className="header__select-language" value="en">En</option>
                </select>
            <NavLink 
                className={({ isActive }) => (isActive ? "header__link-acc header__link-active" : "header__link-acc header__link")}
                to="/profile">
                    {values.first_name ? values.first_name : t('header.account', 'Аккаунт')}
                <img src={account} alt="Логотип аккаунта" className="header__account-logo app__button-opacity"/>
            </NavLink>
            <NavLink className="header__link-button" to="/cart">
                <button 
                    className="header__cart-button app__button-opacity" 
                    type="submit"
                    aria-label="Корзина">
                        {t('header.cart', 'Корзина')}
                    <img src={cart} alt="Логотип корзины" className="header__image-button-cart"/>
                    <p className="header__submit-button-counters">0</p>
                </button>
            </NavLink>
            </div>
        </header>
    );
}

export default Headers;