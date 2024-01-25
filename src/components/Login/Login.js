import React from 'react';
import { Link } from 'react-router-dom';
import  useFormValidation from '../../utils/FormValidation';
import { EMAIL, PASS } from '../../utils/errors';
import logo from '../../images/logo.jpeg';
import './Login.css';

function Login({ onLogin, errorMessage }) {
    const { values, isValid, errors, handleChange } = useFormValidation();

    function handleSubmit(event) {
        event.preventDefault();
        onLogin(values.email, values.password);
    }

    return (
        <div className="login">
            <Link to="/" >
                <img className="login__logo app__button-opacity" src={logo} alt="Логотип сайта"/>
            </Link>
            <h2 className="login__text">Рады видеть!</h2>
            <form className="login__form" onSubmit={handleSubmit} noValidate>
                <label className="login__label" htmlFor="email">E-mail
                    <input
                        value={values.email || ''}
                        onChange={handleChange}
                        id="email"
                        className="login__input"
                        name="email"
                        type="email"
                        minLength="6"
                        maxLength="40"
                        required 
                        pattern="^(http(s){0,1}:\/\/.){0,1}[\-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$"
                    />
                    <span 
                        className={`${errors.email ? "login__error" : "login__error_hidden"}`}>
                            {EMAIL}
                    </span>
                </label> 
                <label className="login__label" htmlFor="password">Пароль
                    <input
                        value={values.password || ''}
                        onChange={handleChange}
                        id="password"
                        className="login__input"
                        name="password"
                        type="password"
                        minLength="8"
                        maxLength="40"
                        required
                    />
                    <span 
                        className={`${errors.password ? "login__error" : "login__error_hidden"}`}>
                            {PASS}
                    </span>
                </label>
                <button 
                    disabled={!isValid}
                    className=
                    {`login__submit-button ${!isValid ? "login__submit-button_disable" : "app__button-opacity"}`}
                    type="submit"
                    aria-label="Войти">
                        Войти
                </button>
            </form>
            <div className="login__signin-container">
                <Link to="/registration" className="login__signin app__text-opacity">Еще не зарегистрированы? 
                    <p className="login__signin_red">Регистрация</p>
                </Link>
                <p className="register__error-text">{errorMessage}</p>
            </div>
        </div>
    );
}

export default Login;
