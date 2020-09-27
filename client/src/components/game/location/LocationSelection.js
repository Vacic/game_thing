import React, { useState } from 'react';
import { connect } from 'react-redux';
import LocationCard from './LocationCard';

const LocationSelection = React.memo(({ locations, initCombat }) => {
    const [isMenuHidden, toggleMenu] = useState(true);
    const locationKeys = Object.keys(locations);

    return (
        <div className="location-selection">
            {locationKeys.map((location, i) => 
                <LocationCard
                    key={ i } 
                    location={ location } 
                    initCombat={ initCombat } 
                    img={ locations[location].img }
                    hideMenuState={ isMenuHidden }
                    toggleMenu={ toggleMenu }
                />
            )}
            <div className={ `mobile-dropdown-btn ${ isMenuHidden ? '' : 'btn-opened' }` } 
                 onClick={() => isMenuHidden ? toggleMenu(false) : toggleMenu(true)}>
                 <span>&#x25bc;</span>
            </div>
        </div>
    )
})

const mapStateToProps = state => ({
        locations: state.locationEnemies
});        

export default connect(mapStateToProps)(LocationSelection);