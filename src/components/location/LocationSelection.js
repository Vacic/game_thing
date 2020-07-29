import React from 'react';
import { connect } from 'react-redux';
import LocationCard from './LocationCard';

const LocationSelection = (props) => {
    const locations = Object.keys(props.locations);
    const initCombat = props.initCombat;
    return (
        <div className="location-selection">
            {locations.map(location => <LocationCard key={location} location={location} initCombat={initCombat} />)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        locations: state.locationEnemies
    }
}

export default connect(mapStateToProps)(LocationSelection);