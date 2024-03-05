import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Sushi({ dishes, handleBurgerMenu, onDishClick, language, onAddToCart }) {

    const sushiDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "sushi"));

     // Получаем название категории, соответствующее текущему языку
    const categoryName = sushiDishes.length > 0
        ? sushiDishes[0].category.find(cat => cat.slug === "sushi").translations[language]?.name || "Sushi"
        : "Sushi";

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
                        {sushiDishes.map(dish => (
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

export default Sushi;