import React from 'react';
import DishesCardList from '../DishesCardList/DishesCardList';
import CategoryMenu from '../CategoryMenu/CategoryMenu';


import './Dishes.css';

function Dishes({ dishes, onDishClick, handleBurgerMenu }) {

    return (
        <>
            <CategoryMenu handleBurgerMenu={handleBurgerMenu}/>
                <DishesCardList
                    onDishClick={onDishClick}
                    dishes={dishes}
                />
        </>
    );
}

export default Dishes;