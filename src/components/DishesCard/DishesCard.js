import React from 'react';
import vegan from '../../images/vegan.svg';
import spicy from '../../images/spicy.svg';
import './DishesCard.css';


function DishesCard({ dish, onDishClick }) {
    //console.log('In DishesCard, short_name:', dish.translations);

    function handleClick() {
        onDishClick(dish);
    }

    // Используем регулярное выражение для удаления скобок и кавычек
    const cleanShortName = dish.translations.ru.short_name.replace(/[{}'"]/g, '');
    const text = dish.translations.ru.text;

    return (
        <li className="dishes__card">
                <img onClick={handleClick}
                className="dishes__photo" src={dish.image} alt={cleanShortName} />
            <div className="dishes__description">
                <h3 className="dishes__title">{cleanShortName}</h3>
                <div className="dishes__options">
                    <p className="dishes__composition">{text}</p>
                    {dish.vegan_icon === true ? 
                        (<img src={vegan} alt="Знак подходит для веганов" className="dishes__type" />)
                        : dish.spicy_icon === true ?  (<img src={spicy} alt="Знак острое" className="dishes__type" />)
                        : (<img src="" alt="" className="dishes__type" />)
                    }
                </div>
            </div>
            <div className="dishes__container">
                <button 
                    className="dishes__cart-button"
                    type="submit"
                    aria-label="Корзина">
                        В корзину
                </button>
                <p className="dishes__price">{dish.final_price} RSD</p>
            </div>
        </li>
    );
}

export default DishesCard;