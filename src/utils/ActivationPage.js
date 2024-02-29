//хук для активации юзера с почты
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Preloader from '../components/Preloader/Preloader';
import { useTranslation } from 'react-i18next';
import { urlDB } from './consts';
import '../components/App/App.css';

const ActivationPage = ({ isPreloader }) => {

    const { t } = useTranslation();

    const { uid, token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${urlDB}/auth/users/activation/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid, token })
        })
        .then((response) => {
            if (response.ok) {
                return response.text().then(text => text ? JSON.parse(text) : {});
            } else {
                throw new Error('Ошибка активации');
            }
        })
        .then((data) => {
            // Обработка успешной активации - переадресация на страницу входа
            console.log('Аккаунт активирован!', data);
            navigate('/login');
        })
        .catch((error) => {
            // Обработка ошибок активации
            console.error(error);
        });
    }, [uid, token, navigate]); // Зависимости useEffect, чтобы он выполнялся один раз при монтировании компонента

    return (
        <div>
            <h1 className='activation'>{t('activation.activating', 'Активация...')}</h1>
            {isPreloader && <Preloader/>}
        </div>
    );
};

export default ActivationPage;