import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Woks({dishes, handleBurgerMenu, onDishClick}) {
    const woksDishes = dishes.filter(dish => dish.category.some(cat => cat.name_rus === "Воки 🥡"));

    return (
        <>
            <CategoryMenu handleBurgerMenu={handleBurgerMenu}/>
            <section className="dishes__cards">
                <div className="dishes__card-lists">
                    <p className="dishes__categories">Воки 🥡</p>
                    <ul className="dishes__card-list">
                        {woksDishes.map(dish => (
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

export default Woks;