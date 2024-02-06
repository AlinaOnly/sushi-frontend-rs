import React, {useState, useEffect} from 'react';
import DishesCardList from '../DishesCardList/DishesCardList';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import Preloader from '../Preloader/Preloader';
import { LAPTOP,
    PLANE_TABLE,
    MOBILE,
    SHOW_DISH_LAPTOP,
    SHOW_DISH_PLANE_TABLE,
    SHOW_DISH_MOBILE } from '../../utils/consts';
import More from '../More/More';
import './Dishes.css';

function Dishes({ dishes, onDishClick, handleBurgerMenu, isPreloader, language }) {

    // сколько карточек показывать при определенном размере окна
    const [isSize, setSize] = useState(window.innerWidth);
    const [moviesRow, setMoviesRow] = useState(SHOW_DISH_LAPTOP);
    const [moreButton, setMoreButton] = useState(false);

    function handleSizeWindow() {
        if (LAPTOP <= isSize) {
            setMoviesRow(SHOW_DISH_LAPTOP);
        }
        else if (PLANE_TABLE <= isSize) {
            setMoviesRow(SHOW_DISH_PLANE_TABLE);
        }
        else if (MOBILE <= isSize) {
            setMoviesRow(SHOW_DISH_MOBILE);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleMoreButton();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        handleSizeWindow();
    }, [isSize]);

    function handleResize()  {
        setSize(window.innerWidth);
    }

    useEffect(() => {
        if (dishes.length < moviesRow.total) {
            setMoreButton(false);
        } else if (dishes.length >= moviesRow.total) {
            setMoreButton(true);
        }
    }, [dishes.length, moviesRow.total]);

    function handleMoreButton() {
        setMoviesRow({
            ...moviesRow, total: moviesRow.total + moviesRow.plus
        });
    }

    return (
        <>
            <CategoryMenu handleBurgerMenu={handleBurgerMenu}/>
            {isPreloader && <Preloader/>}
                <DishesCardList
                    onDishClick={onDishClick}
                    dishes={dishes.slice(0, moviesRow.total)}
                    language={language}
                />
                <More 
                    moreButton={moreButton}
                    handleMoreButton={handleMoreButton}
                />  
        </>
    );
}

export default Dishes;