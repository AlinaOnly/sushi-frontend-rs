import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import photo from '../../images/logo.jpeg';
import './Promo.css';

function Promo () {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    return (
        <section className="promo">
            <h1 className="promo__title">Новости и акции</h1>
            <Carousel responsive={responsive}>
                <div className="carousel">
                    <h3 className="carousel__title">Встреча подписчиков</h3>
                    <p className="carousel__text">Сегодня в 20:00 стостоится встреча всех подписчиков</p>
                    <img src={photo} className="carousel__image" alt="Фото промо акций"/>
                </div>
                <div className="carousel">
                    <h3 className="carousel__title">Суши даром</h3>
                    <p className="carousel__text">Всем суши даром</p>
                    <img src={photo} className="carousel__image" alt="Фото промо акций"/>
                </div>
                <div className="carousel">
                    <h3 className="carousel__title">Бонусы</h3>
                    <p className="carousel__text">Закажи сет и роллы в подарок</p>
                    <img src={photo} className="carousel__image" alt="Фото промо акций"/>
                </div>
                <div className="carousel">
                    <h3 className="carousel__title">Выпускной</h3>
                    <p className="carousel__text">В пятницу выпускной роллов</p>
                    <img src={photo} className="carousel__image" alt="Фото промо акций"/>
                </div>
                <div className="carousel">
                    <h3 className="carousel__title">Требуется Администратор</h3>
                    <p className="carousel__text">Открыта вакансия администратора</p>
                    <img src={photo} className="carousel__image" alt="Фото промо акций"/>
                </div>
            </Carousel>
        </section>
    );
};

export default Promo;
