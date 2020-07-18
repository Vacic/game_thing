import React from 'react';
import HpBar from './HpBar';

export default function EnemyCard(props) {
    const hp = props.hp;
    return (
        <div className="enemy-card">
            <p className="name">Bandit</p>
            <HpBar hp={hp} />
            <img src="https://via.placeholder.com/150" alt=""/>
        </div>
    )
}
