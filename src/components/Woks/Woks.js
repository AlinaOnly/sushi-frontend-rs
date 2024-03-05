import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Woks({ dishes, handleBurgerMenu, onDishClick, language, onAddToCart }) {

    const woksDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "woks"));

     // Получаем название категории, соответствующее текущему языку
    const categoryName = woksDishes.length > 0
        ? woksDishes[0].category.find(cat => cat.slug === "woks").translations[language]?.name || "Woks"
        : "Woks";

    return (
        <>
            <CategoryMenu 
                handleBurgerMenu={handleBurgerMenu}
                language={language}
                dishes={dishes}
            />
            <section className="dishes__cards">
                <div className="dishes__card-lists">
                    <p className="dishes__categories">{categoryName}</p>
                    <ul className="dishes__card-list">
                        {woksDishes.map(dish => (
                            <DishesCard
                                dish={dish}
                                key={dish.article}
                                isCartDishes={dish.isCartDishes}
                                onDishClick={onDishClick}
                                language={language}
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Woks;