import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Soups({dishes, handleBurgerMenu, onDishClick}) {
    const soupsDishes = dishes.filter(dish => dish.category.some(cat => cat.name_rus === "Сандочи🍙"));

    return (
        <>
            <CategoryMenu handleBurgerMenu={handleBurgerMenu}/>
            <section className="dishes__cards">
                <div className="dishes__card-lists">
                    <p className="dishes__categories">Сандочи🍙</p>
                    <ul className="dishes__card-list">
                        {soupsDishes.map(dish => (
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

export default Soups;