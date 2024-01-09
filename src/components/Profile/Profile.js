import React, {useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/FormValidation';
import { EMAIL, NAME, PHONE } from '../../utils/errors';
//import { NavLink, Link } from "react-router-dom";
import ProfileNav from '../ProfileNav/ProfileNav';
import './Profile.css';
//import { REGEX_MAIL } from '../../utils/consts';

function Profile({ onUpdateProfile, onLogout, errorMessage }) {
    const currentUser = useContext(CurrentUserContext);
    const [isDisableInput, setDisableInput] = useState(true);
    const { values, isValid, errors, handleChange, setValues } = useFormValidation();

    useEffect(() => {
        setValues({
            name: currentUser.name,
            email: currentUser.email});
    }, [currentUser, setValues]);

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateProfile(
            values.name,
            values.last_name,
            values.phone,
            values.email);
        setDisableInput(true);
    }

    function changeUserInformation() {
        setDisableInput(false);
    }

    function handleLogout() {
        onLogout();
    }

    return (
        <>
            <ProfileNav />
            <div className="profile">
                <h2 className="profile__text">Привет, {currentUser.name}!</h2>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="name">Имя
                            <input
                                disabled={isDisableInput}
                                value={values.name || ''}
                                onChange={handleChange}
                                id="name"
                                className="profile__input"
                                name="name"
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
                        <label className="profile__label" htmlFor="date">День рождения
                            <input
                                id="date"
                                className="profile__input"
                                name="date"
                                type="date"
                                autoComplete="off"
                                placeholder="День рождения"
                                minLength="8"
                                maxLength="8"
                                
                                
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
                                //pattern={REGEX_MAIL}
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
                                id="phone"
                                className="profile__input"
                                name="phone"
                                type="phone"
                                placeholder="+"
                                minLength="12"
                                maxLength="13"
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
                                ${isValid && (currentUser.name !== values.name || currentUser.email !== values.email)
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
                                onClick={handleLogout}>
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