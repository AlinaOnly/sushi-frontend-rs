//протектед для защиты своего профиля

/*import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, logIn }) {
  let location = useLocation();

  if (!logIn) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return children;
}*/

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const logInJwtRefresh = localStorage.getItem('logInJwtRefresh'); 

    return logInJwtRefresh ? props.children : <Navigate to='/auth/users/'/>
};

export default ProtectedRoute;