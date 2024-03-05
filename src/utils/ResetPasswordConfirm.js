import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { urlDB } from './consts';
import  useFormValidation from './FormValidation';

//подтверждение сброса пароля и введение нового
function ResetPasswordConfirm() {

    const { t } = useTranslation();
    const { values, isValid, errors, formRef, handleChange } = useFormValidation();

    const [uid, setUid] = useState('');
    const [token, setToken] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const path = window.location.pathname; // Получаем текущий путь
        const paths = path.split('/'); // Разбиваем путь по слэшам
        // Например, для /reset_password_confirm/NQ/c34o... paths будет ["", "reset_password_confirm", "NQ", "c34o..."]
        if (paths.length >= 4) { // Убеждаемся, что параметры присутствуют
            setUid(paths[2]);
            setToken(paths[3]);
        }
    }, []);

    function onResetPasswordConfirm(uid, token, newPassword) {
        fetch(`${urlDB}/auth/users/reset_password_confirm/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid, token, new_password: newPassword }),
        })
        .then((response) => {
            if (response.ok) {
                return response.text().then(text => text ? JSON.parse(text) : {}); //если ответ JSON с бэка простой текст
            } else {
                throw new Error('Ошибка подтверждения пароля');
            }
        })
        .then((data) => {
            // Перенаправить на страницу входа, показать сообщение что пароль успешно изменен
            console.log('Пароль подтвержден!', data);
            navigate('/login');
        })
        .catch((error) => {
            console.error("Ошибка подтверждения сброса пароля:", error);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onResetPasswordConfirm(uid, token, values.password);
    };

    return (
        <div className="login">
            <form ref={formRef} className="login__form" onSubmit={handleSubmit} noValidate>
                <label className="login__label">
                {t('profile.new_password', 'Новый пароль')}
                    <input
                        id="password"
                        className="login__input"
                        type="password"
                        name="password"
                        value={values.password || ''}
                        onChange={handleChange}
                        minLength="8"
                        maxLength="100"
                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$"
                        required
                    />
                    <span 
                        className={`${errors.password ? "login__error" : "login__error_hidden"}`}>
                            {t('errors.enter_password_of_min_8_chars', 'Пароль должен состоять из цифр и латинских букв, длина не менее 8 символов')}
                    </span>
                </label>
                <button 
                    disabled={!isValid}
                    className={`login__submit-button ${!isValid ? "login__submit-button_disable" : "app__button-opacity"}`}
                    type="submit"
                    aria-label="Установить новый пароль">
                    {t('registr.password_confirm', 'Установить новый пароль')}
                </button>
            </form>
        </div>
    );
}

export default ResetPasswordConfirm;