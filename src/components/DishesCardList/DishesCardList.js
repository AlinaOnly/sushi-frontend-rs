import React  from 'react';
import DishesCard from '../DishesCard/DishesCard';
import './DishesCardList.css';

function DishesCardList({ dishes, onDishClick, dishesItems }) {
    return (
        <section className="dishes__card-lists">
            <ul className="dishes__card-list">
            {
                dishes.map((dish) => (
                    <DishesCard
                        key={dish.id}
                        name={dish.name}
                        composition={dish.composition}
                        price={dish.price}
                        poster={dish.poster}
                        dish={dish}
                        category={dish.category}
                        vegan={dish.vegan}
                        spicy={dish.spicy}

                        dishesItems={dishesItems}
                        isDishes={dish.isDishes}
                        isCartDishes={dish.isCartDishes}
                        onDishClick={onDishClick}
                        
                    />
                ))
            }
            </ul>
        </section>
    );
}

export default DishesCardList;