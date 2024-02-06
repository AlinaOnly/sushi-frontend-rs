import React, {useEffect, useContext} from 'react';
import  { NavLink, Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/FormValidation';
import account from '../../images/account.svg';
import './HeaderBurger.css';

function HeaderBurger({ burgerHeader, handleBurgerHeader, language, onLanguageChange }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, setValues } = useFormValidation();

    useEffect(() => {
        setValues({
            first_name: currentUser.first_name,
        });
    }, [currentUser, setValues]);

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        onLanguageChange(selectedLanguage);
    };

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
                    <NavLink className={({ isActive }) => (isActive ? "header-burger__link-active" : "header-burger__link")}
                        to="/"
                        onClick={handleBurgerHeader}>
                            Меню
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "header-burger__link-active" : "header-burger__link")}
                        to="/contacts"
                        onClick={handleBurgerHeader}>
                            О нас
                    </NavLink>  
                    <NavLink className={({ isActive }) => (isActive ? "header-burger__link-active" : "header-burger__link")}
                        to="/promo"
                        onClick={handleBurgerHeader}>
                            Промо
                    </NavLink>
                    <select 
                        className="header-burger__select" 
                        id="language" 
                        name="selectedLanguage" 
                        value={language}
                        onChange={handleLanguageChange}>
                            <option className="header__select-language" value="ru">Ru</option>
                            <option className="header__select-language" value="sr-latn">Sr</option>
                            <option className="header__select-language" value="en">En</option>
                    </select>
                    <select className="header-burger__select" id="city" name="selectedCity">
                        <option className="header-burger__select-city" value="beograd">Beograd</option>
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
                                {values.first_name || 'Аккаунт'}
                                <img src={account} alt="Логотип аккаунта" className="header__account-logo app__button-opacity"/>
                        </button>
                    </Link>
            </div>
        </section>
    );
}

export default HeaderBurger;