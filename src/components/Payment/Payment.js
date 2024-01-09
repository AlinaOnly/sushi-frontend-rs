import React from 'react';
import './Payment.css';

function Payment() {
    return (
        <>
            <section className="payment">
                <div className="payment__container">
                    <div className="payment__container-title">
                        <h2 className="payment__title">Сумма Вашего заказа</h2>
                        <p className="payment__price">3000 RSD</p>
                    </div>
                    <div className="payment__checkbox">
                        <input className="payment__input" type="checkbox" id="rules" name="rules" />
                        <label className="payment__label" for="rules">Осуществляя заказ на сайте я подтверждаю, что ознакомился с правилами продажи товаров, 
                            а также cо всеми документами, размещенными на сайте по адресу и подтверждаю принятие правил продажи 
                            товаров на сайте в полном объеме без ограничений.
                        </label>
                    </div>
                    <div className="payment__checkbox">
                        <input className="payment__input" type="checkbox" id="agreement" name="agreement" />
                        <label className="payment__label" for="agreement">Осуществляя заказ на сайте я даю свое согласие на сбор 
                            и обработку моих персональных данных в соответствии с политикой
                            конфедициальности. 
                        </label>
                    </div>
                    <div className="payment__checkbox">
                        <input className="payment__input" type="checkbox" id="advertising" name="advertising" />
                        <label className="payment__label" for="advertising">Осуществляя заказ на сайте я даю свое согласие на получение направляемых 
                            мне смс-сообщений и электронных писем рекламного и информационного характера.
                        </label>
                    </div>
                    <h3 className="payment__text">Выберите способ оплаты</h3>
                    <div className="payment__area">
                        <div className="payment__area-box">
                            <button 
                                aria-label="Наличными курьеру"
                                type="submit"
                                className="payment__btn-cash app__button-opacity">
                            </button>
                            <p className="payment__btn-text">Наличными курьеру</p>
                        </div> 
                        <div className="payment__area-box">   
                            <button 
                                aria-label="Картой курьеру"
                                type="submit"
                                className="payment__btn-card app__button-opacity">
                            </button>
                            <p className="payment__btn-text">Картой курьеру</p>
                        </div>   
                    </div>
                </div>    
            </section>
        </>
    );
}

export default Payment;