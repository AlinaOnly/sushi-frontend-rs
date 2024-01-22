import React from 'react';
import { NavLink } from 'react-router-dom';
import './CategoryMenu.css';

function CategoryMenu({ handleBurgerMenu }) {

    return (
        <div className="burger-category">
            <NavLink className={({ isActive }) => (isActive ? "burger-category__link-active" : "burger-category__link")}
                to="/">Все меню
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? "burger-category__link-active" : "burger-category__link")}
                to="/rolls">Роллы
            </NavLink>  
            <NavLink className={({ isActive }) => (isActive ? "burger-category__link-active" : "burger-category__link")}
                to="/futomaki">Футомаки
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? "burger-category__link-active" : "burger-category__link")}
                to="/backed">Запеченые ролы
            </NavLink>
                <button 
                    onClick={handleBurgerMenu}
                    className="burger-category__button app__button-opacity" 
                    aria-label="Бургер">
                </button>
        </div>
    );
}

export default CategoryMenu;