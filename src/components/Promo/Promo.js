import React from 'react';
import Carousel from "react-multi-carousel";
import { useTranslation } from 'react-i18next';
import "react-multi-carousel/lib/styles.css";
import './Promo.css';

function Promo({ promoNews, language }) {

    const { t } = useTranslation();

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 900 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 900, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

     // Функция для получения нужной локализации и изображения в зависимости от языка
    const getLocalizedContent = (promo) => {
        let langKey = language;
        let imageKey = `image_${langKey}`;

        // Если текущий язык сербский латиница, ставим соответствующий ключ для получения изображения
        if (langKey === 'sr-latn') {
            imageKey = 'image_sr_latn'; // т.к. именно такой ключ приходит с бэкенда
        }

        const translation = promo.translations[langKey] || promo.translations.en;
        const image = promo[imageKey] || promo.image_sr_latn;

        return {
            ...translation,
            image
        };
    };

    return (
            <section className="promo">
                <h1 className="promo__title">{t('promo.title', 'Новости и акции')}</h1>
                <Carousel responsive={responsive}>
                    {promoNews.map((promo) => {
                        const { title, full_text, image } = getLocalizedContent(promo);
                            return (
                                <div className="carousel" key={promo.id}>
                                    <h3 className="carousel__title">{title}</h3>
                                    <p className="carousel__text">{full_text}</p>
                                    <img src={image} className="carousel__image" alt={title} />
                                    <p className="carousel__city">{promo.city}</p>
                                    <p className="carousel__date">{promo.created}</p>
                                </div>
                            );
                    })}
                </Carousel>
            </section>
        );
    };

export default Promo;
