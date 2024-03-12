import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import empty from '../../images/empty-cart.svg';
import { useTranslation } from 'react-i18next';
import './Cart.css';

function Cart({
        cartData,
        setCartData,
        language,
        extraDishes,
        onAddToCart,
        setPromoCode,
        promoCode,
        handleSubmitPromo,
        errorMessage,
        onClearCart,
        onIncreaseQuantity,
        onDecreaseQuantity
    }) {

    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    const currentLanguage = i18n.language;

    const translateDish = (translations, key) => {
        if (!translations) return 'Название не найдено';
        // Ожидаемый формат translations - { en: { short_name: "Dish", text: "Description" }}
        const translation = translations[currentLanguage] || translations['ru'] || {};
        return translation[key] || translation['short_name'] || 'Название не найдено';
    };

    // Функция для увеличения количества блюда
    const handleIncreaseQuantity = (index) => {
        const newCartData = [...cartData];
        newCartData[index].quantity += 1;
        setCartData(newCartData);
        // Сохраняем изменения в localStorage или отправляем на сервер
        localStorage.setItem('cartDishes', JSON.stringify(newCartData));
    };

    // Функция для уменьшения количества блюда
    const handleDecreaseQuantity = (index) => {
        const newCartData = [...cartData];
        if(newCartData[index].quantity > 1) {
            newCartData[index].quantity -= 1;
            setCartData(newCartData);
            // Сохраняем изменения в localStorage или отправляем на сервер
            localStorage.setItem('cartDishes', JSON.stringify(newCartData));
        }
    };

    // Передаем в функцию цену за единицу и количество
    const calculateTotalPrice = (unitPrice, quantity) => {
        // Умножаем цену за единицу на количество, если оно больше чем 1
        if (quantity > 1) {
            return (parseFloat(unitPrice) * quantity).toFixed(2);
        }
        // Или возвращаем unitPrice как final_price, если количество равно 1
        return parseFloat(unitPrice).toFixed(2);
    };

    // Функция для вычисления итоговой суммы всех товаров в корзине
    const calculateTotalSum = () => {
        return cartData.reduce((sum, cartItem) => {
        return sum + (cartItem.dish.final_price * cartItem.quantity);
        }, 0);
    };

    // Вычисляем итоговую сумму
    const totalSum = calculateTotalSum();

    // Функция для удаления блюда из корзины
    const handleRemoveCartItem = (index) => {
        const newCartData = [...cartData];
        newCartData.splice(index, 1); // Удаляем элемент по индексу
        setCartData(newCartData);
        // Сохраняем изменения в localStorage
        localStorage.setItem('cartDishes', JSON.stringify(newCartData));
    };

    const handlePromoChange = (event) => {
        setPromoCode(event.target.value);
    };

    return (
        <>
            <div className="cart">
                {cartData && cartData.length > 0 ? (
                    <>
                        <h2 className="cart__title">{t('cart.in_your_cart', 'В Вашей корзине')}</h2>
                        {cartData.map((cartItem, index) => {
                            const translationShortName = translateDish(cartItem.dish.translations, 'short_name');
                            const totalPrice = calculateTotalPrice(cartItem.dish.final_price, cartItem.quantity);
                            return (
                                <div className="cart__products"  key={index}>
                                    <img className="cart__product-image" src={cartItem.dish ? cartItem.dish.image : cartItem.image} alt={translationShortName}/>
                                    <p className="cart__product-name">{translationShortName}</p>
                                    <div className="cart__container-count">
                                        <p className="cart__product-price">{totalPrice} RSD</p>
                                        <button
                                            onClick={() => handleDecreaseQuantity(index)}
                                            aria-label="Минус"
                                            type="button"
                                            className="cart__btn-product_delete app__button-opacity">
                                        </button>
                                        <p className="cart__product-count">{cartItem.quantity}</p>
                                        <button
                                            onClick={() => handleIncreaseQuantity(index)}
                                            aria-label="Плюс"
                                            type="button"
                                            className="cart__btn-product_add app__button-opacity">
                                        </button>
                                        <button 
                                            onClick={() => handleRemoveCartItem(index)}
                                            className="cart__product-btn_trash app__button-opacity" 
                                            type="button"  
                                            aria-label="Очистить от блюда">
                                        </button>
                                    </div>
                                </div>  
                            );
                        })} 
                            <button
                                onClick={onClearCart}
                                aria-label="Очистить корзину"
                                type="button"
                                className="cart__btn-products_clean app__button-opacity">{t('cart.clear_cart', 'Очистить корзину')}
                            </button>
                        <div className="cart__slider">
                            <p className="cart__text-slider">{t('cart.add_to_your_order', 'Добавьте к себе в заказ:')}</p>
                            <Carousel
                                extraDishes={extraDishes}
                                onAddToCart={onAddToCart}
                                language={language}
                            />
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmitPromo(); }}>
                            <div className="cart__promo">
                                <label className="cart__promo-label" htmlFor="promo">{t('cart.promo_code', 'Промокод:')}
                                    <input
                                        id="promo"
                                        className="cart__promo-input"
                                        name="promo"
                                        type="text"
                                        pattern="^[A-Za-z0-9]+$"
                                        value={promoCode}
                                        onChange={handlePromoChange}
                                        minLength="6"
                                    />
                                        {t(errorMessage) && <p className="promo__error">{t(errorMessage)}</p>}
                                    </label>
                                <button 
                                    aria-label={t('cart.apply', 'Применить')}
                                    type="submit"
                                    className="cart__btn-promo app__button-opacity">{t('cart.apply', 'Применить')}
                                </button>
                            </div>
                        </form>
                        <div className="cart__results">
                            <p className="cart__text-price">{t('cart.total', 'Итого:')}</p>
                            <p className="cart__product-summ-price">{totalSum.toFixed(2)} RSD</p>
                        </div>
                        <div className="cart__delivery">
                            <p className="cart__order-text">{t('cart.checkout', 'Оформить заказ')}</p>
                            <Link to="/delivery">
                                <button 
                                    aria-label={t('cart.delivery', 'Доставка')}
                                    type="button"
                                    className="cart__btn-delivery app__button-opacity">{t('cart.delivery', 'Доставка')}
                                </button>
                            </Link>
                            <Link to="/takeaway">
                                <button 
                                    aria-label={t('cart.pick_up_myself', 'Заберу сам')}
                                    type="button"
                                    className="cart__btn-pickup app__button-opacity">{t('cart.pick_up_myself', 'Заберу сам')}
                                </button>
                            </Link>
                        </div>
                    </>
                    ) : (
                    <>
                        <h2 className="cart__title">{t('cart.empty', 'В корзине пусто!')}</h2>
                        <img src={empty} className="cart__img-empty" alt="Пустая корзина"/>
                        <p className="cart__text">{t('cart.add', 'Добавьте что-нибудь из нашего меню!')}</p>
                        <button 
                            onClick={() => navigate('/')}
                            aria-label="Назад в меню"
                            type="button"
                            className="cart__btn-back app__button-opacity">{t('cart.back', 'Назад в меню')}
                        </button>
                    </>
                )}
            </div> 
        </>
    );
}

export default Cart;