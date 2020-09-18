import React, { useState } from 'react';
import { connect } from 'react-redux';
import LocationCard from './LocationCard';

const LocationSelection = React.memo(({ locations, initCombat }) => {
    const [isMenuHidden, toggleMenu] = useState(true);

    const locationKeys = Object.keys(locations);
    return (
        <div className="location-selection">
            {locationKeys.map(location => 
                <LocationCard
                    key={location} 
                    location={location} 
                    initCombat={initCombat} 
                    img={locations[location].img}
                    hideMenuState={isMenuHidden}
                    toggleMenu={toggleMenu}
                />
            )}
            <div className={isMenuHidden ? "mobile-dropdown-btn" : "mobile-dropdown-btn btn-opened"} onClick={() => isMenuHidden ? toggleMenu(false) : toggleMenu(true)}><span>&#x25bc;</span></div>
        </div>
    )
})

const mapStateToProps = state => {
    return {
        locations: state.locationEnemies
    }
}

export default connect(mapStateToProps)(LocationSelection);