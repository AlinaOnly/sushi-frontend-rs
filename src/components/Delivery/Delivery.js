import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/FormValidation';
import { useTranslation } from 'react-i18next';
import AddressAutocomplete from '../../utils/AddressAutocomplete';
import './Delivery.css';

function Delivery() {

    const { t } = useTranslation();

    //состояние кнопки radio
    const [isChecked, setIsChecked] = useState(false);

    //каунтер до 10 приборов
    const [count, setCount] = useState(1);

    //если залогинился юзер - вписать автоматически его данные
    const currentUser = useContext(CurrentUserContext);
    const { values, isValid, errors, setValues, formRef, handleChange, handleInput, checkFormValidity } = useFormValidation();

    useEffect(() => {
        // Устанавливаем начальные значения для формы, используя информацию о текущем пользователе
        if (currentUser && Array.isArray(currentUser.addresses)) {
            const lastAddress = currentUser.addresses.length > 0 ?
                currentUser.addresses[currentUser.addresses.length - 1].address : ''; 
            setValues({
                first_name: currentUser.first_name || '',
                phone: currentUser.phone || '',
                address: lastAddress,
            });
        }
    }, [currentUser, setValues]);

    function handleSubmit(event) {
        event.preventDefault();
    }
    //end

    // Счетчик столовых приборов
    const handleAdd = () => {
        setCount(prevCount => (prevCount < 10 ? prevCount + 1 : prevCount));
    };

    const handleDelete = () => {
        setCount(prevCount => (prevCount > 0 ? prevCount - 1 : prevCount));
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
    const generateDateOptions = () => {
        const today = new Date();
        const monthNames = t('months', {
            returnObjects: true,
            defaultValue: [
                "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
                "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
            ]
        });
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
            const monthName = monthNames[month];
            const date = `${formattedDay} ${monthName}`; // ${year}, если нужен год
            dates.push(date);
            // Переходим к следующему дню
            dateIterator.setDate(dateIterator.getDate() + 1);
        }
        return dates;
    };
    const dateOptions = generateDateOptions();
    //end

    const handleUpdateAddress = (place) => {
        // Обновление адреса, если он выбран из Google Places Autocomplete
        if (place.address_components) {
            const addressComponents = place.address_components;
            const formattedAddress = place.formatted_address;
            const hasCountry = addressComponents.some(component => component.types.includes('country'));
            const hasRoute = addressComponents.some(component => component.types.includes('route'));
            const isValidAddress = hasCountry && hasRoute;

            setValues(prevState => ({
                ...prevState,
                address: formattedAddress,
                isAddressValid: isValidAddress,
            }));
        } else {
            // Обработка сохраненных адресов
            setValues(prevState => ({
                ...prevState,
                address: place, // в этом случае place является строкой сохраненного адреса
            }));
        }
        checkFormValidity();
    };

    return (
        <>
            <div className="delivery">
                <form ref={formRef} className="delivery__form" onSubmit={handleSubmit}>
                        <div className="delivery__description">
                            <label className="delivery__label" htmlFor="first_name">{t('delivery.your_name', 'Ваше имя')}
                                <input
                                    value={values.first_name || ''}
                                    onChange={handleChange}
                                    id="first_name"
                                    className="delivery__input"
                                    name="first_name"
                                    type="text"
                                    placeholder={t('delivery.name', 'Имя')}
                                    minLength="2"
                                    maxLength="150"
                                    pattern="^[A-Za-zА-Яа-яЁё]{2,150}$"
                                    required
                                />
                                <span 
                                    className={`${errors.first_name ? "login__error" : "login__error_hidden"}`}>
                                        {t('delivery.field_required', 'Поле обязательно для ввода')}
                                </span>
                            </label>
                        </div>    
                        <div className="delivery__description">
                            <label className="delivery__label" htmlFor="phone">{t('delivery.your_phone', 'Ваш телефон')}
                                <input
                                    value={values.phone || ''}
                                    onChange={handleChange}
                                    id="phone"
                                    className="delivery__input"
                                    name="phone"
                                    type="tel"
                                    placeholder="+"
                                    minLength="11"
                                    maxLength="14"
                                    pattern="^\+[0-9]{11,14}$"
                                    required
                                />
                                <span 
                                    className={`${errors.phone ? "login__error" : "login__error_hidden"}`}>
                                        {t('delivery.field_required', 'Поле обязательно для ввода')}
                                </span>
                            </label>
                        </div>    
                        <div className="delivery__description">
                            <label className="delivery__label" htmlFor="address">
                                {t('delivery.delivery_address', 'Адрес доставки')}
                                <AddressAutocomplete
                                    inputClassName="delivery__input"
                                    updateAddress={handleUpdateAddress}
                                    values={values}
                                    handleChange={handleChange}
                                    addresses={currentUser.addresses}
                                    handleInput={handleInput}
                                />
                            </label>
                        </div>
                        <div className="delivery__description">{t('delivery.number_of_utensils', 'Количество приборов')}
                            <button
                                onClick={handleDelete}
                                aria-label="Минус"
                                type="button"
                                className="delivery__btn-product_delete app__button-opacity">
                            </button>
                            <span className="delivery__product-count">{count}</span>
                            <button
                                onClick={handleAdd}
                                aria-label="Плюс"
                                type="button"
                                className="delivery__btn-product_add app__button-opacity">
                            </button>
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
                            <label id="rd" className="delivery__label" onClick={handleRadioClick}>
                                {t('delivery.private_house', 'Частный дом')}
                            </label>
                        </div>
                        { isChecked &&
                            <div className="delivery__description">
                                <label className="delivery__label" htmlFor="home">{t('delivery.house', 'Дом')}
                                    <input
                                        id="home"
                                        className="delivery__input"
                                        name="home"
                                        type="text"
                                        placeholder={t('delivery.house', 'Дом')}
                                        minLength="1"
                                        maxLength="1000"
                                        //required
                                    />
                                <span 
                                    className={`${errors.home ? "login__error" : "login__error_hidden"}`}>
                                        {t('delivery.field_required', 'Поле обязательно для ввода')}
                                </span>
                                </label>
                            </div>
                        }
                        { !isChecked && 
                            <>
                                <div className="delivery__description">
                                    <label className="delivery__label" htmlFor="flat">{t('delivery.apartment', 'Квартира')}
                                        <input
                                            id="flat"
                                            className="delivery__input"
                                            name="flat"
                                            type="text"
                                            placeholder={t('delivery.apartment', 'Квартира')}
                                            minLength="1"
                                            maxLength="1000"
                                            //required
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
                                            id="floor"
                                            className="delivery__input"
                                            name="floor"
                                            type="text"
                                            placeholder={t('delivery.floor', 'Этаж')}
                                            minLength="1"
                                            maxLength="100"
                                            //required
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
                                            id="homephone"
                                            className="delivery__input"
                                            name="homephone"
                                            type="text"
                                            placeholder={t('delivery.intercom', 'Домофон')}
                                            minLength="1"
                                            maxLength="1000"
                                            //required
                                        />
                                        <span 
                                            className={`${errors.homephone ? "login__error" : "login__error_hidden"}`}>
                                                {t('delivery.field_required', 'Поле обязательно для ввода')}
                                        </span>
                                    </label>
                                </div>
                            </>
                        }
                        <div className="delivery__description">
                            <label className="delivery__label">{t('delivery.order_comment', 'Комментарий к заказу')}
                                <textarea
                                    className="delivery__textarea"
                                    placeholder={t('delivery.write_your_order_comments', 'Напишите свои комментарии к Вашему заказу')}
                                />
                            </label>
                        </div>
                        <div className="delivery__container">
                            {t('delivery.specify_date_time', 'Укажите дату и время')}
                                <select className="delivery__select" id="month" name="selectedMonth">
                                    {dateOptions.map((date, index) => (
                                        <option key={index} value={date} className="delivery__select-month">
                                            {date}
                                        </option>
                                    ))}
                                </select>
                                <select className="delivery__select" id="time" name="selectedTime">
                                    {timeOptions.map((time, index) => (
                                        <option key={index} value={time} className="delivery__select-time">
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            
                        </div>
                        <Link to="/payment">
                            <button 
                                //onClick={handleSubmit}
                                className=
                                {`delivery__btn ${!isValid ? "delivery__btn-save_disable" : "app__button-opacity"}`}
                                disabled={!isValid}
                                type="submit"
                                aria-label="Выберете способ оплаты">
                                    {t('delivery.choose_payment_method', 'Выберете способ оплаты')}
                            </button>
                        </Link>
                    </form>
            </div>
        </>
    );
}

export default Delivery;