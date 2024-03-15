import React, { useRef, useState } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';

// хук для автозаполнения карт 
function AddressAutocomplete({ updateAddress, inputClassName, values, handleChange, addresses, handleInput }) {

    const { t } = useTranslation();

    const autoCompleteRef = useRef(null);

    const onPlaceChanged = () => {
        if (autoCompleteRef.current) {
        const newPlace = autoCompleteRef.current.getPlace();
        updateAddress(newPlace);
        }
    };

    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        handleChange({ target: {name: 'recipient_address', value: value} });
        if (Array.isArray(addresses)) {
            setSuggestions(addresses.filter(addr => addr.address.toLowerCase().includes(value.toLowerCase())).map(addr => ({
                ...addr,
                recipient_address: addr.address // создаем новое свойство recipient_address равное address
            })));
        } else {
            // Обрабатывайте случай, когда addresses не является массивом.
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (addressObj) => {
        // Создаем объект с необходимой структурой
        const updatedAddressObj = {
            ...addressObj,
            recipient_address: addressObj.address
        };
        handleChange({ target: {name: 'recipient_address', value: addressObj.address} });
        updateAddress(updatedAddressObj); // Теперь передаем объект с обоими адресами
        setSuggestions([]);
    };

    // Создаем границы для Белграда
    const belgradeBounds = {
        north: 44.897, // верхняя граница
        south: 44.723, // нижняя граница
        east: 20.551,  // восточная граница
        west: 20.255   // западная граница
    };

    // Объект опций для компонента Autocomplete
    const options = {
        // Ограничение поиска местоположениями в Сербии с помощью странового кода 'rs'
        componentRestrictions: { country: 'rs' },
        // Задаем границы для поиска
        bounds: belgradeBounds,
        // Заставляем Autocomplete строго придерживаться предоставленных границ
        strictBounds: true,
        types: ['address']
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={['places']}>
        <Autocomplete
            onLoad={(autoC) => (autoCompleteRef.current = autoC)}
            onPlaceChanged={onPlaceChanged}
            options={options}
        >
            <input
                id="recipient_address"
                name="recipient_address"
                className={`deliveryinput ${inputClassName}`}
                value={values.recipient_address || ''}
                onChange={handleInputChange}
                onInput={handleInput}
                type="text"
                placeholder={t('addresses.full_address', 'Введите Ваш полный адрес')}
                minLength="5"
                maxLength="100"
                required
            />
        </Autocomplete>
            {suggestions.length > 0 && (
                <ul className="suggestions-lists">{t('addresses.choose', 'Или выберете из Ваших адресов:')}
                    {suggestions.map(suggestionObj => (
                        <li className="suggestions-list app__text-opacity" key={suggestionObj.id} onClick={() => handleSuggestionClick(suggestionObj)}>
                            {suggestionObj.address}
                        </li>
                    ))}
                </ul>
            )}
    </LoadScript>
    );
}

export default AddressAutocomplete;