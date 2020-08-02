import React from 'react';

export default function LocationCard({ location, initCombat, img }) {
    const fixName = (name) => {
        return name.replace('_', ' ');
    }

    const onClick = () => {
        initCombat(location);
    }
    return (
        <div className="location-card" onClick={onClick}>
            <img className="location-img" src={img} alt=""/>
            <p className="location-name">{fixName(location)}</p>
        </div>
    )
}