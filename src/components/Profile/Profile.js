import React, {useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../utils/FormValidation';
import ProfileNav from '../ProfileNav/ProfileNav';
import { useTranslation } from 'react-i18next';
import './Profile.css';

function Profile({ onUpdateProfile, handleLogout, errorMessage, onUpdateEmail, onUpdatePassword }) {

    const { t } = useTranslation();

    const currentUser = useContext(CurrentUserContext);
    const [isDisableInput, setDisableInput] = useState(true);
    const [isDisableEmailInput, setDisableEmailInput] = useState(true);
    const [isDisablePasswordInput, setDisablePasswordInput] = useState(true);
    const { values, isValid, errors, formRef, handleChange,
        setValues,  formatDateToServer, formatDateToInput } = useFormValidation(currentUser);

    useEffect(() => {
        const inputData = {};
        if (currentUser) {
            Object.keys(currentUser).forEach(key => {
                inputData[key] = key === 'date_of_birth'
                ? formatDateToInput(currentUser['date_of_birth']) // Форматируем в YYYY-MM-DD для input
                : currentUser[key];
                // Если есть email, значит добавляем новый ключ для newEmail и устанавливаем пустое значение
                inputData['newEmail'] = currentUser.email || '';
                inputData['currentPassword'] = currentUser.password || '';
                inputData['newPassword'] = currentUser.password || '';
            });
        }
        setValues(inputData);
    }, [currentUser, formatDateToInput, setValues]);

    /* useEffect(() => {
        setValues(v => ({ ...v, newEmail: currentUser.email || '' }));
    }, [currentUser]);*/

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
            values.phone,
            dateOfBirth,
            values.messenger
        );
        setDisableInput(true);
    }

    function handleSubmitEmail(event) {
        event.preventDefault();
        if (values.newEmail && values.newEmail !== currentUser.email) {
            onUpdateEmail(
                values.currentPassword,
                values.newEmail
            );
        }
        setDisableEmailInput(true);
    }

    function handleSubmitPassword(event) {
        event.preventDefault();
        if (values.newPassword && values.newPassword !== currentUser.password) {
            onUpdatePassword(
                values.currentPassword,
                values.newPassword
            );
        }
        setDisablePasswordInput(true);
    }

    function changeUserInformation() {
        setDisableInput(false);
    }

    function changeUserEmailInformation() {
        setDisableEmailInput(false);
    }

    function changeUserPasswordInformation() {
        setDisablePasswordInput(false);
    }

    function handleLogOut() {
        handleLogout();
    }

    return (
        <>
            <ProfileNav />
            <div className="profile">
                <h2 className="profile__text">{t('profile.hello', 'Привет,')} {currentUser.first_name}!</h2>
                <form ref={formRef} className="profile__form" onSubmit={handleSubmit} noValidate>
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
                                maxLength="150"
                                pattern="^[A-Za-zА-Яа-яЁё]{2,150}$"
                                required
                            /></label>
                            <span 
                                className={`${errors.first_name ? "profile__error" : "profile__error_hidden"}`}>
                                    {t('errors.enter_text_of_min_two_letters', 'Введите имя или фамилию от 2 букв')}
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
                                maxLength="150"
                                pattern="^[A-Za-zА-Яа-яЁё]{2,150}$"
                                required
                            /></label>
                            <span 
                                className={`${errors.last_name ? "profile__error" : "profile__error_hidden"}`}>
                                    {t('errors.enter_text_of_min_two_letters', 'Введите имя или фамилию от 2 букв')}
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
                                minLength="11"
                                maxLength="14"
                                pattern="^\+[0-9]{11,14}$"
                                required
                            /></label>
                            <span 
                                className={`${errors.phone ? "profile__error" : "profile__error_hidden"}`}>
                                    {t('errors.enter_valid_phone_starting_with_plus', 'Номер телефона должен начинаться с "+" и содержать от 11 до 14 цифр')}
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
                                required
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
                                required
                            /></label>
                            <span 
                                className={`${errors.messenger ? "profile__error" : "profile__error_hidden"}`}>
                                    {t('profile.enter_telegram_or_whatsapp', 'Введите ник Telegram или номер Whatsapp')}
                            </span>
                    </div>               
                </form>
                { !isDisableInput ? (
                        <button 
                            disabled={!isValid}
                            onClick={handleSubmit}
                            className={
                                `app__text-opacity 
                                ${isValid && (currentUser.first_name !== values.first_name 
                                    || currentUser.last_name !== values.last_name
                                    || currentUser.phone !== values.phone 
                                    || currentUser.date_of_birth !== values.date_of_birth 
                                    || currentUser.messenger !== values.messenger
                                )
                                ? "profile__button-save" : "profile__button-save_disable"}`}
                            type="submit"
                            aria-label={t('profile.save', 'Сохранить')}>
                                {t('profile.save', 'Сохранить')}
                        </button>
                    ) : ( 
                            <button 
                                onClick={changeUserInformation}
                                className="app__text-opacity profile__submit-button"
                                type="button"
                                aria-label={t('profile.edit', 'Редактировать профиль')}>
                                    {t('profile.edit', 'Редактировать профиль')}
                            </button>
                )}
                <form ref={formRef} className="profile__form" onSubmit={handleSubmitEmail} noValidate>
                    <div className="profile__container">
                            <label className="profile__label" htmlFor="currentPassword">{t('profile.current_password', 'Текущий пароль')}
                                <input
                                    disabled={isDisableEmailInput}
                                    value={values.currentPassword || ''}
                                    onChange={handleChange}
                                    className="profile__input"
                                    id="currentPassword"
                                    name="currentPassword"
                                    type="password"
                                    minLength="8"
                                    maxLength="100"
                                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$"
                                    placeholder={t('profile.new_password', 'Введите теущий пароль')}
                                    required
                                /></label>
                                <span className={errors.currentPassword ? "profile__error" : "profile__error_hidden"}>
                                    {t('errors.enter_password_of_min_8_chars', 'Пароль должен состоять из цифр и латинских букв, длина не менее 8 символов')}
                                </span>
                        </div>
                        <div className="profile__container">
                            <label className="profile__label" htmlFor="newEmail">E-mail
                                <input
                                    disabled={isDisableEmailInput}
                                    value={values.newEmail || ''}
                                    onChange={handleChange}
                                    id="newEmail"
                                    className="profile__input"
                                    name="newEmail"
                                    type="email"
                                    placeholder="Email"
                                    minLength="6"
                                    maxLength="40"
                                    pattern="^(http(s){0,1}:\/\/.){0,1}[\-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$"
                                    required
                                /></label>
                                <span className={errors.newEmail ? "profile__error" : "profile__error_hidden"}>
                                    {t('errors.enter_valid_email', 'Введите валидную почту(name@mail.com)')}
                                </span>
                        </div>
                    </form>
                    { !isDisableEmailInput ? (
                        <button 
                            disabled={!isValid}
                            onClick={handleSubmitEmail}
                            className={
                                `app__text-opacity 
                                ${!isValid ? "profile__button-save_disable" : "profile__button-save"}`}
                            type="submit"
                            aria-label={t('profile.save', 'Сохранить')}>
                                {t('profile.save', 'Сохранить')}
                        </button>
                    ) : ( 
                            <button 
                                onClick={changeUserEmailInformation}
                                className="app__text-opacity profile__submit-button"
                                type="button"
                                aria-label={t('profile.edit', 'Изменить почту')}>
                                    {t('profile.edit', 'Изменить почту')}
                            </button>
                    )}
                    <form ref={formRef} className="profile__form" onSubmit={handleSubmitPassword} noValidate>
                        <div className="profile__container">
                                <label className="profile__label" htmlFor="currentPassword">{t('profile.current_password', 'Текущий пароль')}
                                    <input
                                        disabled={isDisablePasswordInput}
                                        value={values.currentPassword || ''}
                                        onChange={handleChange}
                                        id="currentPassword"
                                        className="profile__input"
                                        name="currentPassword"
                                        type="password"
                                        minLength="8"
                                        maxLength="100"
                                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$"
                                        placeholder={t('profile.new_password', 'Введите теущий пароль')}
                                        required
                                    /></label>
                                    <span className={errors.currentPassword ? "profile__error" : "profile__error_hidden"}>
                                        {t('errors.enter_password_of_min_8_chars', 'Пароль должен состоять из цифр и латинских букв, длина не менее 8 символов')}
                                    </span>
                            </div>
                            <div className="profile__container">
                                <label className="profile__label" htmlFor="newPassword">{t('profile.new_password', 'Новый пароль')}
                                    <input
                                        disabled={isDisablePasswordInput}
                                        value={values.newPassword || ''}
                                        onChange={handleChange}
                                        className="profile__input"
                                        name="newPassword"
                                        id="newPassword"
                                        type="password"
                                        minLength="8"
                                        maxLength="100"
                                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$"
                                        placeholder={t('profile.new_password', 'Введите новый пароль')}
                                        required
                                    /></label>
                                    <span className={errors.newPassword ? "profile__error" : "profile__error_hidden"}>
                                        {t('errors.enter_password_of_min_8_chars', 'Пароль должен состоять из цифр и латинских букв, длина не менее 8 символов')}
                                    </span>
                            </div> 
                        </form>
                    { !isDisablePasswordInput
                    ? (<button 
                            disabled={!isValid}
                            onClick={handleSubmitPassword}
                            className={
                                `app__text-opacity 
                                ${!isValid ? "profile__button-save_disable" : "profile__button-save"}`}
                            type="submit"
                            aria-label={t('profile.save', 'Сохранить')}
                        >
                            {t('profile.save', 'Сохранить')}
                    </button>)
                    : ( <>
                            <button 
                                onClick={changeUserPasswordInformation}
                                className="app__text-opacity profile__submit-button"
                                type="button"
                                aria-label={t('profile.edit', 'Изменить пароль')}>
                                    {t('profile.edit', 'Изменить пароль')}
                            </button>
                        </>
                    )}
                    <button 
                        type="button" 
                        className="profile__signout"
                        onClick={handleLogOut}>
                            {t('profile.log_out', 'Выйти из аккаунта')}
                    </button>
                <p className="register__error-text">{errorMessage && t(errorMessage)}</p>
            </div>
        </>
    );
}

export default Profile; 