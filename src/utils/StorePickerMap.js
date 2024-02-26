import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

//хук для выбора магазина
function StorePickerMap( {onStoreSelect } ) {

    const stores = [
        {
            id: 1,
            name: 'Магазин на ул. Milovana Milovanovića 4',
            coordinates: { lat: 44.8141165, lng: 20.4211955 }
        },
        // Можно потом добавить другие магазины по мере их появления
    ];

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={stores[0].coordinates}
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