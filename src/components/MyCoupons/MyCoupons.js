import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import './MyCoupons.css';


function MyCoupons() {
    return (
        <>
            <ProfileNav/>
            <section className="coupons" >
                <h2 className="coupons__title">Ваши купоны</h2>
                <div className="coupons__container">
                    <p className="coupons__text">Пока нет купонов</p>
                </div>
            </section>
        </>
        
    );
}

export default MyCoupons;