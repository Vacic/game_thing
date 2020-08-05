import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LocationCard from './LocationCard';

export class LocationSelection extends PureComponent {
    constructor(props) {
        super(props)
    
        this.state = {
             hideMenu: true
        }
    }

    toggleMenu = e => {
        this.state.hideMenu ? this.setState({ hideMenu: false }) : this.setState({ hideMenu: true })
    }

    hideMenu = e => {
        this.setState({ hideMenu: true })
    }

    render() {
        const locationKeys = Object.keys(this.props.locations);
        return (
            <React.Fragment>
                <div className="location-selection">
                    {locationKeys.map(location => <LocationCard key={location} location={location} initCombat={this.props.initCombat} img={this.props.locations[location].img} />)}
                </div>
                <div className={this.state.hideMenu ? "location-selection-mobile" : "location-selection-mobile show-selection"} >
                    {locationKeys.map(location => 
                        <LocationCard
                            key={location} 
                            location={location} 
                            initCombat={this.props.initCombat} 
                            img={this.props.locations[location].img} 
                            mobile={true}
                            hideMenuState={this.state.hideMenu}
                            hideMenu={this.hideMenu}
                        />
                    )}
                    <div className={this.state.hideMenu ? "mobile-dropdown-btn" : "mobile-dropdown-btn btn-opened"} onClick={this.toggleMenu} ref={this.menuButton}><span>&#x25bc;</span></div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        locations: state.locationEnemies
    }
}

export default connect(mapStateToProps)(LocationSelection);