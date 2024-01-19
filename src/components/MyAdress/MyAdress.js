import React, { useState } from 'react';
import  useFormValidation from '../../utils/FormValidation';
import ProfileNav from '../ProfileNav/ProfileNav';
import './MyAdress.css';


function MyAdress() {
    const { values, isValid, errors, handleChange } = useFormValidation();
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
        setShownInputs(!isShownInputs);
    }

    return (
        <>
            <ProfileNav/>
            <section className="adress" >
                <h2 className="adress__title">Ваши адреса</h2>
                <div className="adress__container">
                { !isShownInputs ?    
                        (   <>
                                <p className="adress__text">Нет добавленных адресов</p>
                                <button 
                                    onClick={handleHideInput}
                                    type="button"
                                    aria-label="Добавить адрес"
                                    className="adress__submit-button app__button-opacity">
                                    Добавить адрес
                                </button>
                            </>  
                        )
                    :    (<form className="adress__form"  >
                            <div className="adress__container">
                                <label className="adress__label" htmlFor="city">
                                    <input
                                        //value=""
                                        id="city"
                                        className="adress__input"
                                        name="city"
                                        type="text"
                                        placeholder="Город"
                                        minLength="2"
                                        maxLength="40"
                                        required
                                    /></label> 
                            </div>    
                            <div className="adress__container">
                                <label className="adress__label" htmlFor="place">
                                    <input
                                        //value=""
                                        id="place"
                                        className="adress__input"
                                        name="place"
                                        type="text"
                                        placeholder="Название местоположения"
                                        minLength="3"
                                        maxLength="40"
                                        required
                                    /></label>
                            </div>
                            <div className="adress__container">
                                <label className="adress__label" htmlFor="address">
                                    <input
                                        //value=""
                                        id="address"
                                        className="adress__input"
                                        name="address"
                                        type="text"
                                        placeholder="Полный адрес"
                                        minLength="5"
                                        maxLength="100"
                                        required
                                    /></label> 
                            </div>   
                            <button 
                                disabled={!isValid}
                                type="submit"
                                aria-label="Сохранить адрес"
                                className={`adress__submit-button ${!isValid ? "adress__submit-button_disable" : "app__button-opacity"}`}>
                                Сохранить адрес
                            </button>
                        </form>
                        )
                }
                </div>
            </section>
        </>
        
    );
}

export default MyAdress;