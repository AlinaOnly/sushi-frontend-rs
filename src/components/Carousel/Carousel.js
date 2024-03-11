import React, {useState} from 'react';
//import { Parallax, Pagination, Navigation } from 'swiper';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import './Carousel.css';

export default function Carousel({ extraDishes, onAddToCart, language }) {

    const [clickedBtns, setClickedBtns] = useState({}); //чтобы сохранить индивидуальное состояние для каждой кнопки в слайде,
    //это использовать объект для хранения состояния кнопок, где ключом будет артикул блюда,
    //а значением — булево значение, показывающее, нажата кнопка или нет.

    const handleClick = (dish) => {
        // Вызываем функцию onAddToCart переданную в пропсах
        onAddToCart(dish);
        // Устанавливаем состояние для конкретной кнопки
        setClickedBtns(prevClickedBtns => ({
            ...prevClickedBtns,
            [dish.article]: true // Устанавливаем значение true для ключа соответствующего артикулу блюда
        }));
    };

    const { t } = useTranslation();

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#FF3055',
                    '--swiper-pagination-color': '#FF3055',
                }}
                    slidesPerView={1} // Количество слайдов для показа
                    spaceBetween={20} // Расстояние между слайдами в пикселях
                    loop={extraDishes.length > 7} // Включение/выключение бесконечной прокрутки
                    speed={800} // Скорость переключения слайдов
                        pagination={{
                        clickable: true,
                }}
                    navigation={true}
                    //modules={[Parallax, Pagination, Navigation]}
                    className="mySwiper"
            >
                <div
                    slot="container-start"
                    className="parallax-bg"
                    data-swiper-parallax="-23%">
                </div>
                    {extraDishes.map((dish, index) => {
                        const cleanShortName = dish.translations[language].short_name;
                        const weightVolumeUnit = dish.weight_volume_uom.translations[language]?.text || dish.weight_volume_uom.translations["en"].text;
                            return (
                                <SwiperSlide key={dish.article}>
                                    <div className="swiper__image" data-swiper-parallax="-200">
                                        <img alt={cleanShortName} className="swiper__image-product" src={dish.image} />
                                    </div>
                                    <div className="swiper__title" data-swiper-parallax="-100">
                                        <p className="swiper__text">
                                            {cleanShortName}
                                        </p>
                                        <p className="swiper__weight">
                                            {dish.weight_volume} {weightVolumeUnit}
                                        </p>
                                        <p className="swiper__price">{dish.final_price} RSD</p>
                                        <button
                                            className={clickedBtns[dish.article] ? "swiper__button-add_active" : "swiper__button-add"}
                                            onClick={() => handleClick(dish)}
                                        >
                                            {t('cart.add_dop', 'Добавить')}
                                        </button>
                                    </div>
                                </SwiperSlide>
                            );
                    })}
            </Swiper>
        </>
    );
}
