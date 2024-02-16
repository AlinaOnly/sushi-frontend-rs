import React from 'react';
import { useTranslation } from 'react-i18next';
import './PopupDish.css';

function PopupDish({ dish, onClose, language }) {

    const { t } = useTranslation();

    // Проверяем, что dish и его translations определены.
    if (!dish || !dish.translations || !dish.translations[language]) {
        return null;
    }

     // Очистка строки 'short_name' от лишних символов.
    const cleanedShortName = dish.translations[language].short_name;
    const text = dish.translations[language].text;

    // перевод для юнитов
    const weightVolumeUnit = dish.weight_volume_uom.translations[language]?.text || dish.weight_volume_uom.translations["en"].text;
    const unitsInSetUnit = dish.units_in_set_uom.translations[language]?.text || dish.units_in_set_uom.translations["en"].text;

    return (
        <div className={dish.image ? "popup popup_background popup_open" : "popup"} id="PopupDish">
            <div className="popup__container">
                <div className="popup__container-column">
                    <img src={dish.image} alt={cleanedShortName} className="popup__image" />
                    <div className="popup__title">
                        <h2 className="popup__image-text">{cleanedShortName}</h2>
                        <p className="popup__composition">{text} <br /> {dish.weight_volume} {weightVolumeUnit}, {dish.units_in_set} {unitsInSetUnit}
                            <span className="popup__composition-span">{t('popup-dish.complect', 'В комплект входит васаби, имбирь, соевый соус.')}</span> 
                            <span className="popup__composition-span">{t('popup-dish.discount', 'При самовывозе - скидка 10%.')}</span>
                        </p>
                        <p className="popup__price">{dish.final_price} RSD</p>
                    </div>
                </div>     
                    <button 
                        className="popup-dishes__cart-button"
                        type="submit"
                        aria-label="Корзина">
                            {t('popup-dish.cart', 'В корзину')}
                    </button>
                    <button 
                        onClick={onClose} 
                        className="popup__close-button" 
                        type="button" 
                        aria-label="Закрыть попап">
                    </button>
            </div>
        </div>
    );
}

export default PopupDish;