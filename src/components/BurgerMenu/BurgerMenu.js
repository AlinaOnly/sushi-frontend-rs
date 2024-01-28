import React from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';

function BurgerMenu({ isBurger, handleBurgerMenu }) {

    return (
        <section className={isBurger ? `burger-menu burger-menu_open` : "burger-menu"}>
            <div className="burger-menu__container">
                <button
                    onClick={handleBurgerMenu}
                    aria-label="Закрыть"
                    type="button"
                    className="burger-menu__close app__button-opacity">
                </button>
                <ul className="burger-menu__lists">
                    <li className="burger-menu__list">
                        <NavLink 
                            onClick={handleBurgerMenu}
                            to="/backed"
                            className={({ isActive }) => (isActive ? "burger-menu__link-active" : "burger-menu__link app__button-opacity")}>
                            Запеченые ролы
                        </NavLink>
                    </li>
                    <li className="burger-menu__list">
                        <NavLink 
                            onClick={handleBurgerMenu}
                            to="/tempura" 
                            className={({ isActive }) => (isActive ? "burger-menu__link-active" : "burger-menu__link app__button-opacity")}>
                            Горячие роллы/темпура
                        </NavLink>
                    </li>
                    <li className="burger-menu__list">
                        <NavLink 
                            onClick={handleBurgerMenu}
                            to="/sandochi" 
                            className={({ isActive }) => (isActive ? "burger-menu__link-active" : "burger-menu__link app__button-opacity")}>
                            Сандочи
                        </NavLink>
                    </li>
                    <li className="burger-menu__list">
                        <NavLink 
                            onClick={handleBurgerMenu}
                            to="/handrolls" 
                            className={({ isActive }) => (isActive ? "burger-menu__link-active" : "burger-menu__link app__button-opacity")}>
                            Хэнд роллы
                        </NavLink>
                    </li>
                    <li className="burger-menu__list">
                        <NavLink 
                            onClick={handleBurgerMenu}
                            to="/maki" 
                            className={({ isActive }) => (isActive ? "burger-menu__link-active" : "burger-menu__link app__button-opacity")}>
                            Маки
                        </NavLink>
                    </li>
                    <li className="burger-menu__list">
                        <NavLink 
                            onClick={handleBurgerMenu}
                            to="/sushi" 
                            className={({ isActive }) => (isActive ? "burger-menu__link-active" : "burger-menu__link app__button-opacity")}>
                            Суши и гунканы
                        </NavLink>
                    </li>
                    <li className="burger-menu__list">
                        <NavLink 
                            onClick={handleBurgerMenu}
                            to="/woks" 
                            className={({ isActive }) => (isActive ? "burger-menu__link-active" : "burger-menu__link app__button-opacity")}>
                            Воки
                        </NavLink>
                    </li>
                    <li className="burger-menu__list">
                        <NavLink 
                            onClick={handleBurgerMenu}
                            to="/soups" 
                            className={({ isActive }) => (isActive ? "burger-menu__link-active" : "burger-menu__link app__button-opacity")}>
                            Супы
                        </NavLink>
                    </li>
                    <li className="burger-menu__list">
                        <NavLink 
                            onClick={handleBurgerMenu}
                            to="/vegan" 
                            className={({ isActive }) => (isActive ? "burger-menu__link-active" : "burger-menu__link app__button-opacity")}>
                            Веганское
                        </NavLink>
                    </li>
                </ul>
            </div> 
        </section>
    );
}

export default BurgerMenu;
