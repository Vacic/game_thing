import React from 'react';
import HpBar from '../stats/HpBar';

export default function PlayerCard({ currentHp, maxHp, playerHpBar }) {
    return (
        <div className="player-card">
            <p className="name">Vacic</p>
            <HpBar currentHp={currentHp} maxHp={maxHp} playerHpBar={playerHpBar} />
            <img className="player-img" src="https://via.placeholder.com/150" alt=""/>
        </div>
    )
}