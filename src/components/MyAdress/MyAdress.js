import React, { useState } from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import './MyAdress.css';


function MyAdress() {
    const [isShownInputs, setShownInputs] = useState(false);

    /*function handleSubmit(event) {
        event.preventDefault();
        onUpdateAdress(
            values.city,
            values.short_name,
            values.full_address,
            values.type);
    }*/

    function handleHideInput() {
        setShownInputs(false);
    }

    function handleShowInput() {
        setShownInputs(true);
    }

    return (
        <>
            <ProfileNav/>
            <section className="adress" >
                <h2 className="adress__title">Ваши адреса</h2>
                <div className="adress__container">
                    <button 
                        onClick={handleShowInput}
                        className="adress__submit-button app__button-opacity">
                        Добавить адрес
                    </button>
                    <p className="adress__text">Пока нет добавленных адресов</p>

                    <form className="profile__form"  >
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="name">Город
                            <input
                                value=""
                                id="city"
                                className="profile__input"
                                name="city"
                                type="text"
                                placeholder="Город"
                                minLength="2"
                                maxLength="40"
                                required
                            /></label> 
                        </div>    
                    <div className="profile__container">
                        <label className="profile__label" htmlFor="email">Название местоположения
                            <input
                                value=""
                                id="place"
                                className="profile__input"
                                name="place"
                                type="place"
                                placeholder="Название местоположения"
                                minLength="3"
                                maxLength="40"
                                required
                            /></label>
                        </div>
                        <div className="profile__container">
                        <label className="profile__label" htmlFor="name">Полный адрес
                            <input
                                value=""
                                id="address"
                                className="profile__input"
                                name="address"
                                type="text"
                                placeholder="Полный адрес"
                                minLength="5"
                                maxLength="100"
                                required
                            /></label> 
                        </div>   
                        <button 
                            onClick={handleShowInput}
                            className="adress__submit-button app__button-opacity">
                            Сохранить адрес
                        </button>
                </form>

                </div>
            </section>
        </>
        
    );
}

export default MyAdress;