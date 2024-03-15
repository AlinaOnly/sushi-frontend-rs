import React, { useEffect, useContext } from 'react';
import  { NavLink, Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/FormValidation';
import account from '../../images/account.svg';
import i18next from '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import './HeaderBurger.css';

function HeaderBurger({ 
        burgerHeader,
        handleBurgerHeader,
        language,
        onLanguageChange,
        aboutUs,
        selectedCity,
        onCitySelected
    }) {

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

    if (!aboutUs || !aboutUs[0].restaurants) {
        return null;
    }

    const handleCityChange = (event) => {
        const city = event.target.value;
        onCitySelected(city); // Здесь подразумевается, что onCitySelected обновляет значение selectedCity
    };

    // Фильтрация ресторанов для выбранного города
    const filteredRestaurants = aboutUs && aboutUs.length > 0
    ? aboutUs.find(cityData => cityData.city === selectedCity)?.restaurants || []
    : [];

    return (
        <section className={burgerHeader ? `header-burger-menu header-burger-menu_open` : 'header-burger-menu'}>
            <div className="header-burger-menu__container">
                <button
                    onClick={handleBurgerHeader}
                    aria-label="Закрыть"
                    type="button"
                    className="header-burger-menu__close app__button-opacity">
                </button>
                <div className="header-burger-menu__lists">
                    <NavLink className={({ isActive }) => (isActive ? "header-burger__link-active app__text-opacity" : "header-burger__link app__text-opacity")}
                        to="/"
                        onClick={handleBurgerHeader}>
                            {t('header-burger.menu', 'Меню')}
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "header-burger__link-active app__text-opacity" : "header-burger__link app__text-opacity")}
                        to="/contacts"
                        onClick={handleBurgerHeader}>
                            {t('header-burger.about', 'О нас')}
                    </NavLink>  
                    <NavLink className={({ isActive }) => (isActive ? "header-burger__link-active app__text-opacity" : "header-burger__link app__text-opacity")}
                        to="/promo"
                        onClick={handleBurgerHeader}>
                            {t('header-burger.promo', 'Промо')}
                    </NavLink>
                    <select 
                        className="header-burger__select header-burger__select-wd_lang app__text-opacity" 
                        id="language" 
                        name="selectedLanguage" 
                        value={language}
                        onChange={handleLanguageChange}>
                            <option className="header__select-language" value="ru">Ru</option>
                            <option className="header__select-language" value="sr-latn">Sr</option>
                            <option className="header__select-language" value="en">En</option>
                    </select>
                    <select className="header-burger__select header-burger__select-wd_city app__text-opacity" onChange={handleCityChange} value={selectedCity}>
                        {aboutUs.map(cityData => (
                            <optgroup label={cityData.city} key={cityData.city}>
                                {cityData.restaurants.map(restaurant => (
                                <option key={restaurant.id} value={restaurant.address}>
                                    {restaurant.address}
                                </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                    <p className="header-burger__phone">
                        <a  
                            className="header__phone-ref app__text-opacity"
                            href="tel:+381612714798"
                            target="_blank"
                            rel="noreferrer noopener">
                                +381 61 2714798
                        </a>
                    </p>
                </div>
                    <Link to="/profile" className="header-burger-menu__profile">
                        <button
                            onClick={handleBurgerHeader}
                            aria-label="Аккаунт"
                            className="header-burger-menu__profile-button app__button-opacity">
                                {values.first_name ? values.first_name : t('header-burger.account', 'Аккаунт')}
                                <img src={account} alt="Логотип аккаунта" className="header__account-logo app__button-opacity"/>
                        </button>
                    </Link>
            </div>
        </section>
    );
}

export default HeaderBurger;