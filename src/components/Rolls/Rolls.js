import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

function Rolls({ dishes, handleBurgerMenu, onDishClick, language }) {
    //const rollsDishes = dishes.filter(dish => dish.category.some(cat => cat.slug === "rolls"));

    //  нужно отобразить название этой категории
    const rollsDishes = dishes.filter(dish => dish.category.some(cat => cat.translations[language]?.name));

    // Получаем название для категории, для первого блюда в списке
    // Предполагаем, что оно одинаково для всех блюд
    const categoryName = rollsDishes.length > 0 ? rollsDishes[0].category[0].translations[language].name : '';

    return (
        <>
            <CategoryMenu handleBurgerMenu={handleBurgerMenu}/>
            <section className="dishes__cards">
                <div className="dishes__card-lists">
                    <p className="dishes__categories">{categoryName}</p>
                    <ul className="dishes__card-list">
                        {rollsDishes.map(dish => (
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

export default Rolls;