import React from 'react';
import HpBar from '../stats/HpBar';
import HealQuickBar from './HealQuickBar';

export default function PlayerCard({ currentHp, maxHp, playerHpBar, playerAttStatus, handleUseItem }) {
    return (
        <div className="player-card">
            <p className="name">Vacic</p>
            <HpBar currentHp={currentHp} maxHp={maxHp} playerHpBar={playerHpBar} playerAttStatus = {playerAttStatus} />
            <img className="player-img" src="https://via.placeholder.com/150" alt=""/>
            <HealQuickBar handleUseItem={handleUseItem} />
        </div>
    )
}