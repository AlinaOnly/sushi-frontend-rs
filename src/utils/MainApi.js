// url from Database
import { urlDB } from './consts';

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _mainApiError(res) {
        if (res.ok) {
            // Проверяем, содержит ли ответ 'Content-Type': 'application/json' перед парсингом.
            const contentType = res.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return res.json();
            }
            // Aльтернативно можно вернуть просто res, чтобы не перегружать следующие обработчики.
            return res;
        }
        // Возвращаем Promise.reject для неуспешных HTTP статусов.
        return res.text().then((text) => {
            const error = text ? JSON.parse(text) : { message: `Ошибка: ${res.status}` };
            return Promise.reject(error);
        });
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

    changeUserInformation( {first_name, last_name, phone, date_of_birth, messenger} ) {
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
                phone: phone,
                date_of_birth: date_of_birth,
                messenger: messenger
            }),
        }).then(this._mainApiError);
    }

    // апи с адресами
    changeAdress( {address} ) {
        return fetch(`${this._url}/auth/users/me/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                address: address
                }),
        }).then(this._mainApiError);
    }

    postUserAdress( {address} ) {
        return fetch(`${this._url}/me/my_addresses/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                address: address
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
        }).then(response => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message);
                });
            }
            // В случае успешного ответа не пытаться разобрать JSON, вместо этого вернуть response
            return response;
        });
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

    /*getUserCoupons() {
        return fetch(`${this._url}/me/my_coupons/`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        }).then(this._mainApiError);
    }*/
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

    // About Us Contacts api
    getOurContacts() {
        return fetch(`${this._url}/contacts/`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        })
        .then(this._mainApiError);
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
        return fetch(`${this._url}/shopping_cart_delete/${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(response => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message);
                });
            }
            // В случае успешного ответа не пытаться разобрать JSON, вместо этого вернуть response
            return response;
        });
    }
}

const MainApi = new Api({
    url: urlDB,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default MainApi;