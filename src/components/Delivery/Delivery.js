import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/FormValidation';
import './Delivery.css';

function Delivery() {
    //состояние кнопки radio
    const [isChecked, setIsChecked] = useState(false);
    //каунтер до 10 приборов
    const [count, setCount] = useState(1);

    //если залогинился юзер - вписать автоматически его данные
    const currentUser = useContext(CurrentUserContext);
    const { values, isValid, errors, setValues, handleChange } = useFormValidation();

    useEffect(() => {
        setValues({
            first_name: currentUser.first_name,
            phone: currentUser.phone,
            adress: currentUser.adress,
        });
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
            // Для первого часа начинаем с 30 минут, иначе с 0.
            let startMinute = hour === startHour ? 30 : 0;

            // Добавляем интервалы по 30 минут
            intervals.push(`${hour}:${startMinute === 0 ? '00' : startMinute}`);
            if (startMinute === 30 || hour < endHour) {
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
        const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        const dates = ["Как можно быстрее"];

        // Определяем дату на месяц вперед от сегодня
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(today.getMonth() + 1);

        let dateIterator = new Date(today);
        while (dateIterator <= oneMonthFromNow) {
            const day = dateIterator.getDate();
            const month = dateIterator.getMonth();
            const year = dateIterator.getFullYear(); // Если нужно, можно добавить год

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

    return (
        <>
            <div className="delivery">
                <form className="delivery__form" onSubmit={handleSubmit}>
                        <div className="delivery__description">
                            <label className="delivery__label" htmlFor="first_name">Ваше имя
                                <input
                                    value={values.first_name || ''}
                                    onChange={handleChange}
                                    id="first_name"
                                    className="delivery__input"
                                    name="first_name"
                                    type="text"
                                    placeholder="Имя"
                                    minLength="2"
                                    maxLength="40"
                                    required
                                />
                                <span 
                                    className={`${errors.first_name ? "login__error" : "login__error_hidden"}`}>
                                        Поле обязательно для ввода
                                </span>
                            </label>
                        </div>    
                        <div className="delivery__description">
                            <label className="delivery__label" htmlFor="phone">Ваш телефон
                                <input
                                    value={values.phone || ''}
                                    onChange={handleChange}
                                    id="phone"
                                    className="delivery__input"
                                    name="phone"
                                    type="tel"
                                    placeholder="+"
                                    minLength="10"
                                    maxLength="14"
                                    required
                                />
                                <span 
                                    className={`${errors.phone ? "login__error" : "login__error_hidden"}`}>
                                        Поле обязательно для ввода
                                </span>
                            </label>
                        </div>    
                        <div className="delivery__description">
                            <label className="delivery__label" htmlFor="adress">Адрес доставки
                                <input
                                    value={values.adress || ''}
                                    onChange={handleChange}
                                    id="adress"
                                    className="delivery__input"
                                    name="adress"
                                    type="text"
                                    placeholder="Ваш адрес"
                                    minLength="2"
                                    maxLength="40"
                                    required
                                />
                                <span 
                                    className={`${errors.adress ? "login__error" : "login__error_hidden"}`}>
                                        Поле обязательно для ввода
                                </span>
                            </label>
                        </div>
                        <div className="delivery__description">
                            <label className="delivery__label" htmlFor="region">Регион
                                <input
                                    id="region"
                                    className="delivery__input"
                                    name="region"
                                    type="text"
                                    placeholder="Ваш регион"
                                    minLength="10"
                                    maxLength="40"
                                    //required
                                />
                                <span 
                                    className={`${errors.region ? "login__error" : "login__error_hidden"}`}>
                                        Поле обязательно для ввода
                                </span>
                            </label>
                        </div>
                        <div className="delivery__description">Количество приборов
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
                                Частный дом
                            </label>
                        </div>
                        { isChecked &&
                            <div className="delivery__description">
                                <label className="delivery__label" htmlFor="home">Дом
                                    <input
                                        id="home"
                                        className="delivery__input"
                                        name="home"
                                        type="text"
                                        placeholder="Дом"
                                        minLength="1"
                                        maxLength="6"
                                        //required
                                    />
                                <span 
                                    className={`${errors.home ? "login__error" : "login__error_hidden"}`}>
                                        Поле обязательно для ввода
                                </span>
                                </label>
                            </div>
                        }
                        { !isChecked && 
                            <>
                                <div className="delivery__description">
                                    <label className="delivery__label" htmlFor="flat">Квартира
                                        <input
                                            id="flat"
                                            className="delivery__input"
                                            name="flat"
                                            type="text"
                                            placeholder="Квартира"
                                            minLength="1"
                                            maxLength="1000"
                                            //required
                                        />
                                    <span 
                                        className={`${errors.flat ? "login__error" : "login__error_hidden"}`}>
                                            Поле обязательно для ввода
                                    </span>
                                    </label>
                                </div> 
                                <div className="delivery__description">
                                    <label className="delivery__label" htmlFor="floor">Этаж
                                        <input
                                            id="floor"
                                            className="delivery__input"
                                            name="floor"
                                            type="text"
                                            placeholder="Этаж"
                                            minLength="1"
                                            maxLength="100"
                                            //required
                                            />
                                        <span 
                                            className={`${errors.floor ? "login__error" : "login__error_hidden"}`}>
                                                Поле обязательно для ввода
                                        </span>
                                    </label>
                                </div> 
                                <div className="delivery__description">
                                    <label className="delivery__label" htmlFor="homephone">Домофон
                                        <input
                                            id="homephone"
                                            className="delivery__input"
                                            name="homephone"
                                            type="text"
                                            placeholder="Домофон"
                                            minLength="1"
                                            maxLength="1000"
                                            //required
                                        />
                                        <span 
                                            className={`${errors.homephone ? "login__error" : "login__error_hidden"}`}>
                                                Поле обязательно для ввода
                                        </span>
                                    </label>
                                </div>
                            </>
                        }
                        <div className="delivery__description">
                            <label className="delivery__label">Комментарий к заказу
                                <textarea
                                    className="delivery__textarea"
                                    placeholder="Напиши свои комментарии к Вашему заказу"
                                />
                            </label>
                        </div>
                        <div className="delivery__container">
                            Укажите дату и время
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
                                    Выберете способ оплаты
                            </button>
                        </Link>
                    </form>
            </div>
        </>
    );
}

export default Delivery;