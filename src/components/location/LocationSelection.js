import React from 'react';
import LocationCard from './LocationCard';

export default function LocationSelection(props) {
    const locations = Object.keys(props.locations);
    const initCombat = props.initCombat;
    return (
        <div className="location-selection">
            {locations.map(location => <LocationCard key={location} location={location} initCombat={initCombat} />)}
            <div className="flex-break"></div>
        </div>
    )
}