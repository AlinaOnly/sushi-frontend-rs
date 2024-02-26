import React, { useRef } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';

// хук для автозаполнения карт 
function MyAddressAutocomplete({ updateAddress, inputClassName, values, handleChange, handleInput }) {

    const { t } = useTranslation();

    const autoCompleteRef = useRef(null);

    const onPlaceChanged = () => {
        if (autoCompleteRef.current) {
        const newPlace = autoCompleteRef.current.getPlace();
        updateAddress(newPlace);
        }
    };

    // Создаем границы для Белграда
    const belgradeBounds = {
        north: 44.897, // верхняя граница
        south: 44.723, // нижняя граница
        east: 20.551,  // восточная граница
        west: 20.255   // западная граница
    };

    /*
    // Создаем границы для Нови Сада, но для Нови Сада нужна отдельная логика или компонент с еще одним полем под Нови Сад
    const noviSadBounds = {
        north: 45.2981, // верхняя граница
        south: 45.2214, // нижняя граница
        east: 19.8854,  // восточная граница
        west: 19.7144   // западная граница
    };*/

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
                id="address"
                name="address"
                className={`deliveryinput ${inputClassName}`}
                value={values.address || ''}
                onChange={handleChange}
                onInput={handleInput}
                type="text"
                placeholder={t('addresses.full_address', 'Введите Ваш полный адрес')}
                minLength="5"
                maxLength="100"
                required
            />
        </Autocomplete>
        </LoadScript>
    );
}

export default MyAddressAutocomplete;