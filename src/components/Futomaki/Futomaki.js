import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Futomaki({dishes, handleBurgerMenu, onDishClick}) {
    const futomakiDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "futomaki"));

    return (
        <>
        <CategoryMenu handleBurgerMenu={handleBurgerMenu}/>
        <section className="dishes__cards">
            <div className="dishes__card-lists">
                <p className="dishes__categories">Футомаки</p>
                <ul className="dishes__card-list">
                    {futomakiDishes.map(dish => (
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

export default Futomaki;