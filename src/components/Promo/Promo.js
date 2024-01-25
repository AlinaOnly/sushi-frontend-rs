import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './Promo.css';

function Promo ({ promoNews }) {
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
                    {promoNews.map(promo => (
                        <div className="carousel" key={promo.id}>
                            <h3 className="carousel__title">{promo.title_rus}</h3>
                            <p className="carousel__city">{promo.city}</p>
                            <p className="carousel__text">{promo.full_text_rus}</p>
                            <img src={promo.image_rus} className="carousel__image" alt="Фото промо акций"/>
                            <p className="carousel__date">{promo.created}</p>
                        </div>
                        ))
                    }    
                </Carousel>
        </section>
    );
};

export default Promo;
