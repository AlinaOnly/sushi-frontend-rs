import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Soups({ dishes, handleBurgerMenu, onDishClick, language }) {

    const soupsDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "soups"));

     // Получаем название категории, соответствующее текущему языку
    const categoryName = soupsDishes.length > 0
        ? soupsDishes[0].category.find(cat => cat.slug === "soups").translations[language]?.name || "Soups"
        : "Soups";

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
                        {soupsDishes.map(dish => (
                            <DishesCard
                                dish={dish}
                                key={dish.id}
                                isCartDishes={dish.isCartDishes}
                                onDishClick={onDishClick}
                                language={language}
                            />
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Soups;