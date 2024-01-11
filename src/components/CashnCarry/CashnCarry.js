import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CashnCarry.css';

function CashnCarry() {
    const [count, setCount] = useState(1);

    // Счетчик столовых приборов
    const handleAdd = () => {
        setCount(prevCount => (prevCount < 10 ? prevCount + 1 : prevCount));
    };

    const handleDelete = () => {
        setCount(prevCount => (prevCount > 0 ? prevCount - 1 : prevCount));
    };
    //end

    // Функция для создания массива временных интервалов, начиная с 10:30
    const generateTimeOptions = () => {
        const intervals = [];
        for (let hour = 10; hour < 23; hour++) {
            // Установить начальные минуты в 30, если это первый цикл (10:30)
            let minute = hour === 10 ? 30 : 0;
            do {
                const time = `${hour < 10 ? '0' : ''}${hour}:${minute === 0 ? '00' : minute}`;
                intervals.push(time);
                // Прибавляем 30 минут
                minute += 30;
                // Если минуты достигли 60, увеличиваем час на единицу и сбрасываем минуты
                if(minute === 60) {
                    minute = 0;
                    break; // Прерываем внутренний цикл, чтобы начать следующий час
                }
            } while (minute <= 30);

            // Условие для остановки цикла после добавления 22:30
            if (hour === 22 && minute === 0) {
                    break;
                }
        }
        return intervals;
    };
    const timeOptions = generateTimeOptions();
    //end


    // Функция для вывода дня и месяца
    const generateDateOptions = () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); // Месяцы начинаются с 0 в JavaScript
        const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        const dates = ["Как можно быстрее"];

        // Получить количество дней в текущем месяце
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let day = today.getDate(); day <= daysInMonth; day++) {
            // Форматируем число, добавляя ведущий ноль, если нужно
            const formattedDay = day < 10 ? `0${day}` : day;
            const monthName = monthNames[currentMonth];
            const date = `${formattedDay} ${monthName}`;
            dates.push(date);
        }
        return dates;
    };
    const dateOptions = generateDateOptions();
    //end

    return (
        <>
            <div className="delivery">
                <form className="delivery__form">
                        <div className="delivery__container">
                            <label className="delivery__label" htmlFor="name">Ваше имя
                                <input
                                    id="name"
                                    className="delivery__input"
                                    name="name"
                                    type="text"
                                    placeholder="Имя"
                                    minLength="2"
                                    maxLength="40"
                                    required
                                /></label>
                        </div>    
                        <div className="delivery__container">
                            <label className="delivery__label" htmlFor="phone">Ваш телефон
                                <input
                                    id="phone"
                                    className="delivery__input"
                                    name="phone"
                                    type="tel"
                                    placeholder="+"
                                    minLength="10"
                                    maxLength="14"
                                    required
                                /></label>
                        </div>    
                        <div className="delivery__container">
                            <label className="delivery__label" htmlFor="adress">Пункт самовывоза
                                <input
                                    id="adress"
                                    className="delivery__input"
                                    name="adress"
                                    type="text"
                                    placeholder="Пункт самовывоза"
                                    minLength="10"
                                    maxLength="40"
                                    required
                                /></label>
                        </div>
                        <div className="delivery__container">Количество приборов
                            <button
                                onClick={handleDelete}
                                aria-label="Минус"
                                type="button"
                                className="cart__btn-product_delete app__button-opacity">
                            </button>
                            <span className="cart__product-count">{count}</span>
                            <button
                                onClick={handleAdd}
                                aria-label="Плюс"
                                type="button"
                                className="cart__btn-product_add app__button-opacity">
                            </button>
                        </div>
                        <div className="delivery__container">
                            <label className="delivery__label">Комментарий к заказу
                                <textarea
                                    className="delivery__textarea"
                                    placeholder="Напиши свои комментарии к Вашему заказу"
                                />
                            </label>
                        </div>
                        <div className="delivery__container">Укажите дату и время
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
                    </form>
                    <Link to="/payment">
                        <button 
                            aria-label="Выберете способ оплаты"
                            type="submit"
                            className="delivery__btn app__button-opacity">Выберете способ оплаты
                        </button>
                    </Link>
            </div>
        </>
    );
}

export default CashnCarry;