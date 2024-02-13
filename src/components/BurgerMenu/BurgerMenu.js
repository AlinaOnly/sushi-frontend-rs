import React from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';

function BurgerMenu({ isBurger, handleBurgerMenu, language, dishes }) {

    // Получаем уникальные категории блюд массивом уникальных данных
    const uniqueCategories = Array.from(new Set(dishes.flatMap(dish => dish.category.map(cat => cat.slug))));

    // Функция для получения названия категории в зависимости от языка
    const getCategoryName = (slug) => {
        const category = dishes.flatMap(dish => dish.category).find(cat => cat.slug === slug);
        return category
            ? category.translations[language]?.name || category.translations['en'].name
            : slug;
    };

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
                    {uniqueCategories.map((slug) => (
                        <li key={slug} className="burger-menu__list">
                            <NavLink
                                onClick={handleBurgerMenu}
                                className={({ isActive }) => (isActive ? "burger-menu__link-active" : "burger-menu__link app__button-opacity")}
                                to={`/${slug}`}>
                                {getCategoryName(slug)}
                            </NavLink>
                        </li>
                        
                    ))}
                </ul>
            </div> 
        </section>
    );
}

export default BurgerMenu;
