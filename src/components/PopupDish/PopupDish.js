import React from 'react';
import './PopupDish.css';

function PopupDish({ dish, onClose }) {
    
    // Проверяем, что dish и его translations определены.
    if (!dish || !dish.translations || !dish.translations.ru) {
        return;
    }

     // Очистка строки 'short_name' от лишних символов.
    const cleanedShortName = dish.translations.ru.short_name.replace(/[{}'"]/g, '');

    return (
        <div className={dish.image ? "popup popup_background popup_open" : "popup"} id="PopupDish">
            <div className="popup__container">
                <div className="popup__container-column">
                    <img src={dish.image} alt={cleanedShortName} className="popup__image" />
                    <div className="popup__title">
                        <h2 className="popup__image-text">{cleanedShortName}</h2>
                        <p className="popup__composition">{dish.translations.ru.text}
                            <span className="popup__composition-span">В комплект входит васаби, имбирь, соевый соус.</span> 
                            <span className="popup__composition-span">При самовывозе - скидка 10%.</span>
                        </p>
                        <p className="popup__price">{dish.final_price} RSD</p>
                    </div>
                </div>     
                    <button 
                        onClick={onClose}
                        className="popup-dishes__cart-button"
                        type="submit"
                        aria-label="Корзина">
                            В корзину
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