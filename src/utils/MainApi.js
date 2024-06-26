// url from Database
import { urlDB } from './consts';

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    /*_mainApiError(res) {
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
    }*/

    _mainApiError(res) {
        if (res.ok) {
            // Проверяем на код ответа 204 No Content
            if (res.status === 204) {
                // не пытаемся парсить тело ответа и сразу возвращаем Promise.resolve()
                return Promise.resolve(null);
            }
            // Далее идёт существующая логика обработки ответа 'Content-Type': 'application/json'
            const contentType = res.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return res.json();
            }
            return Promise.resolve(res);
        }
        // Обработка неуспешных HTTP статусов
        return res.text().then((text) => {
            if (!text) {
                const error = { message: `Ошибка: ${res.status}`, details: 'No response body' };
                return Promise.reject(error);
            }
            try {
                const error = JSON.parse(text);
                return Promise.reject(error);
            } catch (e) {
                return Promise.reject({ message: `Ошибка: ${res.status}`, details: text });
            }
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

    changeUserInformation( {first_name, last_name, phone, date_of_birth, messenger_account} ) {
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
                messenger_account: messenger_account
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

    // promo news api
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

    // Функция для загрузки данных корзины
    getCartData() {
            return fetch(`${this._url}/shopping_cart/`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        }).then(this._mainApiError);
    }

    // Промокод в корзине
    postPromoMethod({promocode}) {
        return fetch(`${this._url}/shopping_cart/promocode/`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify( {
                promocode: promocode
            }),
        }).then(this._mainApiError);
    }

    // удалить одно блюдо
    deleteDishfromCardById(id) {
        return fetch(`${this._url}/shopping_cart/${id}/`, { 
            method: 'DELETE',
            headers: {
                //Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
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

    // очистить всю корзину
    deleteAllDishes() {
        return fetch(`${this._url}/shopping_cart/empty_cart/`, { 
            method: 'DELETE',
            headers: {
                //Authorization: `Bearer ${localStorage.getItem('logInJwt')}`,
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

    getDishCartPlus(id) {
        return fetch(`${this._url}/shopping_cart/${id}/plus/`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        }).then(this._mainApiError);
    }

    getDishCartMinus(id) {
        return fetch(`${this._url}/shopping_cart/${id}/minus/`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        }).then(this._mainApiError);
    }
    //end

    //about delivery method
    getDeliveryMethod() {
        return fetch(`${this._url}/create_order_delivery/`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        }).then(this._mainApiError);
    }

    postDeliveryCreateMethod(orderData) {
        console.log(JSON.stringify(orderData)); 
        return fetch(`${this._url}/create_order_delivery/`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(orderData)
        }).then(this._mainApiError);
    }

    postDeliveryPreChecoutMethod(orderPreData) {
        return fetch(`${this._url}/create_order_delivery/pre_checkout/`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(orderPreData)
        }).then(this._mainApiError);
    }
    //end

    //about takeaway method
    getTakeawayMethod() {
        return fetch(`${this._url}/create_order_takeaway/`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        }).then(this._mainApiError);
    }

    postTakeawayCreateMethod(orderTakeAwayData) {
        return fetch(`${this._url}/create_order_takeaway/`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(orderTakeAwayData)
        }).then(this._mainApiError);
    }

    postTakeawayPreChecoutMethod(orderPreTakeAwayData) {
        return fetch(`${this._url}/create_order_takeaway/pre_checkout/`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(orderPreTakeAwayData)
        }).then(this._mainApiError);
    }
    //end

}

const MainApi = new Api({
    url: urlDB,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default MainApi;