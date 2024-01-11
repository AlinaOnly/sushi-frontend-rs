import { React, useState } from 'react';

import DishesCardList from '../DishesCardList/DishesCardList';
import CategoryMenu from '../CategoryMenu/CategoryMenu';

import poster0 from '../../images/1.jpg';
import poster1 from '../../images/2.jpg';
import poster2 from '../../images/3.jpg';
import poster3 from '../../images/california.jpg';
import poster4 from '../../images/philadelphia.jpg';
import poster5 from '../../images/tokyo.jpg';
import poster6 from '../../images/soevy.jpg';
import poster7 from '../../images/vasaby.jpg';
import poster8 from '../../images/imbir.jpg';


import './Dishes.css';

function Dishes({ onDishClick, handleBurgerMenu }) {
    const [isDishes, setIsDishes] = useState(
        [{
            id: '0',
            name: 'Филл',
            composition: 'Огурец, сыр, лосось, 200 г',
            poster: poster0,
            price: '1300 RSD',
            category: '',
            vegan: true,
            spicy: false,
            isDishes: true,
        },
            {
            id: '1',
            name: 'Умяки',
            composition: 'Огурец, сыр, лосось, 200 г',
            poster: poster1,
            price: '1300 RSD',
            category: '',
            vegan: true,
            spicy: false,
            isDishes: true,
        },
        {
            id: '2',
            name: 'Буяки',
            composition: 'Огурец, сыр, лосось, 200 г',
            poster: poster2,
            price: '1300 RSD',
            category: '',
            vegan: false,
            spicy: true,
            isDishes: true,
        },
        {
            id: '3',
            name: 'Филадельфия',
            composition: 'Огурец, сыр, лосось, 200 г',
            poster: poster3,
            price: '1300 RSD',
            category: '',
            vegan: true,
            spicy: false,
            isDishes: true,
        },
        {
            id: '4',
            name: 'Калифорния',
            composition: 'Огурец, сыр, лосось, 200 г',
            poster: poster4,
            price: '1300 RSD',
            category: '',
            vegan: true,
            spicy: false,
            isDishes: true,
        },
        {
            id: '5',
            name: 'Сет Токио',
            composition: 'Огурец, сыр, лосось, 200 г',
            poster: poster5,
            price: '1300 RSD',
            category: '',
            vegan: true,
            spicy: false,
            isDishes: true,
        },
        {
            id: '6',
            name: 'Соевый',
            composition: '60 мл',
            poster: poster6,
            price: '1300 RSD',
            category: '',
            vegan: false,
            spicy: false,
            isDishes: true,
        },
        {
            id: '7',
            name: 'Вассаби',
            composition: '10 г',
            poster: poster7,
            price: '1300 RSD',
            category: '',
            vegan: false,
            spicy: false,
            isDishes: true,
        },
        {
            id: '8',
            name: 'Имбирь',
            composition: '20 г',
            poster: poster8,
            price: '1300 RSD',
            category: '',
            vegan: false,
            spicy: false,
            isDishes: true,
        },
        ]);

    return (
        <>
            <CategoryMenu handleBurgerMenu={handleBurgerMenu}/>
            <div className="dishes__categories">Роллы</div>
                <DishesCardList
                    dishes={isDishes}
                    onDishClick={onDishClick}
                />
        </>
    );
}

export default Dishes;