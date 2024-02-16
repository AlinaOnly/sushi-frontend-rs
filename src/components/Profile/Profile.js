import React, {useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/FormValidation';
import { EMAIL, NAME, PHONE } from '../../utils/errors';
import ProfileNav from '../ProfileNav/ProfileNav';
import { useTranslation } from 'react-i18next';
import './Profile.css';

function Profile({ onUpdateProfile, handleLogout, errorMessage }) {

    const { t } = useTranslation();

    const currentUser = useContext(CurrentUserContext);
    const [isDisableInput, setDisableInput] = useState(true);
    const { values, isValid, errors, handleChange, setValues,  formatDateToServer, formatDateToInput } = useFormValidation();

    useEffect(() => {
        const inputData = {};
        if (currentUser) {
            Object.keys(currentUser).forEach(key => {
                inputData[key] = key === 'date_of_birth'
                ? formatDateToInput(currentUser['date_of_birth']) // Форматируем в YYYY-MM-DD для input
                : currentUser[key];
            });
        }
        setValues(inputData);
    }, [currentUser, formatDateToInput]);

    function handleSubmit(event) {
        event.preventDefault();
        let dateOfBirth = values.date_of_birth;
        // Преобразуем дату только если она включает символ '-', предполагая, что формат YYYY-MM-DD
        if (dateOfBirth.includes('-') && !dateOfBirth.includes('.')) {
            dateOfBirth = formatDateToServer(values.date_of_birth);
        }
        onUpdateProfile(
            values.first_name,
            values.last_name,
            values.email,
            values.phone,
            dateOfBirth,
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
                <h2 className="profile__text">{t('profile.hello', 'Привет,')} {currentUser.first_name}!</h2>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="first_name">{t('profile.first_name', 'Имя')}
                            <input
                                disabled={isDisableInput}
                                value={values.first_name || ''}
                                onChange={handleChange}
                                id="first_name"
                                className="profile__input"
                                name="first_name"
                                type="text"
                                placeholder={t('profile.first_name', 'Имя')}
                                minLength="2"
                                maxLength="40"
                                required
                            /></label>
                            <span 
                                className={`${errors.first_name ? "profile__error" : "profile__error_hidden"}`}>
                                    {t('errors.enter_text_of_min_two_letters', 'Введите текст не менее двух букв')}
                            </span>
                    </div>    
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="last_name">{t('profile.last_name', 'Фамилия')}
                            <input
                                disabled={isDisableInput}
                                value={values.last_name || ''}
                                onChange={handleChange}
                                id="last_name"
                                className="profile__input"
                                name="last_name"
                                type="text"
                                placeholder={t('profile.last_name', 'Фамилия')}
                                minLength="2"
                                maxLength="40"
                            /></label>
                            <span 
                                className={`${errors.last_name ? "profile__error" : "profile__error_hidden"}`}>
                                    {t('errors.enter_text_of_min_two_letters', 'Введите текст не менее двух букв')}
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
                                    {t('errors.enter_valid_email', 'Введите валидную почту(name@mail.com)')}
                            </span>
                    </div>
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="phone">{t('profile.phone', 'Телефон')}
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
                                    {t('errors.enter_valid_phone_starting_with_plus', 'Введите валидный телефон начиная с +')}
                            </span>
                    </div>
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="date_of_birth">{t('profile.date_of_birth', 'Дата рождения')}
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
                                    {t('profile.enter_birth_date', 'Введите дату своего рождения')}
                            </span>
                    </div> 
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="messenger">Messenger
                            <input
                                disabled={isDisableInput}
                                value={values.messenger_type === 'tm' ? 
                                    (values.messenger?.msngr_username || '') : 
                                    (values.messenger?.msngr_phone || '')}
                                onChange={handleChange}
                                id="messenger"
                                className="profile__input"
                                name={values.messenger_type === 'tm' ? 'msngr_username' : 'msngr_phone'}
                                placeholder={values.messenger_type === 'tm' ? '@username' : '+'}
                                minLength={values.messenger_type === 'wa' ? 10 : 3}
                                maxLength="50"
                                //required
                            /></label>
                            <span 
                                className={`${errors.messenger ? "profile__error" : "profile__error_hidden"}`}>
                                    {t('profile.enter_telegram_or_whatsapp', 'Введите ник Telegram или номер Whatsapp')}
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
                            {t('profile.save', 'Сохранить')}
                    </button>)
                    : ( <>
                            <button 
                                onClick={changeUserInformation}
                                className="app__text-opacity profile__submit-button"
                                type="button"
                                aria-label="Редактировать">
                                    {t('profile.edit', 'Редактировать')}
                            </button>
                            <button 
                                type="button" 
                                className="profile__signout"
                                onClick={handleLogOut}>
                                    {t('profile.log_out', 'Выйти из аккаунта')}
                            </button>
                        </>
                    )
                }
                <p className="register__error-text">{errorMessage && t(errorMessage)}</p>
            </div>
        </>
    );
}

export default Profile; 