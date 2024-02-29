// url Database
import { urlDB } from './consts';

// login, register, token Users
const auth = ({ first_name, last_name, email, phone, password }) =>{
    return fetch(`${urlDB}/auth/users/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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
        credentials: 'include',
        body: JSON.stringify({ email, password })
    }).then(error);
};

const newEmailRequest = ({ current_password, new_email }) => {
    return fetch(`${urlDB}/auth/users/set_email/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ current_password, new_email })
    }).then((response) => {
        if (response.ok) {
            return response.text().then(text => text ? JSON.parse(text) : {});
        } else {
            throw new Error('Ошибка изменения почты в профиле');
        }
    }).then(error);
};

const newPasswordRequest = ({ current_password, new_password }) => {
    return fetch(`${urlDB}/auth/users/set_password/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ current_password, new_password })
    }).then((response) => {
        if (response.ok) {
            return response.text().then(text => text ? JSON.parse(text) : {});
        } else {
            throw new Error('Ошибка изменения пароля в профиле');
        }
    })
    .then(error);
};

const tokenRefresh = (refreshToken) => {
    return fetch(`${urlDB}/auth/jwt/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
    tokenVerify,
    newEmailRequest,
    newPasswordRequest
};