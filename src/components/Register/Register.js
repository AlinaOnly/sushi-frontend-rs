import React from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../../utils/FormValidation';
import { EMAIL, PASS, NAME, PHONE } from '../../utils/errors';
import logo from '../../images/logo.png';
import './Register.css';

function Register({ onRegister, errorMessage }) {
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
            <h2 className="register__text">Добро пожаловать!</h2>
            <form className="register__form" onSubmit={handleSubmit} noValidate >
                <label className="register__label" htmlFor="first_name">Имя
                    <input
                        value={values.first_name || ''}
                        onChange={handleChange}
                        id="first_name"
                        className="register__input"
                        name="first_name"
                        type="text"
                        minLength="2"
                        maxLength="30"
                        required
                    />
                    <span 
                        className={`${errors.first_name ? "register__error" : "register__error_hidden"}`}>
                            {NAME}
                    </span>
                </label>
                <label className="register__label" htmlFor="last_name">Фамилия
                    <input
                        value={values.last_name || ''}
                        onChange={handleChange}
                        id="last_name"
                        className="register__input"
                        name="last_name"
                        type="text"
                        minLength="2"
                        maxLength="30"
                        required
                    />
                    <span 
                        className={`${errors.last_name ? "register__error" : "register__error_hidden"}`}>
                            {NAME}
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
                        minLength="8"
                        maxLength="30"
                        pattern="^(http(s){0,1}:\/\/.){0,1}[\-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$"
                        required
                    />
                    <span 
                        className={`${errors.email ? "register__error" : "register__error_hidden"}`}>
                            {EMAIL}
                    </span>
                </label>
                <label className="register__label" htmlFor="phone">Телефон
                    <input
                        value={values.phone || ''}
                        onChange={handleChange}
                        id="phone"
                        className="register__input"
                        name="phone"
                        type="phone"
                        minLength="12"
                        maxLength="14"
                        pattern="^((8|\+3)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,13}$"
                        required
                    />
                    <span 
                        className={`${errors.phone ? "register__error" : "register__error_hidden"}`}>
                            {PHONE}
                    </span>
                </label>
                <label className="register__label" htmlFor="password">Пароль
                    <input
                        value={values.password || ''}
                        onChange={handleChange}
                        id="password"
                        className="register__input"
                        name="password"
                        type="password"
                        minLength="8"
                        maxLength="40"
                        //pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                        required
                    />
                    <span 
                        className={`${errors.password ? "register__error" : "register__error_hidden"}`}>
                            {PASS}
                    </span>
                </label> 
                <button 
                    className=
                    {`register__submit-button ${!isValid ? "register__submit-button_disable" : "app__button-opacity"}`}
                    disabled={!isValid}
                    type="submit"
                    aria-label="Зарегистрироваться">
                        Зарегистрироваться
                </button>
            </form>
            <div className="register__signup-container">
                <Link to="/login" className="register__signup app__text-opacity">Уже зарегистрированы? 
                    <p className="register__signup_red">Войти</p>
                </Link>
                <p className="register__error-text">{errorMessage}</p>
            </div>
        </div>
    );
}

export default Register;