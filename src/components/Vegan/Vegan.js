import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Vegan({ dishes, handleBurgerMenu, onDishClick, language }) {

    const veganDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "vegan"));

     // Получаем название категории, соответствующее текущему языку
    /*const categoryName = veganDishes.length > 0
        ? veganDishes[0].category.find(cat => cat.slug === "vegan").translations[language]?.name || "Vegan"
        : "Vegan";*/

    return (
        <>
            <CategoryMenu 
                handleBurgerMenu={handleBurgerMenu}
                language={language}
                dishes={dishes}
            />
            <section className="dishes__cards">
                <div className="dishes__card-lists">
                    <p className="dishes__categories">Vegan</p>
                    <ul className="dishes__card-list">
                        {veganDishes.map(dish => (
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

export default Vegan;