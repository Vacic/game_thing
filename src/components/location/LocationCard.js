import React from 'react';
import { connect } from 'react-redux';

const LocationCard = React.memo(({ location, initCombat, img, mobile, hideMenuState, hideMenu, currentLocation }) => {
    const onClick = () => {
        initCombat(location);
        mobile && !hideMenuState && hideMenu();
    }
    const fixedLocationName = location.replace('_', ' ');
    if (!mobile){ return (
        <div className="location-card" onClick={onClick}>
            <img className="location-img" src={img} alt=""/>
            <p className="location-name">{fixedLocationName}</p>
        </div>
    )} else if (mobile && currentLocation === location) { return (
        <div className={hideMenuState ? "location-card show first" : "location-card show first first-card-opened"} onClick={onClick}>
            <img className="location-img" src={img} alt=""/>
            <p className="location-name">{fixedLocationName}</p>
        </div>
        )
    } else { return (
        <div className={hideMenuState ? "location-card" : "location-card show"} onClick={onClick}>
            <img className="location-img" src={img} alt=""/>
            <p className="location-name">{fixedLocationName}</p>
        </div>
        )
    }
});

const mapStateToProps = state => {
    return {
        currentLocation: state.gameData.currentLocation
    }
}

export default connect(mapStateToProps)(LocationCard)