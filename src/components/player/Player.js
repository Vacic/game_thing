import React from 'react';
import PlayerCard from './PlayerCard';
import Stats from '../stats/Stats';
import AttackSpeed from '../stats/AttackSpeed';

export default function Player(props) {
    const { weapon, hp, dmg, attSpd, def, eva } = props.player;
    const { currentPlayerHp, playerDiv, playerAttProgressDiv, playerHpBar } = props;
    return (
        <div className="player" ref={playerDiv}>
            <PlayerCard currentHp={currentPlayerHp} maxHp={hp} playerHpBar={playerHpBar} />
            <AttackSpeed attSpd={attSpd} playerAttProgressDiv={playerAttProgressDiv} weapon={weapon} />
            <Stats dmg={dmg} def={def} eva={eva} />
        </div>
    )
}