import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Tempura({dishes, handleBurgerMenu, onDishClick}) {
    const tempuraDishes = dishes.filter(dish => dish.category.some(cat => cat.name_rus === "Горячие роллы (темпура)🔥"));

    return (
        <>
            <CategoryMenu handleBurgerMenu={handleBurgerMenu}/>
            <section className="dishes__cards">
                <div className="dishes__card-lists">
                    <p className="dishes__categories">Горячие роллы/темпура🔥</p>
                    <ul className="dishes__card-list">
                        {tempuraDishes.map(dish => (
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

export default Tempura;