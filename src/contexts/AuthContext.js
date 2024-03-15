// хук токенов, логина и логаута
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as apiAuth from '../utils/apiAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [logIn, setLogIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    const handleLogout = useCallback(() => {
        localStorage.removeItem('addresses');
        localStorage.removeItem('orders');
        localStorage.removeItem('coupons');
        localStorage.removeItem('logInJwt');
        localStorage.removeItem('logInJwtRefresh');
        setLogIn(false);
        setCurrentUser({});
        navigate('/');
    }, [navigate]);

    // checking token проверка токена
    const handleTokenCheck = useCallback(() => {
        const accessToken = localStorage.getItem('logInJwt'); // токен доступа
        const refreshToken = localStorage.getItem('logInJwtRefresh'); // рефреш-токен
        if (accessToken) {
          apiAuth.tokenVerify(accessToken) // Проверяем валидность токена доступа
            .then((res) => {
            if (res.ok) {
                // Если всё в порядке, пользователь остается аутентифицированным
                res.json().then(data => {
                    setLogIn(true);
                    setCurrentUser(current => ({ ...current, ...data }));
                });
            } else if (res.status === 401 && refreshToken) {
                // Если токен доступа невалиден (401 ошибка), пытаемся обновить его через рефреш-токен
                apiAuth.tokenRefresh(refreshToken)
                    .then((res) => {
                    if (res.ok) {
                        res.json().then(data => {
                            localStorage.setItem('logInJwt', data.access);
                            // Обычно рефреш-токены не нужно менять с каждым обновлением доступа, но если сервер так устроен, то апдейтим
                            if (data.refresh) {
                            localStorage.setItem('logInJwtRefresh', data.refresh);
                        }
                        setLogIn(true);
                        setCurrentUser(current => ({ ...current, accessToken: data.access }));
                    });
                    } else {
                        // Если обновить токен не удалось, пользователь должен войти заново
                        handleLogout();
                    }
                });
            } else { 
                // Другие ошибки также ведут к выходу пользователя
                handleLogout();
            }
            });
        } else {
            // Если токен доступа отсутствует, пользователь не аутентифицирован
            setLogIn(false);
        }
    }, [setLogIn, setCurrentUser, handleLogout]);

    return (
        <AuthContext.Provider value={{
            logIn,
            loginUser: handleTokenCheck,
            logoutUser: handleLogout,
            currentUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

/*Теперь, в  главном файле приложения (например, `App.js`), можно использовать `AuthProvider` чтобы обернуть приложение:


// App.js

import React from 'react';
import { AuthProvider } from './AuthContext';
import YourAppRoutes from './YourAppRoutes';

function App() {
    return (
        <AuthProvider>
            <YourAppRoutes />
        </AuthProvider>
    );
}

export default App;*/