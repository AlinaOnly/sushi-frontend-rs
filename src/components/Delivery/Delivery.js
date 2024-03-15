import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/FormValidation';
import { useFormData } from '../../contexts/FormDataContext';
import { useTranslation } from 'react-i18next';
import AddressAutocomplete from '../../utils/AddressAutocomplete';
import './Delivery.css';

function Delivery({ isDelivery, cartData }) {

    //  хук useFormData для доступа к состоянию и функции обновления
    const { updateFormData } = useFormData();

    // location
    const navigate = useNavigate();

    const { t } = useTranslation();

    //состояние кнопки radio
    const [isChecked, setIsChecked] = useState(false);

    //каунтер до 10 приборов
    const [persons_qty, setCount] = useState(1);

    //если залогинился юзер - вписать автоматически его данные
    const currentUser = useContext(CurrentUserContext);
    const { values, isValid, errors, setValues, formRef, handleChange, handleInput, checkFormValidity } = useFormValidation();

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

    const [selectedMonth, setSelectedMonth] = useState(dateOptions[0]);
    //end

    useEffect(() => {
        // Устанавливаем начальные значения для формы, используя информацию о текущем пользователе
        if (currentUser && Array.isArray(currentUser.addresses)) {
            const lastAddress = currentUser.addresses.length > 0 ?
                currentUser.addresses[currentUser.addresses.length - 1].address : '';
            setValues({
                recipient_name: currentUser.first_name || '',
                recipient_phone: currentUser.phone || '',
                recipient_address: lastAddress,
                PrivateHome: '',
                home: '',
                flat: '',
                floor: '',
                homephone: '',
                comment: '',
                persons_qty,
                delivery_time: '11:00',
            });
        }
        if (selectedMonth !== 'Как можно быстрее') {
            const [day, monthName] = selectedMonth.split(' ');
            const monthNumber = MONTH_NAMES.indexOf(monthName);
            const year = new Date().getFullYear(); // или берем год из выбранной даты
            const date = new Date(year, monthNumber, parseInt(day, 10));
            setValues(v => ({ ...v, delivery_time: generateTimeOptions(date)[0] || '' }));
        }
    }, [currentUser, setValues]);


    useEffect(() => {
        // Предполагая, что данные о доставке уже загружены через App и переданы через isDelivery.
        // Теперь можно итерировать по isDelivery и решить, как применить эти данные в коде.
        if (isDelivery.length > 0) {
            // Например, это могло бы быть использование этих данных для настройки формы
            // или обновление стейта с вариантами стоимости доставки.
        }
    }, [isDelivery]);

    // Счетчик столовых приборов
    const handleAdd = () => {
        setCount(prevCount => (prevCount < 10 ? prevCount + 1 : prevCount));
    };

    const handleDelete = () => {
        setCount(prevCount => (prevCount > 1 ? prevCount - 1 : prevCount));
    };
    //end

    // нажим и отжим radio btn
    const handleRadioChange = () => {
        // Только переключает состояние, если уже было выбрано
        if (isChecked) {
            setIsChecked((current) => !current);
        }
    };

    // Событие onClick запускается в любом случае, даже когда радиокнопка уже была выбрана
    const handleRadioClick = () => {
        setIsChecked((current) => !current);
    };
    //end

    // проверка валидного времени на текущую дату
    let selectedDate;
    if (selectedMonth !== 'Как можно быстрее') {
        const [day, monthName] = selectedMonth.split(' ');
        const monthNumber = MONTH_NAMES.indexOf(monthName);
        const year = new Date().getFullYear(); // или берем год из выбранной даты
        selectedDate = new Date(year, monthNumber, parseInt(day, 10));
    } else {
        selectedDate = new Date(); // если "Как можно быстрее", то считаем что дата – сегодня
    }

    const generateTimeOptions = (selectedDate) => {
        const intervals = [];
        const currentDateTime = new Date();
        const selectedDateAsString = selectedDate.toDateString();
        let isToday = selectedDateAsString === currentDateTime.toDateString();
        let startHour = isToday ? currentDateTime.getHours() : 11;
        // Если сегодня и текущие минуты >= 30, переходим к следующему часу
        if (isToday && currentDateTime.getMinutes() >= 30) {
            startHour++;
        }
        for (let hour = startHour; hour <= 22; hour++) {
          // Если выбрана сегодняшняя дата и текущий час уже прошёл, пропускаем добавление
            if (!(isToday && hour <= currentDateTime.getHours())) {
                // Добавляем полные часы
                intervals.push(`${hour}:00`);
                // Добавляем полчаса только если это не последний час и не первый интервал, когда сегодня и текущее время > 30 минут
                if (hour < 22 && !(isToday && hour === startHour && currentDateTime.getMinutes() >= 30)) {
                    intervals.push(`${hour}:30`);
                }
            }
        }
        return intervals;
    };

    const timeOptions = generateTimeOptions(selectedDate);
    //end

    // Обработчик изменения выбора месяца
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        // преобразуем `selectedMonth` в дату для передачи её в `generateTimeOptions`
        if (event.target.value !== 'Как можно быстрее') {
            const [day, monthName] = event.target.value.split(' ');
            const monthNumber = MONTH_NAMES.indexOf(monthName);
            const year = new Date().getFullYear(); // или берем год из выбранной даты
            const selectedDate = new Date(year, monthNumber, parseInt(day, 10));
            // обновляем состояние времени используя новую выбранную дату
            setValues(v => ({ ...v, delivery_time: generateTimeOptions(selectedDate)[0] || '' }));
            }
    };
    //end

    const handleUpdateAddress = (place) => {
        if (!place) return;
        let addressValue;
        let isValidAddress = false;
        if (place.address_components) {
            // Такой же подход, как и ранее, если place - это объект с компонентами адреса
            addressValue = place.formatted_address;
            const addressComponents = place.address_components;
            isValidAddress = addressComponents.some(component => component.types.includes('country')) &&
                            addressComponents.some(component => component.types.includes('route'));
        } else {
            // Если place - это сохраненный адрес, копируем его значение
            addressValue = place.address;
        }
        setValues(prevState => ({
            ...prevState,
            recipient_address: addressValue, // используем новый ключ для адреса
            isAddressValid: isValidAddress,
        }));
        checkFormValidity();
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
            city: values.city,
            delivery_time: deliveryTime, // Используем составленное или null значение,
            comment: values.comment,
            persons_qty:  persons_qty,
            amount: values.amount,
            promocode: values.promocode,
            recipient_address: values.recipient_address
        };
        console.log('Submitting form with data:', formValues);
        const orderFormData = {
            ...formValues,
            orderdishes: cartData, // уже сформированный массив блюд
        };
        //  функция для отправки заказа
        console.log('OrderFormData:', orderFormData);
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
                            <label className="delivery__label" htmlFor="recipient_address">
                                {t('delivery.delivery_address', 'Адрес доставки')}
                                <AddressAutocomplete
                                    inputClassName="delivery__input"
                                    updateAddress={handleUpdateAddress}
                                    values={values}
                                    handleChange={handleChange}
                                    addresses={currentUser.addresses || ''}
                                    handleInput={handleInput}
                                    //readOnly={values.isAddressValid}
                                />
                            </label>
                        </div>
                        <div className="delivery__description">
                            <input
                                id="rd"
                                className="delivery__input-radio"
                                type="radio"
                                name="togglRadio"
                                checked={isChecked}
                                onChange={handleRadioChange}
                                onClick={handleRadioClick}
                            />
                            <label id="rd" className="delivery__label" onClick={handleRadioClick} htmlFor="togglRadio">
                                {t('delivery.private_house', 'Частный дом')}
                            </label>
                        </div>
                        { isChecked &&
                            <div className="delivery__description">
                                <label className="delivery__label" htmlFor="private_home">{t('delivery.house', 'Дом')}
                                    <input
                                        value={values.private_home || ''}
                                        onChange={handleChange}
                                        id="private_home"
                                        className="delivery__input"
                                        name="private_home"
                                        type="text"
                                        placeholder={t('delivery.house', 'Дом')}
                                        minLength="1"
                                        maxLength="1000"
                                        required
                                    />
                                <span 
                                    className={`${errors.private_home ? "login__error" : "login__error_hidden"}`}>
                                        {t('delivery.field_required', 'Поле обязательно для ввода')}
                                </span>
                                </label>
                            </div>
                        }
                        { !isChecked && 
                            <>
                                <div className="delivery__description">
                                    <label className="delivery__label" htmlFor="home">{t('delivery.house', 'Дом')}
                                        <input
                                            value={values.home || ''}
                                            onChange={handleChange}
                                            id="home"
                                            className="delivery__input"
                                            name="home"
                                            type="text"
                                            placeholder={t('delivery.house', 'Дом')}
                                            minLength="1"
                                            maxLength="1000"
                                            required
                                        />
                                    <span 
                                        className={`${errors.home ? "login__error" : "login__error_hidden"}`}>
                                            {t('delivery.field_required', 'Поле обязательно для ввода')}
                                    </span>
                                    </label>
                                </div>
                                <div className="delivery__description">
                                    <label className="delivery__label" htmlFor="flat">{t('delivery.apartment', 'Квартира')}
                                        <input
                                            value={values.flat || ''}
                                            onChange={handleChange}
                                            id="flat"
                                            className="delivery__input"
                                            name="flat"
                                            type="text"
                                            placeholder={t('delivery.apartment', 'Квартира')}
                                            minLength="1"
                                            maxLength="1000"
                                            required
                                        />
                                    <span 
                                        className={`${errors.flat ? "login__error" : "login__error_hidden"}`}>
                                            {t('delivery.field_required', 'Поле обязательно для ввода')}
                                    </span>
                                    </label>
                                </div> 
                                <div className="delivery__description">
                                    <label className="delivery__label" htmlFor="floor">{t('delivery.floor', 'Этаж')}
                                        <input
                                            value={values.floor || ''}
                                            onChange={handleChange}
                                            id="floor"
                                            className="delivery__input"
                                            name="floor"
                                            type="text"
                                            placeholder={t('delivery.floor', 'Этаж')}
                                            minLength="1"
                                            maxLength="100"
                                            required
                                            />
                                        <span 
                                            className={`${errors.floor ? "login__error" : "login__error_hidden"}`}>
                                                {t('delivery.field_required', 'Поле обязательно для ввода')}
                                        </span>
                                    </label>
                                </div> 
                                <div className="delivery__description">
                                    <label className="delivery__label" htmlFor="homephone">{t('delivery.intercom', 'Домофон')}
                                        <input
                                            value={values.homephone || ''}
                                            onChange={handleChange}
                                            id="homephone"
                                            className="delivery__input"
                                            name="homephone"
                                            type="text"
                                            placeholder={t('delivery.intercom', 'Домофон')}
                                            minLength="1"
                                            maxLength="1000"
                                            required
                                        />
                                        <span 
                                            className={`${errors.homephone ? "login__error" : "login__error_hidden"}`}>
                                                {t('delivery.field_required', 'Поле обязательно для ввода')}
                                        </span>
                                    </label>
                                </div>
                            </>
                        }
                        <div className="delivery__description delivery__description-count">{t('delivery.number_of_utensils', 'Количество приборов')}
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
                                    value={values.comment || ''}
                                    onChange={handleChange}
                                    name="comment"
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
                                        <option key={index} value={time}>
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
                                disabled={!isValid}
                                type="button"
                                aria-label="Выберете способ оплаты">
                                    {t('delivery.choose_payment_method', 'Выберете способ оплаты')}
                            </button>
                    </form>
            </div>
        </>
    );
}

export default Delivery;