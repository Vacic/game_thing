import React from 'react';
import HpBar from './HpBar';

export default function PlayerCard(props) {
    const { currentHp, maxHp, playerHpBar } = props;
    return (
        <div className="player-card">
            <p className="name">Vacic</p>
            <HpBar currentHp={currentHp} maxHp={maxHp} playerHpBar={playerHpBar} />
            <img src="https://via.placeholder.com/150" alt=""/>
        </div>
    )
}
