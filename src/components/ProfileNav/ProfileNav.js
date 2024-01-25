import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import './ProfileNav.css';

function ProfileNav() {
    const location = useLocation();
    const profileLocation = location.pathname === '/profile';
    const myOrdersLocation = location.pathname === '/profile/orders';
    const myAdressesLocation = location.pathname === '/profile/adresses';
    const myCouponsLocation = location.pathname === '/profile/coupons';

    return (
        <>
            <div className="profile-nav">
                <NavLink className="profile-nav__link"
                    to="/profile">
                    <button
                        type="submit"
                        aria-label="Профиль"
                        className={(`profile-nav__submit-button app__text-opacity ${profileLocation ? "profile-nav__submit-button-active" : ""}`)}>
                        Профиль
                    </button>
                </NavLink>
                <NavLink className="profile-nav__link" 
                    to="/profile/orders">
                    <button 
                        type="submit"
                        aria-label="Заказы"
                        className={(`profile-nav__submit-button app__text-opacity ${myOrdersLocation ? "profile-nav__submit-button-active" : ""}`)}>
                        Заказы
                    </button>
                </NavLink>
                <NavLink className="profile-nav__link" 
                    to="/profile/adresses">
                    <button 
                        type="submit"
                        aria-label="Адреса"
                        className={(`profile-nav__submit-button app__text-opacity ${myAdressesLocation ? "profile-nav__submit-button-active" : ""}`)}> 
                        Адреса
                    </button>
                </NavLink>
                <NavLink className="profile-nav__link" 
                    to="/profile/coupons">
                    <button 
                        type="submit"
                        aria-label="Купоны"
                        className={(`profile-nav__submit-button app__text-opacity ${myCouponsLocation ? "profile-nav__submit-button-active" : ""}`)}>
                        Купоны
                    </button>
                </NavLink>
            </div>
        </>
    );
}

export default ProfileNav;