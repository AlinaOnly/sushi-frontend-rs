import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { urlDB } from './consts';
import  useFormValidation from './FormValidation';

// хук для сброса пароля на почту
function ResetPasswordRequest() {

    const { values, isValid, errors, formRef, handleChange } = useFormValidation();

    const { t } = useTranslation();

    function onResetPasswordRequest(email) {
        fetch(`${urlDB}/auth/users/reset_password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then((response) => {
            if (response.ok) {
                return response.text().then(text => text ? JSON.parse(text) : {});
            } else {
                throw new Error('Ошибка отправки пароля');
            }
        })
        .then((data) => {
            // Показать сообщение, что инструкции были отправлены на почту
            console.log('Инструкции были отправлены на почту!', data);
        })
        .catch((error) => {
            console.error("Ошибка сброса пароля:", error);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onResetPasswordRequest(values.email);
    };

    return (
        <div className="login">
            <form ref={formRef} className="login__form" onSubmit={handleSubmit} noValidate>
                <label className="login__label" htmlFor="email">Email:
                    <input
                        id="email"
                        type="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        className="login__input"
                        name="email"
                        minLength="6"
                        maxLength="40"
                        pattern="^(http(s){0,1}:\/\/.){0,1}[\-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$"
                        required
                    />
                    <span 
                        className={`${errors.email ? "login__error" : "login__error_hidden"}`}>
                            {t('errors.enter_valid_email', 'Введите валидную почту(name@mail.com)')}
                    </span>
                </label>
                <button
                    disabled={!isValid}
                    className={`login__submit-button ${!isValid ? "login__submit-button_disable" : "app__button-opacity"}`}
                    aria-label="Сбросить пароль" 
                    type="submit">
                    {t('registr.password_req', 'Сбросить пароль')}
                </button>
            </form>
        </div>
    );
}

export default ResetPasswordRequest;