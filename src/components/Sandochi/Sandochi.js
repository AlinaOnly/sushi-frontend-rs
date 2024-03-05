import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Sandochi({ dishes, handleBurgerMenu, onDishClick, language, onAddToCart }) {

    const sandochiDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "sandochi"));

     // Получаем название категории, соответствующее текущему языку
    const categoryName = sandochiDishes.length > 0
        ? sandochiDishes[0].category.find(cat => cat.slug === "sandochi").translations[language]?.name || "Sandochi"
        : "Sandochi";

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
                        {sandochiDishes.map(dish => (
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

export default Sandochi;