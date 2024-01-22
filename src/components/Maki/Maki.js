import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Maki({dishes, handleBurgerMenu, onDishClick}) {
    const makiDishes = dishes.filter(dish => dish.category.some(cat => cat.name_rus === "Маки 🐉🥒🦐🐟"));

    return (
        <>
            <CategoryMenu handleBurgerMenu={handleBurgerMenu}/>
            <section className="dishes__cards">
                <div className="dishes__card-lists">
                    <p className="dishes__categories">Маки 🐉🥒🦐🐟</p>
                    <ul className="dishes__card-list">
                        {makiDishes.map(dish => (
                            <DishesCard
                                dish={dish}
                                key={dish.id}
                                isCartDishes={dish.isCartDishes}
                                onDishClick={onDishClick}
                            />
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Maki;