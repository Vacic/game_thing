import React from 'react';
import LocationCard from './LocationCard';

export default function LocationSelection(props) {
    const locations = Object.keys(props.locations);
    return (
        <div className="location-selection">
            {locations.map(location => <LocationCard key={location} location={location} getEnemy={props.getEnemy} />)}
            <div className="break"></div>
        </div>
    )
}