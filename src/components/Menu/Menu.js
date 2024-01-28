import React from 'react';
import { Link } from 'react-router-dom';
import HeaderBurger from '../HeaderBurger/HeaderBurger';
import logo from '../../images/logo.jpeg';
import './Menu.css';

function Menu({ handleBurgerHeader }) {
    return (
        <section className="menu">
            <Link to="/">
                <img src={logo} alt="Логотип сайта Movie" className="header__logo app__button-opacity"/>
            </Link>
            <div className="header__nav">
                <HeaderBurger />
            </div>
            <button 
                onClick={handleBurgerHeader}
                className="header__button-burger app__button-opacity"
                aria-label="Бургер">
            </button>
        </section>
    );
}

export default Menu;