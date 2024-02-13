import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Maki({ dishes, handleBurgerMenu, language, onDishClick }) {

    const makiDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "maki"));

     // Получаем название категории, соответствующее текущему языку
    const categoryName = makiDishes.length > 0
        ? makiDishes[0].category.find(cat => cat.slug === "maki").translations[language]?.name || "Maki"
        : "Maki";

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
                        {makiDishes.map(dish => (
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

export default Maki;