import React from 'react';

export default function LocationCard(props) {
    const fixName = (name) => {
        return name.replace('_', ' ');
    }

    const onClick = () => {
        props.initCombat(location);
    }

    const location = props.location;
    return (
        <div className="location-card" onClick={onClick}>
            <img className="location-img" src="https://via.placeholder.com/60" alt=""/>
            <p className="location-name">{fixName(location)}</p>
        </div>
    )
}