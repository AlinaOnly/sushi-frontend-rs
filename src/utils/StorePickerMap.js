import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

//хук для выбора магазина
function StorePickerMap({ onStoreSelect, takeaway}) {

    const stores = takeaway.map(cityInfo => 
        cityInfo.restaurants.map(restaurant => ({
            ...restaurant,
            cityName: cityInfo.city
        }))
    ).flat().map(restaurant => ({
        id: restaurant.id,
        name: `${restaurant.cityName}, ${restaurant.address}`, // Город и адрес
        coordinates: {
            lat: restaurant.coordinates.latitude,
            lng: restaurant.coordinates.longitude
        }
    }));

    const defaultCenter = stores.length > 0 ? stores[0].coordinates : { lat: 0, lng: 0 };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={defaultCenter}
                zoom={15}
            >
            {stores.map(store => (
                <Marker 
                    key={store.id} 
                    position={store.coordinates}
                    onClick={() => onStoreSelect(store)} // Вызов функции при клике на маркер
                />
            ))}
            </GoogleMap>
        </LoadScript>
    );
}

export default React.memo(StorePickerMap);