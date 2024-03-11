import React, { useState } from 'react';
import vegan from '../../images/vegan.svg';
import spicy from '../../images/spicy.svg';
import { useTranslation } from 'react-i18next';
import './DishesCard.css';

function DishesCard({ dish, onDishClick, language, onAddToCart }) {

    const [isCartBtnClick, setCartBtnClick] = useState(false);

    const { t } = useTranslation();

    function handleDishClick() {
        onDishClick(dish);
    }

    function handleAddToCartClick() {
        console.log('Adding to cart from Menu:', dish);
        onAddToCart(dish);
        setCartBtnClick(true);
    }

    if(!dish.translations[language]) {
        console.error(`Перевод для блюда "${dish.article}" отсутствует для языка "${language}".`);
        return null;
    }

    // Используем регулярное выражение для удаления скобок и кавычек
    const cleanShortName = dish.translations[language].short_name;
    const text = dish.translations[language].text;

    // перевод для юнитов
    const weightVolumeUnit = dish.weight_volume_uom.translations[language]?.text || dish.weight_volume_uom.translations["en"].text;
    const unitsInSetUnit = dish.units_in_set_uom.translations[language]?.text || dish.units_in_set_uom.translations["en"].text;

    return (
        <li className="dishes__card">
                <img onClick={handleDishClick}
                className="dishes__photo app__button-opacity" src={dish.image} alt={cleanShortName} />
            <div className="dishes__description">
                <h3 className="dishes__title">{cleanShortName}</h3>
                <div className="dishes__options">
                    <p className="dishes__composition">
                        {text} <br /> {dish.weight_volume} {weightVolumeUnit}, {dish.units_in_set} {unitsInSetUnit}
                    </p>
                    {dish.vegan_icon === true ? 
                        (<img src={vegan} alt="Знак подходит для веганов" className="dishes__type" />)
                        : dish.spicy_icon === true ?  (<img src={spicy} alt="Знак острое" className="dishes__type" />)
                        : (<img src="" alt="" className="dishes__type" />)
                    }
                </div>
            </div>
            <div className="dishes__container">
                <button 
                    onClick={handleAddToCartClick}
                    className={isCartBtnClick ? "dishes__cart-button_active app__button-opacity" : "dishes__cart-button"}
                    type="button"
                    aria-label="Корзина">
                        {t('dish.cart', 'В корзину')}
                </button>
                <p className="dishes__price">{dish.final_price} RSD</p>
            </div>
        </li>
    );
}

export default DishesCard;