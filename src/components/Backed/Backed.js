import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Backed({ dishes, handleBurgerMenu, onDishClick, language }) {

    const backedDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "backed"));

    // Получаем название категории, соответствующее текущему языку
    const categoryName = backedDishes.length > 0
        ? backedDishes[0].category.find(cat => cat.slug === "backed").translations[language]?.name || "Backed"
        : "Backed";

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
                        {backedDishes.map(dish => (
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

export default Backed;