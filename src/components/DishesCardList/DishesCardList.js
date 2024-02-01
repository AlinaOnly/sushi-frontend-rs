import React from 'react';
import DishesCard from '../DishesCard/DishesCard';
import './DishesCardList.css';

function DishesCardList({ dishes, onDishClick }) {
    // Получаем уникальные категории блюд массивом уникальных данных
    const uniqueCategories = Array.from(new Set(dishes.flatMap(dish => dish.category.map(cat => cat.slug))));

    // Создаем объект для хранения блюд по категориям
    const dishesByCategory = uniqueCategories.reduce((acc, categoryName) => {
        acc[categoryName] = dishes.filter(dish =>
            dish.category.some(cat => cat.slug === categoryName)
        );
        return acc;
    }, {});

    // Функция для получения имени категории на русском языке
    const getCategoryName = (categorySlug) => {
        const category = dishes.flatMap(dish => dish.category).find(cat => cat.slug === categorySlug);
        return category.translations.ru.name;
    };

    return (
        <section className="dishes__cards">
            {uniqueCategories.map(categoryName => (
                <div className="dishes__card-lists" key={categoryName}>
                    <p className="dishes__categories">{getCategoryName(categoryName)}</p>
                    <ul className="dishes__card-list">
                        {dishesByCategory[categoryName]
                            .map(dish => (
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