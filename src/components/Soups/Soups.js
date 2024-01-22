import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Rolls({dishes, handleBurgerMenu, onDishClick}) {
    const rollsDishes = dishes.filter(dish => dish.category.some(cat => cat.name_rus === "Супы🍲"));

    return (
        <>
            <CategoryMenu handleBurgerMenu={handleBurgerMenu}/>
            <section className="dishes__cards">
                <div className="dishes__card-lists">
                    <p className="dishes__categories">Супы🍲</p>
                    <ul className="dishes__card-list">
                        {rollsDishes.map(dish => (
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

export default Rolls;