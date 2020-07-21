import React, { Component } from 'react'
import PlayerCard from './PlayerCard';
import Stats from './Stats';
import AttackSpeed from './AttackSpeed';

export default class Player extends Component {    
    render() {
        const {hp, dmg, attSpd, def, eva} = this.props.player;
        const currentPlayerHp = this.props.currentPlayerHp;
        return (
            <div className="player">
                <PlayerCard currentHp={currentPlayerHp} maxHp={hp} />
                <AttackSpeed attSpd={attSpd} attProgress={this.props.attProgress} />
                <Stats dmg={dmg} def={def} eva={eva} />
            </div>
        )
    }
}
