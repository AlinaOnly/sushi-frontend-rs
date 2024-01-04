// url Database
import { urlDB } from './consts';

// login, register, token Users
const auth = ({ first_name, last_name, email, phone, password }) =>{ //const registration 
    return fetch(`${urlDB}/auth/users/`, {
        method: 'POST',
        headers: {
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
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            email, password
        })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    }).then(data => {
        localStorage.setItem('logInJwt', data.access);
        return data;
    }).catch(error => {
        // Обработка ошибок, возможно здесь стоит вывести ошибку пользователю
        console.error('There was a problem with the fetch operation: ', error);
    });
};

const token = () => {
    return fetch(`${urlDB}/auth/users/me/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
        },
        credentials: 'include',
    }).then(error);
};

const logout = () => {
    return fetch(`${urlDB}/auth/users/me/delete/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
           //Authorization: //Authorization: `Bearer ${token}`
        },
        credentials: 'include',
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
    token,
    logout
};