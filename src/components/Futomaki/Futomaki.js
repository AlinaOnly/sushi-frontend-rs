import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Futomaki({ dishes, handleBurgerMenu, onDishClick, language }) {

    const futomakiDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "futomaki"));

    // Получаем название категории, соответствующее текущему языку
    const categoryName = futomakiDishes.length > 0
        ? futomakiDishes[0].category.find(cat => cat.slug === "futomaki").translations[language]?.name || "Futomaki"
        : "Futomaki";

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
                    {futomakiDishes.map(dish => (
                        <DishesCard
                            dish={dish}
                            key={dish.article}
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

export default Futomaki;