//протектед для защиты своего профиля

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const logInJwtRefresh = localStorage.getItem('logInJwtRefresh'); 

    return logInJwtRefresh ? props.children : <Navigate to='/registration'/>
};

export default ProtectedRoute;





/*import React, { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext'; // Импорт контекста аутентификации

const ProtectedRoute = ({ children }) => {
    const { isAuthenticating, isAuthenticated, refreshAuthentication } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated && isAuthenticating) {
            // Попытка обновить токен, если пользователь не аутентифицирован, но процесс идет
            refreshAuthentication();
        }
    }, [isAuthenticated, isAuthenticating, refreshAuthentication]);

    // Если пользователь не аутентифицирован и не в процессе аутентификации, перенаправляем на вход
    if (!isAuthenticated && !isAuthenticating) {
        return <Navigate to='/login' />
    }

    // Отображаем содержимое защищенного маршрута
    return children;
};

export default ProtectedRoute;*/