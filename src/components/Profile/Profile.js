import React, {useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/FormValidation';
import { EMAIL, NAME, PHONE } from '../../utils/errors';
import ProfileNav from '../ProfileNav/ProfileNav';
import './Profile.css';

function Profile({ onUpdateProfile, handleLogout, errorMessage }) {
    const currentUser = useContext(CurrentUserContext);
    const [isDisableInput, setDisableInput] = useState(true);
    const { values, isValid, errors, handleChange, setValues,  formatDateToServer, formatDateToInput } = useFormValidation();

    /*useEffect(() => {
        setValues({
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            email: currentUser.email,
            phone: currentUser.phone,
            date_of_birth: currentUser.date_of_birth,
            messenger: currentUser.messenger,
        });
    }, [currentUser, setValues]);*/

    /*useEffect(() => {
        setValues({
            ...currentUser,
            date_of_birth: currentUser.date_of_birth ? formatDate(currentUser.date_of_birth) : currentUser.date_of_birth,
        });
    }, [currentUser, setValues]);*/

    useEffect(() => {
        const inputData = {};
        if (currentUser) {
            Object.keys(currentUser).forEach(key => {
                inputData[key] = key === 'date_of_birth'
                ? formatDateToInput(currentUser['date_of_birth'])
                : currentUser[key];
            });
        }
        setValues(inputData);
    }, [currentUser, formatDateToInput]);

    /*function handleSubmit(event) {
        event.preventDefault();
        onUpdateProfile(
            values.first_name,
            values.last_name,
            values.email,
            values.phone,
            values.date_of_birth,
            values.messenger
        );
        setDisableInput(true);
    }*/

    function handleSubmit(event) {
        // При отправке формы форматируем дату обратно для сервера
        event.preventDefault();
        const dateOfBirth = values.date_of_birth.includes('-')
            ? formatDateToServer(values.date_of_birth)
            : values.date_of_birth;
        onUpdateProfile(
            values.first_name,
            values.last_name,
            values.email,
            values.phone,
            dateOfBirth, // Используем значение в формате для сервера
            values.messenger
        );
        setDisableInput(true);
    }

    function changeUserInformation() {
        setDisableInput(false);
    }

    function handleLogOut() {
        handleLogout();
    }

    return (
        <>
            <ProfileNav />
            <div className="profile">
                <h2 className="profile__text">Привет, {currentUser.first_name}!</h2>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="first_name">Имя
                            <input
                                disabled={isDisableInput}
                                value={values.first_name || ''}
                                onChange={handleChange}
                                id="first_name"
                                className="profile__input"
                                name="first_name"
                                type="text"
                                placeholder="Имя"
                                minLength="2"
                                maxLength="40"
                                required
                            /></label>
                            <span 
                                className={`${errors.first_name ? "profile__error" : "profile__error_hidden"}`}>
                                        {NAME}
                            </span>
                    </div>    
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="last_name">Фамилия
                            <input
                                disabled={isDisableInput}
                                value={values.last_name || ''}
                                onChange={handleChange}
                                id="last_name"
                                className="profile__input"
                                name="last_name"
                                type="text"
                                placeholder="Фамилия"
                                minLength="2"
                                maxLength="40"
                            /></label>
                            <span 
                                className={`${errors.last_name ? "profile__error" : "profile__error_hidden"}`}>
                                        {NAME}
                            </span>
                    </div>    
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="email">E-mail
                            <input
                                disabled={isDisableInput}
                                value={values.email || ''}
                                onChange={handleChange}
                                id="email"
                                className="profile__input"
                                name="email"
                                type="email"
                                placeholder="Email"
                                minLength="6"
                                maxLength="40"
                                pattern="^(http(s){0,1}:\/\/.){0,1}[\-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$"
                                required
                            /></label>
                            <span 
                                className={`${errors.email ? "profile__error" : "profile__error_hidden"}`}>
                                        {EMAIL}
                            </span>
                    </div>
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="phone">Телефон
                            <input
                                disabled={isDisableInput}
                                value={values.phone || ''}
                                onChange={handleChange}
                                id="phone"
                                className="profile__input"
                                name="phone"
                                type="tel"
                                placeholder="+"
                                minLength="12"
                                maxLength="13"
                                pattern="^((8|\+3)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,13}$"
                                required
                            /></label>
                            <span 
                                className={`${errors.phone ? "profile__error" : "profile__error_hidden"}`}>
                                        {PHONE}
                            </span>
                    </div>
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="date_of_birth">Дата рождения
                            <input
                                disabled={isDisableInput}
                                value={values.date_of_birth || ''}
                                onChange={handleChange}
                                id="date_of_birth"
                                className="profile__input"
                                name="date_of_birth"
                                type="date"
                            /></label> 
                            <span 
                                className={`${errors.date_of_birth ? "profile__error" : "profile__error_hidden"}`}>
                                    ВВедите дату своего рождения
                            </span>
                    </div> 
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="messenger">Мессенджер
                            <input
                                disabled={isDisableInput}
                                value={values.messenger_type === 'tm' ? 
                                    (values.messenger?.msngr_username || '') : 
                                    (values.messenger?.msngr_phone || '')}
                                onChange={handleChange}
                                id="messenger"
                                className="profile__input"
                                name={values.messenger_type === 'tm' ? 'msngr_username' : 'msngr_phone'}
                                placeholder={values.messenger_type === 'tm' ? '@username' : 'Номер телефона'}
                                minLength={values.messenger_type === 'wa' ? 10 : 3}
                                maxLength="50"
                                //required
                            /></label>
                            <span 
                                className={`${errors.messenger ? "profile__error" : "profile__error_hidden"}`}>
                                    Введите ник Telegram или номер Whatsapp
                            </span>
                    </div>               
                </form>
                { !isDisableInput
                    ? (<button 
                            disabled={!isValid}
                            onClick={handleSubmit}
                            className={
                                `app__text-opacity 
                                ${isValid && (currentUser.first_name !== values.first_name || currentUser.last_name !== values.last_name
                                    || currentUser.email !== values.email || currentUser.phone !== values.phone 
                                    || currentUser.date_of_birth !== values.date_of_birth || currentUser.messenger !== values.messenger
                                )
                                ? "profile__button-save" : "profile__button-save_disable"}`}
                            type="submit"
                            aria-label="Сохранить"
                        >
                        Сохранить
                    </button>)
                    : ( <>
                            <button 
                                onClick={changeUserInformation}
                                className="app__text-opacity profile__submit-button"
                                type="button"
                                aria-label="Редактировать">
                                    Редактировать
                            </button>
                            <button 
                                type="button" 
                                className="profile__signout"
                                onClick={handleLogOut}>
                                    Выйти из аккаунта
                            </button>
                        </>
                    )
                }
                <p className="register__error-text">{errorMessage}</p>
            </div>
        </>
    );
}

export default Profile; 