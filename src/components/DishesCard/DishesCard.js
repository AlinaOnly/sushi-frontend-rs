import React from 'react';
import vegan from '../../images/vegan.svg';
import spicy from '../../images/spicy.svg';
import './DishesCard.css';


function DishesCard({ dish, onDishClick }) {

    function handleClick() {
        onDishClick(dish);
    }

    return (
        <li className="dishes__card">
                <img onClick={handleClick}
                className="dishes__photo" src={dish.image} alt={dish.short_name_rus} />
            <div className="dishes__description">
                <h3 className="dishes__title">{dish.short_name_rus}</h3>
                <div className="dishes__options">
                    <p className="dishes__composition">{dish.text_rus}</p>
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