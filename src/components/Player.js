import React, { Component } from 'react'
import PlayerCard from './PlayerCard';
import Stats from './Stats';
import AttackSpeed from './AttackSpeed';

export default class Player extends Component {    
    render() {
        const { weapon, hp, dmg, attSpd, def, eva } = this.props.player;
        const { currentPlayerHp, playerDiv, playerAttProgressDiv } = this.props;
        return (
            <div className="player" ref={playerDiv}>
                <PlayerCard currentHp={currentPlayerHp} maxHp={hp} playerHpBar={this.props.playerHpBar} />
                <AttackSpeed attSpd={attSpd} playerAttProgressDiv={playerAttProgressDiv} weapon={weapon} />
                <Stats dmg={dmg} def={def} eva={eva} />
            </div>
        )
    }
}