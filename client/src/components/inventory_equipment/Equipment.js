import React, { Component } from 'react';
import { connect } from 'react-redux';
import EquippedItem from './EquippedItem';

class Equipment extends Component {
    render() {
        const { helmet, weapon, armor, shield, pants, boots, unequipItem } = this.props
        return (
            <div className="equipment">
                <h3>Equipment</h3>
                
                <div className="equipment-slots">
                    <div className="helmet">{helmet && <EquippedItem item={helmet} unequipItem={unequipItem} />}</div>
                    <div className="weapon">{weapon && <EquippedItem item={weapon} unequipItem={unequipItem}/>}</div>
                    <div className="armor">{armor && <EquippedItem item={armor} unequipItem={unequipItem}/>}</div>
                    <div className="shield">{shield && <EquippedItem item={shield} unequipItem={unequipItem}/>}</div>
                    <div className="pants">{pants && <EquippedItem item={pants} unequipItem={unequipItem}/>}</div>
                    <div className="boots">{boots && <EquippedItem item={boots} unequipItem={unequipItem}/>}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        helmet: state.player.equipped.helmet,
        weapon: state.player.equipped.weapon,
        armor: state.player.equipped.armor,
        shield: state.player.equipped.shield,
        pants: state.player.equipped.pants,
        boots: state.player.equipped.boots
    }
}

export default connect(mapStateToProps)(Equipment);