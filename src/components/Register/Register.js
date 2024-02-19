import React from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../../utils/FormValidation';
import logo from '../../images/logo.png';
import { useTranslation } from 'react-i18next';
import './Register.css';

function Register({ onRegister, errorMessage }) {

    const { t } = useTranslation();

    const { values, isValid, errors, handleChange } = useFormValidation();

    function handleSubmit(event) {
        event.preventDefault();
        onRegister(
            values.first_name,
            values.last_name,
            values.email,
            values.phone,
            values.password);
    }

    return (
        <div className="register">
            <Link to="/" >
                <img className="register__logo app__button-opacity" src={logo} alt="Логотип сайта"/>
            </Link>
            <h2 className="register__text">{t('registr.welcome', 'Добро пожаловать!')}</h2>
            <form className="register__form" onSubmit={handleSubmit} noValidate >
                <label className="register__label" htmlFor="first_name">{t('registr.first_name', 'Имя')}
                    <input
                        value={values.first_name || ''}
                        onChange={handleChange}
                        id="first_name"
                        className="register__input"
                        name="first_name"
                        type="text"
                        minLength="2"
                        maxLength="150"
                        pattern="^[A-Za-zА-Яа-яЁё]{2,150}$"
                        required
                    />
                    <span 
                        className={`${errors.first_name ? "register__error" : "register__error_hidden"}`}>
                            {t('errors.enter_text_of_min_two_letters', 'Введите имя или фамилию от 2 букв')}
                    </span>
                </label>
                <label className="register__label" htmlFor="last_name">{t('registr.last_name', 'Фамилия')}
                    <input
                        value={values.last_name || ''}
                        onChange={handleChange}
                        id="last_name"
                        className="register__input"
                        name="last_name"
                        type="text"
                        minLength="2"
                        maxLength="150"
                        pattern="^[A-Za-zА-Яа-яЁё]{2,150}$"
                        required
                    />
                    <span 
                        className={`${errors.last_name ? "register__error" : "register__error_hidden"}`}>
                            {t('errors.enter_text_of_min_two_letters', 'Введите имя или фамилию от 2 букв')}
                    </span>
                </label>
                <label className="register__label" htmlFor="email">E-mail
                    <input
                        value={values.email || ''}
                        onChange={handleChange}
                        id="email"
                        className="register__input"
                        name="email"
                        type="email"
                        minLength="6"
                        maxLength="40"
                        pattern="^(http(s){0,1}:\/\/.){0,1}[\-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$"
                        required
                    />
                    <span 
                        className={`${errors.email ? "register__error" : "register__error_hidden"}`}>
                            {t('errors.enter_valid_email', 'Введите валидную почту(name@mail.com)')}
                    </span>
                </label>
                <label className="register__label" htmlFor="phone">{t('registr.phone', 'Телефон')}
                    <input
                        value={values.phone || ''}
                        onChange={handleChange}
                        id="phone"
                        className="register__input"
                        name="phone"
                        type="phone"
                        minLength="11"
                        maxLength="14"
                        pattern="^\+[0-9]{11,14}$"
                        required
                    />
                    <span 
                        className={`${errors.phone ? "register__error" : "register__error_hidden"}`}>
                            {t('errors.enter_valid_phone_starting_with_plus', 'Номер телефона должен быть в международном формате и содержать от 11 до 14 цифр')}
                    </span>
                </label>
                <label className="register__label" htmlFor="password">{t('registr.password', 'Пароль')}
                    <input
                        value={values.password || ''}
                        onChange={handleChange}
                        id="password"
                        className="register__input"
                        name="password"
                        type="password"
                        minLength="8"
                        maxLength="100"
                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$"
                        required
                    />
                    <span 
                        className={`${errors.password ? "register__error" : "register__error_hidden"}`}>
                            {t('errors.enter_password_of_min_8_chars', 'Пароль должен состоять из цифр и букв, длина должна быть не менее 8 символов')}
                    </span>
                </label> 
                <button 
                    className=
                    {`register__submit-button ${!isValid ? "register__submit-button_disable" : "app__button-opacity"}`}
                    disabled={!isValid}
                    type="submit"
                    aria-label="Зарегистрироваться">
                        {t('registr.register_account', 'Зарегистрироваться')}
                </button>
            </form>
            <div className="register__signup-container">
                <Link to="/login" className="register__signup app__text-opacity">{t('registr.already_registered', 'Уже зарегистрированы?')}
                    <p className="register__signup_red">{t('registr.login', 'Войти')}</p>
                </Link>
                <p className="register__error-text">{errorMessage && t(errorMessage)}</p>
            </div>
        </div>
    );
}

export default Register;