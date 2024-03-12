import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormData } from '../../contexts/FormDataContext';
import useFormValidation from '../../utils/FormValidation';
import { useTranslation } from 'react-i18next';
import StorePickerMap from '../../utils/StorePickerMap';
import './Pickup.css';

function Pickup({ isTakeaway, cartData }) {

    //  хук useFormData для доступа к состоянию и функции обновления
    const { updateFormData } = useFormData();

    // location
    const navigate = useNavigate();

    const { t } = useTranslation();

    // для выбора магазина с карты
    const [selectedStore, setSelectedStore] = useState(null);

    //каунтер до 10 приборов
    const [persons_qty, setCount] = useState(1);

    //если залогинился юзер - вписать его данные
    const currentUser = useContext(CurrentUserContext);
    const { values, isValid, errors, formRef, setValues, handleChange } = useFormValidation();

    useEffect(() => {
        setValues({
            recipient_name: currentUser.first_name || '',
                recipient_phone: currentUser.phone || '',
                restaurant: selectedStore,
                comment: '',
                persons_qty,
                delivery_time: '11:00',
        });
    }, [currentUser, setValues]);

    useEffect(() => {
        // Предполагая, что данные о доставке уже загружены через App и переданы через isTakeaway.
        // Теперь можно итерировать по isTakeaway и решить, как применить эти данные в коде.
        if (isTakeaway.length > 0) {
            // Например, это могло бы быть использование этих данных для настройки формы
            // или обновление стейта с вариантами стоимости доставки.
        }
    }, [isTakeaway]);

    // Счетчик столовых приборов
    const handleAdd = () => {
        setCount(prevCount => (prevCount < 10 ? prevCount + 1 : prevCount));
    };

    const handleDelete = () => {
        setCount(prevCount => (prevCount > 1 ? prevCount - 1 : prevCount));
    };
    //end

    // Функция для создания массива временных интервалов, начиная с 11:30
    const generateTimeOptions = () => {
        const intervals = [];
        // Определяем начальные и конечные часы
        const startHour = 11;
        const endHour = 22;
        for (let hour = startHour; hour <= endHour; hour++) {
            // Добавляем интервал каждый час начиная с 00 минут
            intervals.push(`${hour}:00`);
            // Добавляем 30 минут только если это не последний час
            if (hour < endHour) {
                intervals.push(`${hour}:30`);
            }
        }
        return intervals;
    };
    const timeOptions = generateTimeOptions();
    //end

    // Функция для вывода дня и месяца
    const MONTH_NAMES = t('months', {
            returnObjects: true,
            defaultValue: [
                "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
                "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
            ]
    });

    const generateDateOptions = () => {
        const today = new Date();
        const dates = [t('dates.as_soon_as_possible', 'Как можно быстрее')];
        // Определяем дату на месяц вперед от сегодня
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(today.getMonth() + 1);
        let dateIterator = new Date(today);
        while (dateIterator <= oneMonthFromNow) {
            const day = dateIterator.getDate();
            const month = dateIterator.getMonth();
            //const year = dateIterator.getFullYear(); // Если нужно, можно добавить год
            // Форматируем число, добавляя ведущий ноль, если нужно
            const formattedDay = day < 10 ? `0${day}` : day;
            const monthName = MONTH_NAMES[month];
            const date = `${formattedDay} ${monthName}`; // ${year}, если нужен год
            dates.push(date);
            // Переходим к следующему дню
            dateIterator.setDate(dateIterator.getDate() + 1);
        }
        return dates;
    };
    const dateOptions = generateDateOptions();
    //end

    // Добавим состояние для выбранного месяца
    const [selectedMonth, setSelectedMonth] = useState(dateOptions[0]);

    // Обработчик изменения выбора месяца
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        let deliveryTime = null; // Для "Как можно быстрее" отправляем null
        // Проверяем, выбрана ли конкретная дата и время
        if (selectedMonth !== 'Как можно быстрее' && values.delivery_time) {
            const [day, monthName] = selectedMonth.split(' ');
            const monthNumber = MONTH_NAMES.indexOf(monthName) + 1; // Получаем номер месяца
            const formattedMonth = monthNumber < 10 ? `0${monthNumber}` : monthNumber;
            const year = new Date().getFullYear();
            deliveryTime = `${day}.${formattedMonth}.${year} ${values.delivery_time}`;
        } else {
            deliveryTime = null;
        }
         // Предотвратить обычную отправку формы
        const formValues = {
            discounted_amount: values.discounted_amount,
            //payment_type: values.payment_type,
            items_qty: values.items_qty,
            recipient_name: values.recipient_name,
            recipient_phone: values.recipient_phone,
            restaurant: values.restaurant,
            city: values.city,
            delivery_time: deliveryTime, // Используем составленное или null значение,
            comment: values.comment,
            persons_qty:  persons_qty,
            amount: values.amount,
            promocode: values.promocode,
        };
        console.log('Submitting form with takeaway data:', formValues);
        const orderFormData = {
            ...formValues,
            orderdishes: cartData, // уже сформированный массив блюд
        };
        //  функция для отправки заказа
        console.log('OrderFormData Takeaway:', orderFormData);
        updateFormData(orderFormData); // Обновляем глобальное состояние с данными формы
        navigate('/payment'); // Переход на страницу оплаты

        // Переменная для хранения стоимости доставки
        /* let deliveryCost = 0;
        // Найти информацию о доставке для города, указанного пользователем
        const deliveryInfo = isDelivery.find((cityInfo) => cityInfo.city === values.address);
        // Если есть информация по указанному городу
        if (deliveryInfo) {
            // Рассчитать стоимость доставки
            //deliveryCost = calculateDeliveryCost(deliveryInfo,);
        } else {
            // Отобразить сообщение об ошибке, если доставка в город не осуществляется
            console.error("Доставка в выбранный город не осуществляется");
        }*/
        // обработать оставшуюся логику отправки формы
    }

    return (
        <>
            <div className="delivery">
                <form ref={formRef} className="delivery__form" onSubmit={handleSubmit}>
                        <div className="delivery__description">
                            <label className="delivery__label" htmlFor="recipient_name">{t('delivery.your_name', 'Ваше имя')}
                                <input
                                    value={values.recipient_name || ''}
                                    onChange={handleChange}
                                    id="recipient_name"
                                    className="delivery__input"
                                    name="recipient_name"
                                    type="text"
                                    placeholder={t('delivery.name', 'Имя')}
                                    minLength="2"
                                    maxLength="150"
                                    pattern="^[A-Za-zА-Яа-яЁё]{2,150}$"
                                    required
                                />
                                <span 
                                    className={`${errors.recipient_name ? "login__error" : "login__error_hidden"}`}>
                                        {t('delivery.field_required', 'Поле обязательно для ввода')}
                                </span>
                            </label>
                        </div>    
                        <div className="delivery__description">
                            <label className="delivery__label" htmlFor="recipient_phone">{t('delivery.your_phone', 'Ваш телефон')}
                                <input
                                    value={values.recipient_phone || ''}
                                    onChange={handleChange}
                                    id="recipient_phone"
                                    className="delivery__input"
                                    name="recipient_phone"
                                    type="tel"
                                    placeholder="+"
                                    minLength="11"
                                    maxLength="14"
                                    pattern="^\+[0-9]{11,14}$"
                                    required
                                />
                                <span 
                                    className={`${errors.recipient_phone ? "login__error" : "login__error_hidden"}`}>
                                        {t('delivery.field_required', 'Поле обязательно для ввода')}
                                </span>
                            </label>
                        </div>    
                        <div className="delivery__description">
                            <label className="delivery__label" htmlFor="restaurant">{t('delivery.store', 'Выберите ресторан для самовывоза')}
                                <input
                                    value={selectedStore ? selectedStore.name : ''}
                                    onChange={handleChange}
                                    id="restaurant"
                                    className="delivery__input"
                                    name="restaurant"
                                    type="text"
                                    placeholder={t('delivery.store', 'Выберите точку ресторана')}
                                    minLength="5"
                                    maxLength="100"
                                    required
                                />
                                <span 
                                    className={`${errors.restaurant ? "login__error" : "login__error_hidden"}`}>
                                        {t('delivery.field_required', 'Поле обязательно для ввода')}
                                </span>
                                <StorePickerMap onStoreSelect={setSelectedStore} />
                            </label>
                        </div>
                        <div className="delivery__description">{t('delivery.number_of_utensils', 'Количество приборов')}
                            <button
                                onClick={handleDelete}
                                aria-label="Минус"
                                type="button"
                                className="delivery__btn-product_delete app__button-opacity">
                            </button>
                            <span className="delivery__product-count">{persons_qty}</span>
                            <button
                                onClick={handleAdd}
                                aria-label="Плюс"
                                type="button"
                                className="delivery__btn-product_add app__button-opacity">
                            </button>
                        </div>
                        <div className="delivery__description">
                            <label className="delivery__label">{t('delivery.order_comment', 'Комментарий к заказу')}
                                <textarea
                                    className="delivery__textarea"
                                    placeholder={t('delivery.write_your_order_comments', 'Напишите свои комментарии к Вашему заказу')}
                                />
                            </label>
                        </div>
                        <div className="delivery__container delivery__container-data">
                            {t('delivery.specify_date_time', 'Укажите дату и время')}
                            <div className="delivery__container-time">
                                <select className="delivery__select" id="month" name="selectedMonth"
                                        onChange={(event) => {
                                            handleChange(event);
                                            handleMonthChange(event);
                                        }} value={selectedMonth}>
                                    {dateOptions.map((date, index) => (
                                        <option key={index} value={date} className="delivery__select-month">
                                            {date}
                                        </option>
                                    ))}
                                </select>
                                {selectedMonth !== 'Как можно быстрее' && (
                                    <select className="delivery__select" id="time" name="delivery_time"
                                        onChange={handleChange} value={values.delivery_time || '11:00'}>
                                        {timeOptions.map((time, index) => (
                                            <option key={index} value={time} className="delivery__select-time">
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>
                            <button 
                                onClick={handleSubmit}
                                className=
                                {`delivery__btn ${!isValid ? "delivery__btn-save_disable" : "app__button-opacity"}`}
                                //disabled={!isValid}
                                type="button"
                                aria-label="Выберете способ оплаты">
                                    {t('delivery.choose_payment_method', 'Выберете способ оплаты')}
                            </button>
                    </form>
            </div>
        </>
    );
}

export default Pickup;