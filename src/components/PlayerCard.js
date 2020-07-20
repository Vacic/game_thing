import React from 'react';
import HpBar from './HpBar';

export default function PlayerCard(props) {
    const { currentHp, maxHp } = props;
    return (
        <div className="player-card">
            <p className="name">Vacic</p>
            <HpBar currentHp={currentHp} maxHp={maxHp} />
            <img src="https://via.placeholder.com/150" alt=""/>
        </div>
    )
}
