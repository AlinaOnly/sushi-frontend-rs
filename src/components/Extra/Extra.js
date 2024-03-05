import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Extra({ dishes, handleBurgerMenu, onDishClick, language, onAddToCart }) {

    const extraDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "extra"));

     // Получаем название категории, соответствующее текущему языку
    const categoryName = extraDishes.length > 0
        ? extraDishes[0].category.find(cat => cat.slug === "extra").translations[language]?.name || "Extra"
        : "Extra";

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
                        {extraDishes.map(dish => (
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

export default Extra;