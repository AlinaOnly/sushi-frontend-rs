//нужен ли протектед для защиты своего профиля?

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const logInJwt = JSON.parse(localStorage.getItem('logInJwt'));

    return logInJwt ? props.children : <Navigate to='/'/>
};


/*import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children, isLoggedIn }) {
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return children;
}*/

export default ProtectedRoute;