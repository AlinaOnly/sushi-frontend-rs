// url Database
import { urlDB } from './consts';

// login, register, token Users
const auth = ({ first_name, last_name, email, phone, password }) =>{ //const registration 
    return fetch(`${urlDB}/auth/users/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: 'Bearer realm="api"', // Authorization: `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
            first_name, last_name, phone, email, password
        })
    }).then(error);
};

const login = ({ email, password }) => {
    return fetch(`${urlDB}/auth/jwt/create/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        //credentials: 'include',
        body: JSON.stringify({ email, password })
    }).then(error);
};

const tokenRefresh = (refreshToken) => {
    return fetch(`${urlDB}/auth/jwt/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ refresh: refreshToken })
    }).then(error);
};

const tokenVerify = (accessToken) => {
    return fetch(`${urlDB}/auth/jwt/verify/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ token: accessToken })
    }).then(error);
};

const error = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export {
    auth,
    login,
    tokenRefresh,
    tokenVerify
};