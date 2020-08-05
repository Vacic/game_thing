import React from 'react';
import { connect } from 'react-redux';

const LocationCard = ({ location, initCombat, img, mobile, hideMenu, toggleMenu, currentLocation }) => {
    const fixName = (name) => {
        return name.replace('_', ' ');
    }

    const onClick = () => {
        initCombat(location);
        mobile && toggleMenu();
    }

    if (!mobile){ return (
        <div className="location-card" onClick={onClick}>
            <img className="location-img" src={img} alt=""/>
            <p className="location-name">{fixName(location)}</p>
        </div>
    )} else if (mobile && currentLocation === location) { return (
        <div className={hideMenu ? "location-card show first" : "location-card show first first-card-opened"} onClick={onClick}>
            <img className="location-img" src={img} alt=""/>
            <p className="location-name">{fixName(location)}</p>
        </div>
        )
    } else { return (
        <div className={hideMenu ? "location-card" : "location-card show"} onClick={onClick}>
            <img className="location-img" src={img} alt=""/>
            <p className="location-name">{fixName(location)}</p>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentLocation: state.gameData.currentLocation
    }
}

export default connect(mapStateToProps)(LocationCard)