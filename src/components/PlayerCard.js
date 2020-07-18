import React from 'react';
import HpBar from './HpBar';

export default function PlayerCard(props) {
    const hp = props.hp;
    return (
        <div className="player-card">
            <p className="name">Vacic</p>
            <HpBar hp={hp} />
            <img src="https://via.placeholder.com/150" alt=""/>
        </div>
    )
}
