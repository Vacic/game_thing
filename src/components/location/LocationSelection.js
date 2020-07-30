import React from 'react';
import { connect } from 'react-redux';
import LocationCard from './LocationCard';

const LocationSelection = ({ initCombat, locations }) => {
    const locationKeys = Object.keys(locations);
    return (
        <div className="location-selection">
            {locationKeys.map(location => <LocationCard key={location} location={location} initCombat={initCombat} img={locations[location].img} />)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        locations: state.locationEnemies
    }
}

export default connect(mapStateToProps)(LocationSelection);