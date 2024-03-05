import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Handrolls({ dishes, handleBurgerMenu, onDishClick, language, onAddToCart }) {

    const handrollsDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "handrolls"));

     // Получаем название категории, соответствующее текущему языку
    const categoryName = handrollsDishes.length > 0
        ? handrollsDishes[0].category.find(cat => cat.slug === "handrolls").translations[language]?.name || "Handrolls"
        : "Handrolls";

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
                        {handrollsDishes.map(dish => (
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

export default Handrolls;