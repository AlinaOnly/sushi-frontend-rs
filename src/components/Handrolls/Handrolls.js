import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Handrolls({dishes, handleBurgerMenu, onDishClick}) {
    const handrollsDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "handrolls"));

    return (
        <>
            <CategoryMenu handleBurgerMenu={handleBurgerMenu}/>
            <section className="dishes__cards">
                <div className="dishes__card-lists">
                    <p className="dishes__categories">Хэнд роллы 🌯</p>
                    <ul className="dishes__card-list">
                        {handrollsDishes.map(dish => (
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

export default Handrolls;