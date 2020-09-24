import React from 'react';
import { connect } from 'react-redux';
import { setCurrentLocation } from '../../redux';

const LocationCard = React.memo(({ location, initCombat, img, hideMenuState, toggleMenu, currentLocation, setCurrentLocation }) => {
    const onClick = () => {
        initCombat(location);
        setCurrentLocation(location);
        toggleMenu(true);
    }
    const fixedLocationName = location.replace(/_/g, ' ');
    return (
        <div className={currentLocation===location ? 
                            hideMenuState ? "location-card show first" : "location-card show first first-card-opened" :
                            hideMenuState ? "location-card" : "location-card show"
                        } onClick={onClick}>
            <img className="location-img" src={img} alt=""/>
            <p className="location-name">{fixedLocationName}</p>
        </div>
    )
});

const mapStateToProps = state => ({
        currentLocation: state.gameData.currentLocation
});

const mapDispatchToProps = dispatch => ({
    setCurrentLocation: location => dispatch(setCurrentLocation(location))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationCard)