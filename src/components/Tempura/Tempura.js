import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Tempura({ dishes, handleBurgerMenu, onDishClick, language, onAddToCart }) {

    const tempuraDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "tempura"));

    // Получаем название категории, соответствующее текущему языку
    const categoryName = tempuraDishes.length > 0
        ? tempuraDishes[0].category.find(cat => cat.slug === "tempura").translations[language]?.name || "Tempura"
        : "Tempura";

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
                        {tempuraDishes.map(dish => (
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

export default Tempura;