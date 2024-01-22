//хук для активации юзера с почты

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ActivationPage = () => {
    const { uid, token } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/auth/users/activation/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid, token })
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ошибка активации');
            }
        })
        .then((data) => {
            // Обработка успешной активации, например, переадресация на страницу входа
            console.log('Аккаунт активирован!', data);
        })
        .catch((error) => {
            // Обработка ошибок активации
            console.error('Ошибка активации: ', error);
        });
    }, [uid, token]); // Зависимости useEffect, чтобы он выполнялся один раз при монтировании компонента

    return (
        <div>
            <h1>Активация...</h1>
            {/* Возможно, показать спиннер или индикатор загрузки */}
        </div>
    );
};

export default ActivationPage;