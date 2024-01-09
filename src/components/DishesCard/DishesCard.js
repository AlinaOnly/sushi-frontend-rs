import {React, useState, useRef, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import vegan from '../../images/vegan.svg';
import spicy from '../../images/spicy.svg';
import './DishesCard.css';

//import useOutsideClick from '../../utils/useOutsideClick';

function DishesCard({ dish, onDishClick }) {
    const location = useLocation();
    const isCartDishes = location.pathname === '/cart';
    const [isCartButton, setCartButton] = useState(false);

    function handleClick() {
        onDishClick(dish);
    }


    return (
        <li className="dishes__card">
                <img onClick={handleClick}
                className="dishes__photo app__broken-img" src={dish.poster} alt={dish.name} />
            <div className="dishes__description">
                <h3 className="dishes__title">{dish.name}</h3>
                <div className="dishes__options">
                    <p className="dishes__composition">{dish.composition}</p>
                    {dish.vegan === true ? 
                        (<img src={vegan} alt="Знак подходит для веганов" className="dishes__type" />)
                        : dish.spicy === true ?  (<img src={spicy} alt="Знак острое" className="dishes__type" />)
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
                <p className="dishes__price">{dish.price}</p>
            </div>
        </li>
    );
}

export default DishesCard;