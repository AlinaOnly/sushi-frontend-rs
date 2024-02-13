import React, { useState, useContext, useEffect } from 'react';
import  useFormValidation from '../../utils/FormValidation';
import ProfileNav from '../ProfileNav/ProfileNav';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './MyAddress.css';


function MyAddress({ addresses, onDeleteAddress, onPostAddress }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, isValid, errors, setValues, handleChange } = useFormValidation();
    const [isShownInputs, setShownInputs] = useState(false);

    // Показывает форму ввода
    function handleShowInput() {
        setShownInputs(true);
    }

    // Скрывает форму ввода
    function handleHideInput() {
        setShownInputs(false);
    }

    useEffect(() => {
        setValues({
            city: currentUser.city || '',
            short_name: currentUser.short_name || '',
            full_address: currentUser.full_address || '',
        });
    }, [currentUser, setValues]);

    function handleSubmit(event) {
        event.preventDefault();
        if (addresses.length < 3) {
            onPostAddress({
                city: values.city  || '',
                short_name: values.short_name || '',
                full_address: values.full_address || ''
            }, handleHideInput);
        } else {
            alert("Нельзя добавить более трех адресов");
        }
    }

    function handleDelete(id) {
        onDeleteAddress(id);
    }

    return (
            <>
                <ProfileNav/>
                <section className="adress" >
                    <h2 className="adress__title">Ваши адреса</h2>
                    <div className="adress__container">
                        { addresses.length === 0 && !isShownInputs && ( 
                                <>
                                    <p className="adress__text">Нет добавленных адресов. Вы можете добавить три адреса.</p>
                                    <button 
                                        onClick={handleShowInput}
                                        type="button"
                                        aria-label="Добавить адрес"
                                        className="adress__submit-button app__button-opacity">
                                        Добавить адрес
                                    </button>
                                </>  
                        )}
                        { isShownInputs && (
                            <form className="adress__form"  onSubmit={handleSubmit}>
                                <div className="adress__container">
                                    <label className="adress__label" htmlFor="city">
                                        <input
                                            value={values.city || ''}
                                            onChange={handleChange}
                                            id="city"
                                            className="adress__input"
                                            name="city"
                                            type="text"
                                            placeholder="Город"
                                            minLength="2"
                                            maxLength="40"
                                            required
                                        />
                                        <span 
                                            className={`${errors.city ? "profile__error" : "profile__error_hidden"}`}>
                                                Введите Ваш город
                                        </span>
                                        </label> 
                                </div> 

                                <div className="adress__container">
                                    <label className="adress__label" htmlFor="short_name">
                                        <input
                                            value={values.short_name || ''}
                                            onChange={handleChange}
                                            id="short_name"
                                            className="adress__input"
                                            name="short_name"
                                            type="text"
                                            placeholder="Название местоположения"
                                            minLength="3"
                                            maxLength="40"
                                            required
                                        />
                                        <span 
                                            className={`${errors.short_name ? "profile__error" : "profile__error_hidden"}`}>
                                                Введите короткое название Вашего места
                                        </span>
                                        </label>
                                </div>

                                <div className="adress__container">
                                    <label className="adress__label" htmlFor="full_address">
                                        <input
                                            value={values.full_address || ''}
                                            onChange={handleChange}
                                            id="full_address"
                                            className="adress__input"
                                            name="full_address"
                                            type="text"
                                            placeholder="Полный адрес"
                                            minLength="5"
                                            maxLength="100"
                                            required
                                        />
                                        <span 
                                            className={`${errors.full_address ? "profile__error" : "profile__error_hidden"}`}>
                                                Введите Ваш полный адрес
                                        </span>
                                        </label> 
                                </div>    
                                <button 
                                    disabled={!isValid}
                                    //onClick={handleSubmit}
                                    type="submit"
                                    aria-label="Сохранить адрес"
                                    className={`adress__submit-button ${!isValid ? "adress__submit-button_disable" : "app__button-opacity"}`}>
                                    Сохранить адрес
                                </button>
                            </form>)} 
                        { addresses.length >= 0 && !isShownInputs && (
                            addresses.map((address) => 
                                (   <div key={address.id} className="adress__displayed">
                                        <p className="adress__field">Город: {address.city}</p>
                                        <p className="adress__field">Короткое название места: {address.short_name}</p>
                                        <p className="adress__field">Адрес: {address.full_address}</p>
                                        <button 
                                            onClick={() => handleDelete(address.id)}
                                            className="app__text-opacity adress__delete-button"
                                            type="button"
                                            aria-label="Удалить выбранный адрес">
                                                Удалить этот адрес
                                        </button>
                                    </div>)) 
                        )}
                        { addresses.length < 3 && addresses.length !== 0 && !isShownInputs && (
                            <>
                                <button 
                                    onClick={handleShowInput}
                                    type="button"
                                    aria-label="Добавить еще адрес"
                                    className="adress__submit-button app__button-opacity">
                                        Добавить еще адрес
                                </button>
                            </> )}
                    </div>
                </section>
            </>
            
        );
    }
    

export default MyAddress;