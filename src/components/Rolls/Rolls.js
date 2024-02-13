import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Rolls({ dishes, handleBurgerMenu, onDishClick, language }) {

    const rollsDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "rolls"));

     // Получаем название категории, соответствующее текущему языку
    const categoryName = rollsDishes.length > 0
        ? rollsDishes[0].category.find(cat => cat.slug === "rolls").translations[language]?.name || "Rolls"
        : "Rolls";

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
                        {rollsDishes.map(dish => (
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

export default Rolls;