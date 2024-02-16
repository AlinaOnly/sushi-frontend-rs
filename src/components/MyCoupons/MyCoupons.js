import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import { useTranslation } from 'react-i18next';
import './MyCoupons.css';


function MyCoupons() {

    const { t } = useTranslation();

    return (
        <>
            <ProfileNav/>
            <section className="coupons" >
                <h2 className="coupons__title">{t('coupons.your_coupons', 'Ваши купоны')}</h2>
                <div className="coupons__container">
                    <p className="coupons__text">{t('coupons.no_coupons_yet', 'Пока нет купонов')}</p>
                </div>
            </section>
        </>
        
    );
}

export default MyCoupons;