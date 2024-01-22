import React  from 'react';
import DishesCard from '../DishesCard/DishesCard';
import './DishesCardList.css';


function DishesCardList({ dishes, onDishClick }) {
     // Получаем уникальные категории блюд массивом уникальных данных
    const uniqueCategories = Array.from(new Set(dishes.flatMap(dish => dish.category.map(cat => cat.name_rus))));

    // Создаем объект для хранения блюд по категориям
    const dishesByCategory = uniqueCategories.reduce((acc, categoryName) => {
        acc[categoryName] = dishes.filter(dish =>
            dish.category.some(cat => cat.name_rus === categoryName)
        );
        return acc;
    }, {});

    return (
        <section className="dishes__cards">
            {uniqueCategories.map(categoryName => (
                <div className="dishes__card-lists" key={categoryName}>
                    <p className="dishes__categories">{categoryName}</p>
                    <ul className="dishes__card-list">
                        {dishesByCategory[categoryName].map(dish => (
                            <DishesCard
                                dish={dish}
                                key={dish.id}
                                isCartDishes={dish.isCartDishes}
                                onDishClick={onDishClick}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </section>
        );
    }
    
export default DishesCardList;