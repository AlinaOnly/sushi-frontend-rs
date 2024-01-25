import React, {useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/FormValidation';
import { EMAIL, NAME, PHONE } from '../../utils/errors';
import ProfileNav from '../ProfileNav/ProfileNav';
import './Profile.css';

function Profile({ onUpdateProfile, handleLogout, errorMessage }) {
    const currentUser = useContext(CurrentUserContext);
    const [isDisableInput, setDisableInput] = useState(true);
    const { values, isValid, errors, handleChange, setValues } = useFormValidation();

    useEffect(() => {
        setValues({
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            email: currentUser.email,
            phone: currentUser.phone,
        });
    }, [currentUser, setValues]);

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateProfile(
            values.first_name,
            values.last_name,
            values.phone,
            values.email);
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
                                className={`${errors.name ? "profile__error" : "profile__error_hidden"}`}>
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
                                className={`${errors.date ? "profile__error" : "profile__error_hidden"}`}>
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
                                type="phone"
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
                </form>
                { !isDisableInput
                    ? (<button 
                            disabled={!isValid}
                            onClick={handleSubmit}
                            className={
                                `app__text-opacity 
                                ${isValid && (currentUser.first_name !== values.first_name || currentUser.last_name !== values.last_name
                                    || currentUser.email !== values.email || currentUser.phone !== values.phone
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