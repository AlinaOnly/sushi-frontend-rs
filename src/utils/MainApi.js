// url from Database
import { urlDB } from './consts';

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _mainApiError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // user api
    getUserId() {
        return fetch(`${this._url}/auth/users/me/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(this._mainApiError);
    }

    changeUserInformation( {first_name, last_name, email, phone, date_of_birth, messenger} ) {
        return fetch(`${this._url}/auth/users/me/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
                date_of_birth: date_of_birth,
                messenger: messenger
            }),
        }).then(this._mainApiError);
    }


    // апи с адресами
    changeAdress( {city, short_name, full_address, type} ) {
        return fetch(`${this._url}/auth/users/me/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                city: city,
                short_name: short_name,
                full_address: full_address,
                type: type }),
        }).then(this._mainApiError);
    }

    postUserAdress( {city, short_name, full_address, type} ) {
        return fetch(`${this._url}/me/my_addresses/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                    city: city,
                    short_name: short_name,
                    full_address: full_address,
                    type: type
            }),
        }).then(this._mainApiError);
    }

    getUserAdress() {
        return fetch(`${this._url}/me/my_addresses/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(this._mainApiError);
    }

    deleteUserAdress(id) {
        return fetch(`${this._url}/me/my_addresses/${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(this._mainApiError);
    }
    // end

    getUserOrders() {
        return fetch(`${this._url}/me/my_orders/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(this._mainApiError);
    }

    getUserCoupons() {
        return fetch(`${this._url}/me/my_coupons/`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        }).then(this._mainApiError);
    }
    //

    // promo api
    getPromoNews() {
        return fetch(`${this._url}/promonews/`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        }).then(this._mainApiError);

    }
    //

    // dishes api
    getDishesFromApi() {
        return fetch(`${this._url}/menu/`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        }).then(this._mainApiError);
    }

    createDish(dish) {
        return fetch(`${this._url}/menu/`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify( {
            
            }),
        }).then(this._mainApiError);
    }

    deleteDish(id) {
        return fetch(`${this._url}/menu/${id}/`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        }).then(this._mainApiError);
    }
}

const MainApi = new Api({
    url: urlDB,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default MainApi;