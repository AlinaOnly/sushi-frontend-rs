import React from 'react';
import { NavLink } from 'react-router-dom';
import './CategoryMenu.css';

function CategoryMenu({ handleBurgerMenu, language, dishes }) {

    // Функция для генерации списка уникальных категорий только для роллов и футомаки
    const uniqueCategories = Array.from(new Set(dishes.flatMap(dish =>
        dish.category
            .filter(cat => cat.slug === 'rolls' || cat.slug === 'futomaki')
            .map(cat => cat.slug)
    )));

    // Функция для получения названия категории в зависимости от языка
    const getCategoryName = (slug) => {
        const category = dishes.flatMap(dish => dish.category).find(cat => cat.slug === slug);
        return category
            ? category.translations[language]?.name || category.translations['en'].name
            : slug;
    };

    return (
        <div className="burger-category">
            <NavLink className={({ isActive }) => (isActive ? "burger-category__link-active app__text-opacity" : "burger-category__link app__text-opacity")}
                to="/">Все меню
            </NavLink>
            {uniqueCategories.map(slug => (
                <NavLink
                    key={slug}
                    className={({ isActive }) => isActive ? "burger-category__link-active app__text-opacity" : "burger-category__link app__text-opacity"}
                    to={`/${slug}`}>
                    {getCategoryName(slug)}
                </NavLink>
            ))}
                <button 
                    onClick={handleBurgerMenu}
                    className="burger-category__button app__button-opacity app__text-opacity" 
                    aria-label="Бургер">Ещё...
                </button>
        </div>
    );
}

export default CategoryMenu;