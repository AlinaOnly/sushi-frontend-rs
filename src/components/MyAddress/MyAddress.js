import React, { useState, useContext, useEffect } from 'react';
import  useFormValidation from '../../utils/FormValidation';
import ProfileNav from '../ProfileNav/ProfileNav';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useTranslation } from 'react-i18next';
import MyAddressAutocomplete from '../../utils/MyAddressAutocomplete';
import './MyAddress.css';

function MyAddress({ addresses, onDeleteAddress, onPostAddress }) {

    const { t } = useTranslation();

    const currentUser = useContext(CurrentUserContext);
    const { values, isValid, errors, setValues, formRef, handleChange, handleInput, checkFormValidity } = useFormValidation();
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
            address: currentUser.address || '',
        });
    }, [currentUser, setValues]);

    // Проверка одинаковых адресов и запрет на их добавление
    function isDuplicateAddress(newAddress, addresses) {
        // Поскольку адрес представлен одной строкой, проверка на уникальность выполняется путем сравнения строк адресов
        return addresses.some(address => address.address === newAddress);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newAddress = values.address || '';
        if (isValid) {
            if (addresses.length < 3) {
                if (isDuplicateAddress(newAddress, addresses)) {
                alert('Такой адрес уже существует!');
                } else {
                onPostAddress({ address: newAddress }, handleHideInput);
                }
            } else {
                alert("Нельзя добавить более трех адресов");
            }
        }
    }

    function handleDelete(id) {
        onDeleteAddress(id);
    }

    const handleUpdateAddress = (place) => {
        const addressComponents = place.address_components;
        const formattedAddress = place.formatted_address;
        // Проверка на наличие в адресе страны и улицы
        const hasCountry = addressComponents.some(component => component.types.includes('country'));
        const hasRoute = addressComponents.some(component => component.types.includes('route'));
        // Если есть страна и улица, то считаем адрес валидным.
        const isValidAddress = hasCountry && hasRoute;
        setValues(prevState => ({
            ...prevState,
            address: formattedAddress,
            isAddressValid: isValidAddress // Добавление нового состояния isAddressValid
        }));
        checkFormValidity();
    };

    return (
            <>
                <ProfileNav/>
                <section className="adress" >
                    <h2 className="adress__title">{t('addresses.your_addresses', 'Ваши адреса')}</h2>
                    <div className="adress__container">
                        { addresses.length === 0 && !isShownInputs && ( 
                                <>
                                    <p className="adress__text">{t('addresses.no_addresses_added', 'Нет добавленных адресов. Вы можете добавить три адреса.')}</p>
                                    <button 
                                        onClick={handleShowInput}
                                        type="button"
                                        aria-label="Добавить адрес"
                                        className="adress__submit-button app__button-opacity">
                                            {t('addresses.add_address', 'Добавить адрес')}
                                    </button>
                                </>  
                        )}
                        { isShownInputs && (
                            <form ref={formRef} className="adress__form"  onSubmit={handleSubmit}>
                                <div className="adress__container">
                                    <label className="adress__label" htmlFor="address">
                                        <MyAddressAutocomplete
                                            inputClassName="adress__input"
                                            updateAddress={handleUpdateAddress}
                                            values={values}
                                            handleChange={handleChange}
                                            handleInput={handleInput}
                                        />
                                        <span 
                                            className={`${errors.address ? "profile__error" : "profile__error_hidden"}`}>
                                                {t('addresses.enter_your_full_address', 'Введите Ваш полный адрес')}
                                        </span>
                                        </label> 
                                </div>    
                                <button 
                                    // disabled={!isValid || !values.isAddressValid} // Используем состояние isAddressValid для управления доступностью кнопки
                                    disabled={!isValid}
                                    type="submit"
                                    aria-label="Сохранить адрес"
                                    //|| !values.isAddressValid ?
                                    className={`adress__submit-button ${!isValid ? "adress__submit-button_disable" : "app__button-opacity"}`}>
                                        {t('addresses.save_address', 'Сохранить адрес')}
                                </button>
                            </form>)} 
                        { addresses.length >= 0 && !isShownInputs && (
                            addresses.map((address) => 
                                (   <div key={address.id} className="adress__displayed">
                                        <p className="adress__field">{t('addresses.your_address', 'Ваш Адрес:')} {address.address}</p>
                                        <button 
                                            onClick={() => handleDelete(address.id)}
                                            className="app__text-opacity adress__delete-button"
                                            type="button"
                                            aria-label="Удалить выбранный адрес">
                                                {t('addresses.delete_this_address', 'Удалить этот адрес')}
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
                                        {t('addresses.add_another_address', 'Добавить еще адрес')}
                                </button>
                            </> )}
                    </div>
                </section>
            </>
            
    );
}

export default MyAddress;