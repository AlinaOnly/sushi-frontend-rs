//протектед для защиты своего профиля

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const logInJwtRefresh = localStorage.getItem('logInJwtRefresh'); 

    return logInJwtRefresh ? props.children : <Navigate to='/registration'/>
};

export default ProtectedRoute;