import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import imbir from '../../images/imbir.jpg';
import vasaby from '../../images/vasaby.jpg';
import soevy from '../../images/soevy.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Carousel.css';

//import './styles.css';

// import required modules
import { Parallax, Pagination, Navigation } from 'swiper/modules';

export default function App() {
    return (
        <>
        <Swiper
            style={{
            '--swiper-navigation-color': 'white',
            '--swiper-pagination-color': 'white',
            }}
            speed={600}
            parallax={true}
            pagination={{
            clickable: true,
            }}
            //navigation={true}
            //modules={[Parallax, Pagination, Navigation]}
            className="mySwiper"
        >
            <div
                slot="container-start"
                className="parallax-bg"
                data-swiper-parallax="-23%">
            </div>
            <SwiperSlide>
                <div className="swiper__image" data-swiper-parallax="-200">
                    <img alt="Фото товара" className="swiper__image-product" src={imbir} />
                </div>
                <div className="swiper__title" data-swiper-parallax="-100">
                    <p className="swiper__text">
                        Имбирь 20 г
                    </p>
                    <button type="submit" className="swiper__button-add app__button-opacity">
                        Добавить
                    </button>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="swiper__image" data-swiper-parallax="-200">
                    <img alt="Фото товара" className="swiper__image-product" src={vasaby} />
                </div>
                <div className="swiper__title" data-swiper-parallax="-100">
                    <p className="swiper__text">
                        Васаби 10 г
                    </p>
                    <button type="submit" className="swiper__button-add app__button-opacity">
                        Добавить
                    </button>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="swiper__image" data-swiper-parallax="-200">
                    <img alt="Фото товара" className="swiper__image-product" src={soevy} />
                </div>
                <div className="swiper__title" data-swiper-parallax="-100">
                    <p className="swiper__text">
                        Соевый соус 60 мл
                    </p>
                    <button type="submit" className="swiper__button-add app__button-opacity">
                        Добавить
                    </button>
                </div>
            </SwiperSlide>
        </Swiper>
        </>
    );
}
