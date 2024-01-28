import React, {useEffect, useContext} from 'react';
import  { NavLink, Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/FormValidation';
import account from '../../images/account.svg';
import './HeaderBurger.css';

function HeaderBurger({ burgerHeader, handleBurgerHeader }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, setValues } = useFormValidation();

    useEffect(() => {
        setValues({
            first_name: currentUser.first_name,
        });
    }, [currentUser, setValues]);

    return (
        <section className={burgerHeader ? `header-burger-menu header-burger-menu_open` : 'header-burger-menu'}>
            <div className="header-burger-menu__container">
                <button
                    onClick={handleBurgerHeader}
                    aria-label="Закрыть"
                    type="button"
                    className="header-burger-menu__close app__button-opacity">
                </button>
                <NavLink className={({ isActive }) => (isActive ? "header__link-active" : "header__link")}
                    to="/">Меню
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? "header__link-active" : "header__link")}
                    to="/contacts">Kонтакты
                </NavLink>  
                <NavLink className={({ isActive }) => (isActive ? "header__link-active" : "header__link")}
                    to="/promo">Промо
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