
// AuthContext.js
import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const logIn = useCallback((token, refreshToken) => {
        // Здесь определяем логику для входа пользователя
        // Например, сохранение токена в localStorage и установка состояний
        localStorage.setItem('logInJwt', token);
        localStorage.setItem('logInJwtRefresh', refreshToken);
        setIsAuthenticated(true);
    }, []);

    const logOut = useCallback(() => {
        // Логику для выхода, например, очищение localStorage и обновление состояний
        localStorage.removeItem('logInJwt');
        localStorage.removeItem('logInJwtRefresh');
        setIsAuthenticated(false);
    }, []);

    const refreshAuthentication = useCallback(() => {
        // Логика обновления аутентификации
        setIsAuthenticating(true);
        
        // Здесь бы вы посылаете запрос на сервер для обновления токена
        // и затем обновляли бы состояние в зависимости от ответа

        // Это просто пример, который автоматически устанавливает состояние
        // аутентификации в true для демонстрации
        setTimeout(() => {
            setIsAuthenticated(true);
            setIsAuthenticating(false);
        }, 1000);
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated, 
            isAuthenticating, 
            logIn, 
            logOut, 
            refreshAuthentication
        }}>
            {children}
        </AuthContext.Provider>
    );
};
```

Теперь, в  главном файле приложения (например, `App.js`), можно использовать `AuthProvider` чтобы обернуть мое приложение:

```jsx
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

export default App;