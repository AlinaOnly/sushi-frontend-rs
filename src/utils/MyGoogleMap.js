import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

//хук для отображение карт
function MyGoogleMap({ locations }) {

    const [mapDimensions, setMapDimensions] = useState({
        width: '100%',
        height: '300px',
        margin: '20px 0',
    });

    useEffect(() => {
        const handleResize = () => {
          // Когда размер окна изменяется
          // можно задать логику для изменения размеров карты в зависимости от размеров окна
            setMapDimensions({
                width: window.innerWidth < 2000 ? '100%' : '300px',
                height: '300px',
                margin: '20px 0',
            });
        };

        // Добавляем обработчик события при монтировании компонента
        window.addEventListener('resize', handleResize);

        // Вызываем обработчик немедленно, чтобы установить начальное состояние
        handleResize();

        // Удалеем обработчик события при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Объявляем переменную bounds внутри компонента
    let bounds;

    // Проверяем, что API карт Google загружен
    if (window.google && window.google.maps) {
        bounds = new window.google.maps.LatLngBounds();
            locations.forEach((location) => {
                bounds.extend(location);
        });
    }

    // Опционально: добавить padding для bounds, чтобы не было слишком тесно
    const mapOptions = {
        bounds: bounds,
        padding: {top: 100, bottom:100, left: 100, right: 100}
    };

    const onLoad = map => {
        if (bounds) {
            // Подгоняем карту под область, покрывающую все маркеры
            map.fitBounds(bounds);
        }
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapDimensions}
                // Используем дефолтный центр, если bounds не определен
                center={bounds ? bounds.getCenter() : { lat: 0, lng: 0 }}
                zoom={13}
                onLoad={onLoad}
                options={mapOptions}
            >
                {locations.map((location, index) => (
                    <Marker key={index} position={location} />
                ))}
            </GoogleMap>
        </LoadScript>
    );
}

export default React.memo(MyGoogleMap);