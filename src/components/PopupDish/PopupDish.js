import React, { useRef } from 'react';
import './PopupDish.css';

function PopupDish({ dish, onClose }) {
    return (
        <div className={dish.poster ? "popup popup_background popup_open" : "popup"} id="PopupDish">
            <div className="popup__container">
                <div className="popup__container-column">
                    <img src={dish.poster} alt={dish.name} className="popup__image" />
                    <div className="popup__title">
                        <h2 className="popup__image-text">{dish.name}</h2>
                        <p className="popup__composition">{dish.composition}.&nbsp;
                            <span className="popup__composition-span">В комплект входит васаби, имбирь, соевый соус.</span> 
                            <span className="popup__composition-span">При самовывозе - скидка 10%.</span>
                        </p>
                        <p className="popup__price">{dish.price}</p>
                    </div>
                </div>     
                    <button 
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