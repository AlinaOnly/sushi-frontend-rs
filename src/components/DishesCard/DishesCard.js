import React from 'react';
import vegan from '../../images/vegan.svg';
import spicy from '../../images/spicy.svg';
import './DishesCard.css';

function DishesCard({ dish, onDishClick, language }) {

    function handleDishClick() {
        onDishClick(dish);
    }

    if(!dish.translations[language]) {
        console.error(`Перевод для блюда "${dish.id}" отсутствует для языка "${language}".`);
        return null;
    }

    // Используем регулярное выражение для удаления скобок и кавычек
    //const cleanShortName = dish.translations[language].short_name.replace(/[{}'"]/g, '');
    const cleanShortName = dish.translations[language].short_name;
    const text = dish.translations[language].text;

    return (
        <li className="dishes__card">
                <img onClick={handleDishClick}
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