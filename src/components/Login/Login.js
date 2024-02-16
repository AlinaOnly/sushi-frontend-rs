import React from 'react';
import { Link } from 'react-router-dom';
import  useFormValidation from '../../utils/FormValidation';
import logo from '../../images/logo.png';
import { useTranslation } from 'react-i18next';
import './Login.css';

function Login({ onLogin, errorMessage }) {

    const { t } = useTranslation();

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
            <h2 className="login__text">{t('registr.glad_to_see_you', 'Рады видеть!')}</h2>
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
                            {t('errors.enter_valid_email', 'Введите валидную почту(name@mail.com)')}
                    </span>
                </label> 
                <label className="login__label" htmlFor="password">{t('registr.password', 'Пароль')}
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
                            {t('errors.enter_password_of_min_8_chars', 'Введите пароль не менее 8 разных символов')}
                    </span>
                </label>
                <button 
                    disabled={!isValid}
                    className=
                    {`login__submit-button ${!isValid ? "login__submit-button_disable" : "app__button-opacity"}`}
                    type="submit"
                    aria-label="Войти">
                        {t('registr.login', 'Войти')}
                </button>
            </form>
            <div className="login__signin-container">
                <Link to="/registration" className="login__signin app__text-opacity">{t('registr.not_registered_yet', 'Еще не зарегистрированы? ')}
                    <p className="login__signin_red">{t('registr.register_account', 'Регистрация')}</p>
                </Link>
                <p className="register__error-text">{errorMessage && t(errorMessage)}</p>
            </div>
        </div>
    );
}

export default Login;
