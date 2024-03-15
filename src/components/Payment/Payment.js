import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormData } from '../../contexts/FormDataContext';
import './Payment.css';

function Payment({ onSubmitDeliveryData, onSubmitSubmitTakeawayData, isTakeawayPayment }) {

    const { t } = useTranslation();

    const { formData, updateFormData } = useFormData();

    const handlePaymentTypeSelection = (paymentType) => {
        updateFormData({ payment_type: paymentType });
    };

    const handleSubmitFinal = (event) => {
        event.preventDefault();
        if (isTakeawayPayment) { // Если флаг true, значит нужно использовать обработчик для Pickup
            onSubmitSubmitTakeawayData(formData);
        } else {
            onSubmitDeliveryData(formData); // Если false, значит использовать обработчик для Delivery
        }
    };

    return (
        <>
            <section className="payment">
                <form className="payment_form" onSubmit={handleSubmitFinal}>
                    <div className="payment__containers">
                        <div className="payment__container">
                            <div className="payment__container-title">
                                <h2 className="payment__title-sum">{t('pickup.order_summary', 'Сумма заказа:')}</h2>
                                <p className="payment__price-sum">{}  amount RSD</p>
                            </div>
                            <div className="payment__container-title">
                                <h2 className="payment__title-sell">{t('pickup.order_sell', 'Ваша скидка:')}</h2>
                                <p className="payment__price-sell"> {} total_discount RSD</p>
                            </div>
                            <div className="payment__container-title">
                                <h2 className="payment__title-total">{t('pickup.order_total', 'Итого:')}</h2>
                                <p className="payment__price-total"> {}  "total": 
                                "title" "Total amount, incl. delivery",
                                "total_amount": 2925.0
                            RSD</p>
                            </div>
                        </div>    
                        <div className="payment__checkbox">
                            <input className="payment__input" type="checkbox" id="rules" name="rules" />
                            <label className="payment__label" htmlFor="rules">{t('pickup.agreement', 'Осуществляя заказ на сайте я подтверждаю, что ознакомился с правилами продажи товаров, а также cо всеми документами, размещенными на сайте по адресу и подтверждаю принятие правил продажи товаров на сайте в полном объеме без ограничений.')}</label>
                        </div>
                        <div className="payment__checkbox">
                            <input className="payment__input" type="checkbox" id="agreement" name="agreement" />
                            <label className="payment__label" htmlFor="agreement">{t('pickup.consent_to_personal_data_processing', 'Осуществляя заказ на сайте я даю свое согласие на сбор и обработку моих персональных данных в соответствии с политикой конфиденциальности.')}</label>
                        </div>
                        <div className="payment__checkbox">
                            <input className="payment__input" type="checkbox" id="advertising" name="advertising" />
                            <label className="payment__label" htmlFor="advertising">{t('pickup.consent_to_communications', 'Осуществляя заказ на сайте я даю свое согласие на получение направляемых мне смс-сообщений и электронных писем рекламного и информационного характера.')}</label>
                        </div>
                        <h3 className="payment__text">{t('pickup.choose_payment_method', 'Выберите способ оплаты')}</h3>
                        <div className="payment__area">
                            <div className="payment__area-box">
                                <button 
                                    onClick={() => {
                                        handlePaymentTypeSelection('cash');
                                    }} 
                                    aria-label="Наличными курьеру"
                                    type="submit"
                                    className="payment__btn-cash app__button-opacity">
                                </button>
                                <p className="payment__btn-text_cash">{t('pickup.payment_cash', 'Наличными курьеру')}</p>
                            </div> 
                            <div className="payment__area-box">   
                                <button 
                                    onClick={() => {
                                        handlePaymentTypeSelection('card');
                                    }}
                                    aria-label="Картой курьеру"
                                    type="submit"
                                    className="payment__btn-card app__button-opacity">
                                </button>
                                <p className="payment__btn-text_card">{t('pickup.payment_card', 'Картой курьеру')}</p>
                            </div>   
                        </div>
                    </div> 
                </form>   
            </section>
        </>
    );
}

export default Payment;